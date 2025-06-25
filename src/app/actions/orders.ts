"use server"
import db from "@/db/db"

// Verifica se o usuário já comprou o produto
export async function userOrderExists(email: string, productId: string) {
  return (
    (await db.order.findFirst({
      where: { user: { email }, productId },
      select: { id: true },
    })) != null
  )
}