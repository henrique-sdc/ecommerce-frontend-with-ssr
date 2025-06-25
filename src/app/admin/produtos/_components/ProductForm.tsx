"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { formatCurrency } from "@/lib/formatters"
import { useState } from "react"
import { addProduct, updateProduct } from "../../_actions/products"
import { useFormState, useFormStatus } from "react-dom"
import { Product } from "@prisma/client"
import Image from "next/image"

// Fórmulário de preenchimento para adicionar um produto
export function ProductForm( {product}: {product?: Product | null}) {
    const [error, action] = useFormState(product == null ? addProduct : updateProduct.bind(null, product.id), {}) //aqui eu faço um if ternário para saber se é para adicionar ou editar o .bin serve para passar o id do produto
    const [priceInCents, setPriceInCents] = useState<number | undefined>(product?.priceInCents) // Para o valor ser dinamico

    return <form action={action} /*ação que faz o fórmulário funcionar*/ className="space-y-8">
        <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input type="text" id="name" name="name" required defaultValue={product?.name || ""}></Input>
            {error.name && <div className="text-destructive" /*se tiver erro ele mostra*/>{error.name}</div>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="priceInCents">Preço em Centavos</Label>
            <Input type="number" id="priceInCents" name="priceInCents" required value={priceInCents}
                onChange={e => setPriceInCents(Number(e.target.value) || undefined)} /* Para o valor ser dinamico, se não for número da undefined*/>
            </Input>
            {error.priceInCents && <div className="text-destructive" /*se tiver erro ele mostra*/>{error.priceInCents}</div>}
        </div>
        <div className="text-muted-foreground">{formatCurrency(priceInCents || 0 / 100)/* Para mostrar o valor real*/}</div>
        <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea id="description" name="description" required defaultValue={product?.description}></Textarea>
            {error.description && <div className="text-destructive" /*se tiver erro ele mostra*/>{error.description}</div>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="file">Arquivo</Label>
            <Input type="file" id="file" name="file" required={product == null}></Input>
            {product != null && <div className="text-muted-foreground">{product.filePath /*mostra o caminho do*/}</div>}
            {error.file && <div className="text-destructive" /*se tiver erro ele mostra*/>{error.file}</div>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="image">Imagem</Label>
            <Input type="file" id="image" name="image" required={product == null}></Input>
            {product != null && <Image src={product.imagePath} height="400" width="400" alt="Imagem do Produto"/>} 
            {error.image && <div className="text-destructive" /*se tiver erro ele mostra*/>{error.image}</div>}
        </div>
        <SubmitButton />
    </form>
}

function SubmitButton() {
    const { pending } = useFormStatus() //aqui eu pego o status do fórmulário
    return ( 
    <Button type="submit" disabled={pending}>
        {pending ? "Salvando..." : "Salvo"}
    </Button> //enquanto a pessoa preenche não aparece nada, quando ela preenche aparece o botão de salvar
    )
}