import { ReactNode } from "react";
//CSS do cabeçalho da página
export function PageHeader({ children}: { children: ReactNode }) {
    return <h1 className="text-4xl mb-4">{children}</h1>
}