import db from "@/db/db"
import { notFound } from "next/navigation"
import Stripe from "stripe" //importa a biblioteca para fazer pagamentos no site
import { CheckoutForm } from "./_components/ChechoutForm"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string) //cria uma instância do stripe com a chave secreta da minha API

export default async function PurchasePage({
    params: { id },
  }: {
    params: { id: string }
  }) {
    const product = await db.product.findUnique({ where: { id } })
  if (product == null) return notFound()

    //cria um pagamento com o stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: product.priceInCents,
      currency: "BRL",
      metadata: { productId: product.id }, //para saber quem comprou o que
    })

    //esse client_secrect é como se fosse o ID do pagamento, é o que o cliente vai usar para pagar
    if (paymentIntent.client_secret == null) {
      throw Error("Stripe não conseguiu criar o pagamento")
    }
  
    return (
      <CheckoutForm
        product={product}
        clientSecret={paymentIntent.client_secret}
      />
    )
}