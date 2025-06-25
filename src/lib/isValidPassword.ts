export async function isValidPassword(password: string, hashedPassword: string) {
   //console.log(await hashPassword(password)) //eu faço um console.log para ver se a senha está sendo hasheada
    return await hashPassword(password) === hashedPassword //compara a senha com a senha hasheada
}

async function hashPassword(password: string) {
    const arrayBuffer = await crypto.subtle.digest("SHA-512", new TextEncoder().encode(password)) //cria um array de bytes

    return Buffer.from(arrayBuffer).toString("base64") //converte o array de bytes para base64 para não ficar tão grande
}


// crypto é uma biblioteca nativa do node que serve para criptografia
// crypto.subtle é um objeto que contém métodos para criptografia
// digest é uma plavra chave para hash
// SHA-512 é um algoritmo de hash
// TextEncoder é uma classe que converte strings em arrays de bytes