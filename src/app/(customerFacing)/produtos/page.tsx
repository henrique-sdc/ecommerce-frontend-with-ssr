import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard"
import db from "@/db/db"
import { cache } from "@/lib/cache"
import { Suspense } from "react"

 // Função que retorna os produtos do banco em ordem alfabética
 const getProducts = cache(() => {
    return db.product.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: { name: "asc" },
    })
  }, ["/products", "getProducts"])

// Página de Produtos
export default function ProductsPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Suspense
        fallback={
          <>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </>
        }
      >
        <ProductsSuspense />
      </Suspense>
    </div>
  )
}

// Função que retorna os produtos
async function ProductsSuspense() {
  const products = await getProducts()
 
  return products.map(product => <ProductCard key={product.id} {...product} />) //loop que renderiza os produtos
}