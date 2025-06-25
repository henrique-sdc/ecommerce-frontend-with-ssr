"use client" // se estou usando um hook, preciso dessa linha
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, ReactNode } from "react";

// CSS da navbar
export function Nav({ children}: { children: ReactNode}) {
    return <nav className="bg-primary text-primary-foreground
    flex justify-center px-4">{children}</nav>
}

// Permite a navegação entre as páginas fácil, CSS
export function NavLink(props: Omit<ComponentProps<typeof 
    Link>, "className">) {
    const pathname = usePathname(); /* Pega o pathname atual */
    return <Link {...props} className={cn/* classes especias */("p-4 hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground", pathname === props.href && "bg-background text-foreground")} />
}