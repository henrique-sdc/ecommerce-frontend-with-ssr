import db from "@/db/db"
import { notFound } from "next/navigation"
import Stripe from "stripe"
import Image from "next/image"
import { formatCurrency } from "@/lib/formatters"
import { Button } from "@/components/ui/button"
import Link from "next/link"

//
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

// Página de sucesso
export default async function SuccessPage({ //função que vai ser chamada quando o pagamento for bem sucedido
  searchParams,
}: {
  searchParams: { payment_intent: string } //vai receber o ID do pagamento
}) {
  const paymentIntent = await stripe.paymentIntents.retrieve( //vai pegar o pagamento com o stripe
    searchParams.payment_intent
  )
  if (paymentIntent.metadata.productId == null) return notFound() //se não tiver o ID do produto, retorna erro

  const product = await db.product.findUnique({ //vai pegar o produto
    where: { id: paymentIntent.metadata.productId },
  })
  if (product == null) return notFound()

  const isSuccess = paymentIntent.status === "succeeded" //se o pagamento foi bem sucedido

  return (
    <div className="max-w-5xl w-full mx-auto space-y-8">
      <h1 className="text-4xl font-bold">
        {isSuccess ? "Sucesso!" : "Erro!"}
      </h1>
      <div className="flex gap-4 items-center">
        <div className="aspect-video flex-shrink-0 w-1/3 relative">
          <Image
            src={product.imagePath}
            fill
            alt={product.name}
            className="object-cover"
          />
        </div>
        <div>
          <div className="text-lg">
            {formatCurrency(product.priceInCents / 100)}
          </div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="line-clamp-3 text-muted-foreground">
            {product.description}
          </div>
          <Button className="mt-4" size="lg" asChild>
            {isSuccess ? (
              <a
                href={`/produtos/download/${await createDownloadVerification(
                  product.id
                )}`}
              >
                Download
              </a>
            ) : (
              <Link href={`/produtos/${product.id}/comprar`}>Tente Denovo</Link>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

// Cria um token de verificação para o download
async function createDownloadVerification(productId: string) {
  return (
    await db.downloadVerification.create({
      data: {
        productId,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      },
    })
  ).id
}