
import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard"
import { Button } from "@/components/ui/button"
import db from "@/db/db"
import { cache } from "@/lib/cache"
import { Product } from "@prisma/client"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

//Função que retorna os produtos mais populares
//Transformei de função para const para poder usar o cache
const getMostPopularProducts = cache(() => {
    return db.product.findMany({
      where: { isAvailableForPurchase: true }, // Função SQL que ordena em ordem decrescente
      orderBy: { name: "asc" },
    })
  }, ["/", "getMostPopularProducts"], { revalidate: 60 * 60 * 4}) //array para definir a chave do cache, tem que ser um identificador único para cada função, revalidate é para nesse caso todo dia atualizar o cache

//Função que retorna os produtos mais vendidos
const getNewestProducts = cache(() => {
    //await wait(2000) //função para testar tela de carregamento, precisa ser async
    return db.product.findMany({ where: { isAvailableForPurchase: true }, // Função SQL que ordena em ordem decrescente
        orderBy: { createdAt: "desc" }, 
        take: 6})
    }, ["/", "getNewestProducts"])
//Com o cache vai ser mais rápido o carregamento


// Função para testar carregamento da página
//function wait(duration: number) {
//    return new Promise((resolve) => setTimeout(resolve, duration))
//}

export default function HomePage() {
    return <main className="space-y-12">
        <ProductGridSection title="Mais Populares" productsFetcher={getMostPopularProducts} />
        <ProductGridSection title="Novos" productsFetcher={getNewestProducts} />
    </main>
}

//Esse type é uma forma de definir o formato de um objeto, nesse caso, o formato de um objeto que tem uma chave title que é uma string e uma chave productsFetcher que é uma função que retorna uma Promise de um array de produtos
type ProductGridSectionProps = {
    title: string
    productsFetcher: () => Promise<Product[]>

}

//Componente que renderiza uma seção de produtos
function ProductGridSection( {productsFetcher, title}: ProductGridSectionProps) {
    return (<div className="space-y-4">
        <div className="flex gap-4">
            <h2 className="text-3xl font-bold">{title}</h2>
            <Button variant="outline" asChild>
                <Link href="/" className="space-x-2">
                <span>Ver Tudo</span>
                <ArrowRight className="size-4" />
                </Link>
            </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" /*Vou usar o suspense para carregar os produtos, tem que ser em função async*/> 
            <Suspense fallback={<>
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                </>}>  
                <ProductSuspense productsFetcher={productsFetcher}/>
            </Suspense>
        </div>
    </div>
    )
}

// Componente que renderiza uma seção de produtos com suspense
async function ProductSuspense({
    productsFetcher,
  }: {
    productsFetcher: () => Promise<Product[]>
  }) {
    return (await productsFetcher()).map(product => ( //loop que renderiza os produtos
      <ProductCard key={product.id} {...product} />
    ))
  }