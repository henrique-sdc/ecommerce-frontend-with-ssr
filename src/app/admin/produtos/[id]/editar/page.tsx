import { PageHeader } from "@/app/admin/_components/PageHeader";
import { ProductForm } from "../../_components/ProductForm";
import db from "@/db/db";


//Página para editar um novo produto
export default async function EditProductPage({ 
    params: { id},
}: {
    params: { id: string }
}) {
    const product = await db.product.findUnique({where: {id}}) //busca o produto pelo id
    return (
    <>
        <PageHeader>Editar Produto</PageHeader>
        <ProductForm product={product}/>
    </>
    )
}