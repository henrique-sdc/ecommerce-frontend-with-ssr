import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import db from "@/db/db";
import { formatCurrency, formatNumber } from "@/lib/formatters";

// função para pegar a quantidade de vendas e o valor total de vendas
async function getSalesData() {
    const data = await db.order.aggregate({ // função agregada
        _sum: { pricePaidInCents: true }, // soma o valor total de vendas
        _count: true // conta a quantidade de vendas
    })
    //await wait(2000) //função para testar tela de carregamento

    return {
       amount: (data._sum.pricePaidInCents || 0) / 100, // retorno o valor total de vendas, se não tiver nenhum valor, retorno 0, e divido por 100 para transformar em reais
       numberOfSales: data._count // retorno a quantidade de vendas
    }
}

//funcao para testar tela de carregamento
//function wait(duration: number) {
//    return new Promise((resolve) => setTimeout(resolve, duration))
//}

// função para pegar a quantidade de usuários e o valor médio de vendas por usuário
async function getUserData() {
    // faço isso para o site ficar mais rápido, pois a funçao de baixo tem que esperar um por vez para carregar, essa carrega os dois juntos
    const [userCount, orderData] = await Promise.all([
        db.user.count(), db.order.aggregate({
            _sum: { pricePaidInCents: true } // soma o valor total de vendas
          }),
    ])
    // funcao lenta
    // const userCount = await db.user.count()
    // const orderData = await db.order.aggregate({
    //   _sum: { pricePaidInCents: true } 
    // })

    return {
       userCount, // retorno a quantidade de usuários
       // fiz um if se for 0 para não ter divisão por 0, se não for 0, faço a divisão, o orderData._sum.pricePaidInCents é o valor total de vendas, o 0 é o valor padrão caso não tenha vendas e o userCount é a quantidade de usuários e o / 100 é para transformar em reais
       avaregeValuePerUser: userCount === 0 ? 0 : (orderData._sum.pricePaidInCents || 0) / userCount / 100,
    }
}

// função para pegar a quantidade de produtos ativos e inativos
async function getProductData() {
    // faço isso para o site ficar mais rápido, pois a funçao de baixo tem que esperar um por vez para carregar, essa carrega os dois juntos
    const [activeCount, inactiveCount] = await Promise.all([
        db.product.count({where: { isAvailableForPurchase: true}}), //conta a quantidade de produtos disponíveis para compra
        db.product.count({where: { isAvailableForPurchase: false}}) //conta a quantidade de produtos indisponíveis para compra
    ])
    //lento
    // db.product.count({where: { isAvailableForPurchase: true}}) //conta a quantidade de produtos disponíveis para compra
    // db.product.count({where: { isAvailableForPurchase: false}}) //conta a quantidade de produtos indisponíveis para compra

    return { activeCount, inactiveCount } // retorno a quantidade de produtos disponíveis e indisponíveis para compra
}

// Página de Dashboard do Admin
export default async function AdminDashboard() {
    // faço isso para o site ficar mais rápido, pois a funçao de baixo tem que esperar um por vez para carregar, essa carrega os dois juntos
    const [salesData, userData, productData] = await Promise.all([ //declaro os nomes para usar as funções que criei acima
        getSalesData(), //chamo a função que criei acima
        getUserData(), //chamo a função que criei acima
        getProductData() //chamo a função que criei acima
    ])
    //lento
    //const salesData = await getSalesData()
    //const userData = await getUserData() // declaro um nome para usar a função que criei acima

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <DashboardCard
                title="Vendas"
                subtitle={`${formatNumber(salesData.numberOfSales)} Vendas`} // dado dinâmico vindo do banco e formatado pelo arquivo que criei
                body={formatCurrency(salesData.amount)}
            />
            <DashboardCard
                title="Clientes"
                subtitle={`${formatCurrency(userData.avaregeValuePerUser)} Valores Médios`}
                body={formatNumber(userData.userCount)}
            />
            <DashboardCard
                title="Produtos Ativos"
                subtitle={`${formatNumber(productData.inactiveCount)} Inativos`}
                body={formatNumber(productData.activeCount)}
            />
        </div>
    )
}

// Tipagem do card
type DashboardCardProps = {
    title: string;
    subtitle: string;
    body: string;
}

// Componente customizado, para não ficar muito grande e repetitivo o código eu padronizei o card
function DashboardCard({ title, subtitle, body }: DashboardCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{subtitle}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>{body}</p>
            </CardContent>
        </Card>
    )
}