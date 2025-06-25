"use client"

import { useTransition } from "react";
import { deleteProduct, toggleProductAvailability } from "../../_actions/products";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

// Botões de ação para cada produto
export function ActiveToggleDropdownItem({
    id,
    isAvailableForPurchase,
}: {
    id: string,
    isAvailableForPurchase: boolean
}) {

    const [isPending, startTransition] = useTransition() //para fazer a transição de um estado para o outro
    const router = useRouter() //para fazer a navegação
    return (
        <DropdownMenuItem
            disabled={isPending} //se estiver pendente, ele desabilita o botão
            onClick={() => { //quando clicar no botão, ele vai mudar o estado
                startTransition(async () => {
                    await toggleProductAvailability(id, // função que muda o estado do produto
                        !isAvailableForPurchase)
                        router.refresh() //atualiza a página, depois que edita
                })
            }}>{isAvailableForPurchase ? "Desativado" : "Ativado"}</DropdownMenuItem> //se o produto estiver disponível, ele mostra "Desativado", se não, ele mostra "Ativado"
    )
}

export function DeleteDropdownItem( {id, disabled}: { id: string, disabled: boolean }) {
    const [isPending, startTransition] = useTransition() //para fazer a transição de um estado para o outro
    const router = useRouter() //para fazer a navegação
    return (
        <DropdownMenuItem
        variant="destructive" //CSS
            disabled={ disabled || isPending} // se estiver desabilitado ou pendente, ele desabilita o botão
            onClick={() => { //quando clicar no botão, ele vai mudar o estado
                startTransition(async () => {
                    await deleteProduct(id) // função que deleta o produto
                    router.refresh() //atualiza a página, depois que deleta
                })
            }}>Deletar</DropdownMenuItem> 
    )
}
