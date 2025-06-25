import { NextRequest, NextResponse } from "next/server";
import { isValidPassword } from "./lib/isValidPassword";

//página para validar se o usuário é admin
export async function middleware(req: NextRequest) { //função para verificar se o usuário é admin
    if ((await isAuthenticaded(req)) === false) {//se o usuário não for admin
        return new NextResponse("Vaza daqui seu safado", {status: 401, 
            headers: {"WWW-Authenticate": "Basic"}}) //retorna uma mensagem de não autorizado
    }
}

//função para verificar se o usuário é admin
async function isAuthenticaded(req: NextRequest) {
    const authHeader = req.headers.get("authorization") || req. //pega o cabeçalho de autorização
    headers.get("Authorization") 
    
    if (authHeader == null) return false //se o cabeçalho for nulo, ele retorna falso

    const [username, password] = Buffer.from(authHeader.split(" ")[1], "base64"). //pega o usuário e a senha do cabeçalho, eu pego o segundo item do array que é o usuário e a senha, e converto para base64 o dado estaria assim "basic edadadada"
    toString().split(":") // eu uso o : para separar o usuário e a senha, pois vai estar assim "username:password"
    //console.log(username, password) //eu faço um console.log para ver se está pegando o usuário e a senha

    return username === process.env.ADMIN_USERNAME && await //se o usuário e a senha forem iguais ao que eu defini no .env, ele retorna verdadeiro
    isValidPassword(password, process.env.HASHED_ADMIN_PASSWORD as string) 

    //return Promise.resolve(false) // por ser uma função assíncrona, eu retorno uma promessa
}

//middleware é um código que roda antes de qualquer outra coisa, ele é um intermediário entre o client e o servidor, ele pode ser usado para fazer validações, autenticações, etc.
export const config = { //configuração do middleware
    matcher: "/admin/:path*" //caminho que eu quero que o middleware funcione, nao importa depois do admin, mas se tem /admin, vai funcionar
}