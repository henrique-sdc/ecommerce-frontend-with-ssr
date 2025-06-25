import db from "@/db/db"
import { NextRequest, NextResponse } from "next/server"
import fs from "fs/promises"

// Página de download
export async function GET( //Essa função faz as seguintes coisas: verifica se o download ainda é válido, se não for, redireciona para a página de download expirado, se for, faz o download do arquivo
  req: NextRequest,
  {
    params: { downloadVerificationId },
  }: { params: { downloadVerificationId: string } }
) {
  const data = await db.downloadVerification.findUnique({ //verifica se o download ainda é válido
    where: { id: downloadVerificationId, expiresAt: { gt: new Date() } }, //se a data de expiração for maior que a data atual, o download é válido
    select: { product: { select: { filePath: true, name: true } } },
  })

  if (data == null) {
    return NextResponse.redirect(new URL("/produtos/download/expirado", req.url)) //se o download não for válido, redireciona para a página de download expirado
  }

  const { size } = await fs.stat(data.product.filePath) //pega o tamanho do arquivo
  const file = await fs.readFile(data.product.filePath) //faz o download do arquivo
  const extension = data.product.filePath.split(".").pop() //pega a extensão do arquivo

  return new NextResponse(file, { //retorna o arquivo
    headers: {
      "Content-Disposition": `attachment; filename="${data.product.name}.${extension}"`, //nome do arquivo
      "Content-Length": size.toString(), //tamanho do arquivo
    },
  })
}