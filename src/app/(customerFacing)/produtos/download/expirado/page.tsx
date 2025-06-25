import { Button } from "@/components/ui/button"
import Link from "next/link"

// Página de download expirado
export default function Expired() {
  return (
    <>
      <h1 className="text-4xl mb-4">Download link expirou</h1>
      <Button asChild size="lg">
        <Link href="/pedidos">Pegar novo Link</Link>
      </Button>
    </>
  )
}