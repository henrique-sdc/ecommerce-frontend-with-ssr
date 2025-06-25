import { PageHeader } from "../../_components/PageHeader";
import { ProductForm } from "../_components/ProductForm";

//Página para adicionar um novo produto
export default function NewProductPage() {
    return (
    <>
        <PageHeader>Adicionar Produto</PageHeader>
        <ProductForm />
    </>
    )
}