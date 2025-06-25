import { Button } from "@/components/ui/button";
import { PageHeader } from "../_components/PageHeader";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import db from "@/db/db";
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { ActiveToggleDropdownItem, DeleteDropdownItem } from "./_components/ProductActions";

export default function AdminProductPage() { 
    return ( 
        <> 
        <div className="flex justify-between items-center gap-4">
            <PageHeader>Produtos</PageHeader>
            <Button asChild> 
                <Link href="/admin/produtos/novo">Adicionar Produto</Link>
            </Button>
        </div> 
        <ProductsTable />
        </> //asChild para ter certeza que vai rederizar o link
    )
}

// Tabela de produtos
async function ProductsTable() {
    const products = await db.product.findMany({ //busca todos os produtos do banco de dados
        select: { 
            id: true, 
            name: true, 
            priceInCents: true, 
            isAvailableForPurchase: true, 
            _count: { select: { orders: true }}
        },
        orderBy: { name: "asc"} //ordenação por nome    
    })

    if (products.length === 0) return <p>Nenhum produto achado</p> //se não tiver produtos, ele retorna uma mensagem

    return ( 
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead className="w-0" /* invisivel */>
                <span className="sr-only">Disponível para compra</span>
                </TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Pedidos</TableHead>
                <TableHead className="w-0" /* invisivel */>
                <span className="sr-only">Ações</span>
                </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {products.map(product => ( //loop para mostrar todos os produtos
                <TableRow key={product.id}>
                    <TableCell /* se o produto estiver disponível para compra, ele mostra o ícone de check, se não, ele mostra o ícone de x*/> 
                        {product.isAvailableForPurchase ? (
                        <> 
                            <span className="sr-only">Disponível</span>
                            <CheckCircle2 /> 
                        </>
                        ) : (
                        <> 
                            <span className="sr-only">Indisponível</span>
                            <XCircle className="stroke-destructive"/> 
                        </>
                        )}
                    </TableCell>
                    <TableCell>{product.name /*mostra o nome do produto do banco de dados*/}</TableCell> 
                    <TableCell>{formatCurrency(product.priceInCents / 100) /*mostra o preço do produto do banco de dados*/}</TableCell> 
                    <TableCell>{formatNumber(product._count.orders) /*mostra os pedidos do produto do banco de dados*/}</TableCell> 
                    <TableCell>
                    <DropdownMenu>
                    <DropdownMenuTrigger>
                        <MoreVertical />
                        <span className="sr-only">Ações</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem asChild /*asChild para ter certeza que vai rederizar o link*/>
                            <a download href={`/admin/produtos/${product.id}/download`} /* nao usei link do react pois nao estou roteando para uma página particular */
                            >Download</a> 
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild /*asChild para ter certeza que vai rederizar o link*/>
                            <Link href={`/admin/produtos/${product.id}/editar`}>
                            Editar
                            </Link>
                        </DropdownMenuItem>
                        <ActiveToggleDropdownItem id={product.id} isAvailableForPurchase={product.isAvailableForPurchase} /*chama a função que muda o estado do produto*/ />
                        <DropdownMenuSeparator />
                        <DeleteDropdownItem id={product.id} disabled={product._count.orders > 0} /*chama a função que deleta o produto*/ /> 
                    </DropdownMenuContent>
                    </DropdownMenu>
                        </TableCell> 
                </TableRow>
            ))}
        </TableBody>
    </Table>
    )
}