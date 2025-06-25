import { unstable_cache as nextCache } from "next/cache" //importa a função cache e chamo ela de nextCache
import { cache as reactCache } from "react" //importa a função cache e chamo ela de reactCache

// Definição do tipo de callback, que veio no NextCache
type Callback = (...args: any[]) => Promise<any>

// Função que faz o cache
export function cache<T extends Callback>(
  cb: T,
  keyParts: string[],
  options: { revalidate?: number | false; tags?: string[] } = {} //defino as opções do cache 
) {
  return nextCache(reactCache(cb), keyParts, options) //retorno a função cache do nextCache, passando a função cache do reactCache, as partes da chave e as opções
}

//Esse arquivo foi criado para facilitar o cache em outros, para eu não ter que importar o next/cache toda vez que eu for fazer cache, eu só importo esse arquivo e uso a função cache
//Eu preciso do cache para armezanar dados que não mudam com frequência, como por exemplo, a quantidade de usuários, a quantidade de vendas, etc. Eu posso definir um tempo para o cache ser atualizado, ou eu posso atualizar o cache manualmente, eu posso também definir tags para o cache, para eu poder invalidar o cache de uma tag específica, por exemplo, eu posso ter um cache de vendas e um cache de usuários, se eu quiser atualizar o cache de vendas, eu posso invalidar o cache de vendas, sem precisar invalidar o cache de usuários, eu posso também invalidar o cache de todos os usuários, sem precisar invalidar o cache de vendas, eu posso fazer isso com as tags 