import Link from "next/link"

export default function NotFound() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-white px-4 text-center">
            <div className="space-y-8">
                <h1 className="text-6xl font-bold text-gray-900">404</h1>
                <h2 className="text-2xl font-semibold text-gray-700">Página não encontrada</h2>
                <p className="text-gray-500">Oops, parece que a página que você está procurando não existe.</p>
                <Link href="/" className="inline-flex items-center justify-center h-12 px-6 mt-4 text-sm font-medium text-white bg-gray-800 rounded-md shadow-sm transition-colors hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2">
                        Voltar para a página inicial
                </Link>
            </div>
        </div>
    )
}