"use server"
// Arquivo que faz com que os produtos sejam salvados no banco de dados

// com o zod eu posso criar um schema baseado em um objeto
import { z } from "zod"

import db from "@/db/db"
import fs from "fs/promises"
import { notFound, redirect } from "next/navigation"
import { revalidatePath } from "next/cache"


const fileSchema = z.instanceof(File, { message: "Necessário"}) //schema para validar se é um arquivo, se não for, ele retorna a mensagem "Necessário"
const imageSchema = fileSchema.refine(file => file.size === 0 || file.type.startsWith("image/")) //schema para validar se é uma imagem

const addSchema = z.object({ //dentro do {} são os daddos que eu quero validar
    name: z.string().min(1), //nome é uma string e tem que ter no mínimo 1 caractere
    description: z.string().min(1), //descrição é uma string e tem que ter no mínimo 1 caractere
    priceInCents: z.coerce.number().int().min(1).positive(), //preço é um número inteiro e positivo, o "coerce" é para transformar o número em inteiro e não deixar String
    file: fileSchema.refine(file => file.size > 0, "Necessário"), //arquivo é um arquivo, e para não enviar nada ao server usei o refine para validar se o arquivo tem tamanho maior que 0, se não tiver, ele retorna a mensagem "Necessário"
    image: imageSchema.refine(file => file.size > 0, "Necessário")
}) 

// Função para adicionar um produto
export async function addProduct(prevState: unknown, formData: FormData) { // Função que eu posso chamar do meu client até o servidor
    const result = addSchema.safeParse(Object.fromEntries(formData.entries())) //transforma o formData em um objeto
    if (result.success === false) { //se o resultado for falso, ele retorna o erro
        return result.error.formErrors.fieldErrors
    }

    const data = result.data //pega os dados do resultado

    await fs.mkdir("produtos", {recursive: true}) //cria uma pasta chamada produtos
    const filePath = `produtos/${crypto.randomUUID()}-${data.file.name}` //cria um caminho para o arquivo aleatório com o nome do arquivo
    await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer())) //escreve o arquivo no caminho que eu criei

    await fs.mkdir("public/produtos", {recursive: true}) //cria uma pasta chamada produtos pública, ou seja, no public para geral ver
    const imagePath = `/produtos/${crypto.randomUUID()}-${data.image.name}` //cria um caminho para o arquivo aleatório com o nome do arquivo
    await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer())) //escreve o arquivo no caminho que eu criei

    await db.product.create({data: {
        isAvailableForPurchase: false,
        name: data.name,
        description: data.description,
        priceInCents: data.priceInCents,
        filePath,
        imagePath,
    },
})

    revalidatePath("/") //atualiza a página inicial por causo do cache
    revalidatePath("/produtos") //atualiza a página de produtos por causo do cache
    redirect("/admin/produtos") //redireciona para a página de produtos
}

const editSchema = addSchema.extend({
    file: fileSchema.optional(), //arquivo é opcional
    image: imageSchema.optional() //imagem é opcional
})

// Função para editar um produto
export async function updateProduct(id: string, prevState: unknown, formData: FormData) { // Função que eu posso chamar do meu client até o servidor
    const result = editSchema.safeParse(Object.fromEntries(formData.entries())) //transforma o formData em um objeto
    if (result.success === false) { //se o resultado for falso, ele retorna o erro
        return result.error.formErrors.fieldErrors
    }

    const data = result.data //pega os dados do resultado
    const product = await db.product.findUnique({ where: { id } }) //busca o produto no banco de dados

    if (product == null) return notFound() //se não achar o produto, ele retorna um erro

    let filePath = product.filePath //se o arquivo for nulo, ele mantém o mesmo caminho
    if (data.file != null && data.file.size > 0) {  //se o arquivo for diferente de nulo e tiver tamanho maior que 0
        await fs.unlink(product.filePath) //deleta o arquivo antigo
        filePath = `produtos/${crypto.randomUUID()}-${data.file.name}` //cria um caminho para o arquivo aleatório com o nome do arquivo
        await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer())) //escreve o arquivo no caminho que eu criei
    }
    
    let imagePath = product.imagePath //se o arquivo for nulo, ele mantém o mesmo caminho
    if (data.image != null && data.image.size > 0) {  //se o arquivo for diferente de nulo e tiver tamanho maior que 0
        await fs.unlink(`public${product.imagePath}`) //deleta o arquivo antigo
        imagePath = `/produtos/${crypto.randomUUID()}-${data.image.name}` //cria um caminho para o arquivo aleatório com o nome do arquivo
        await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer())) //escreve o arquivo no caminho que eu criei
    } 

    await db.product.update({
        where: { id },
        data: {
        name: data.name,
        description: data.description,
        priceInCents: data.priceInCents,
        filePath,
        imagePath,
    },
})

    revalidatePath("/") //atualiza a página inicial por causo do cache
    revalidatePath("/produtos") //atualiza a página de produtos por causo do cache
    redirect("/admin/produtos") //redireciona para a página de produtos
}

// Função para deixar produto disponível ou indisponível para compra
export async function toggleProductAvailability(id: string, isAvailableForPurchase: boolean) { 
    await db.product.update({ //atualiza o produto no banco de dados
        where: { id },
        data: { isAvailableForPurchase }
    })

    revalidatePath("/") //atualiza a página inicial por causo do cache
    revalidatePath("/produtos") //atualiza a página de produtos por causo do cache
}

// Função para deletar um produto
export async function deleteProduct(id: string) {
    const product = await db.product.delete({where: { id }})
    if (product == null) return notFound() //se não achar o produto, ele retorna um erro

    await fs.unlink(product.filePath) //deleta os arquivos relacionados ao produto
    await fs.unlink(`public${product.imagePath}`) //deleta os arquivos relacionados ao produto

    revalidatePath("/") //atualiza a página inicial por causo do cache
    revalidatePath("/produtos") //atualiza a página de produtos por causo do cache
}