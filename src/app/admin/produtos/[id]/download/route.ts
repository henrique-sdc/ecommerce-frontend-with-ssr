import db from "@/db/db";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import { headers } from "next/headers";

// Função para baixar um arquivo
export async function GET(req: NextRequest, { params: { id }}: { params: {id: string}}) { // Função que eu posso chamar do meu client até o servidor
    const product  = await db.product.findUnique({ //busca o produto no banco de dados
        where: { id }, //onde o id for igual ao id que eu passei
        select: { filePath: true, name: true }, //seleciona o caminho do arquivo e o nome
    }) 

    if (product == null) return notFound() //se não achar o produto, ele retorna um erro

    const { size } = await fs.stat(product.filePath) //pega o tamanho do arquivo
    const file = await fs.readFile(product.filePath) //lê o arquivo
    const extension = product.filePath.split(".").pop() //pega a extensão do arquivo

    return new NextResponse(file, {headers: {
        "Content-Disposition": `attachment; filename="${product.name}.${extension}"`, //nome do arquivo
        "Content-Length": size.toString(), //tamanho do arquivo
    }})
}