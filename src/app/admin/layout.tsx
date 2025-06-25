import { Nav, NavLink } from "@/components/Nav";

export const dynamic = "force-dynamic"; //isso força o NextJS a não deixar no cache a página de admin, já que ela não precisa ser rápida, pois são poucas pessoas que acessam, ela precisa estar com os dados em dia

export default function AdminLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    // Navbar do admin
    return <>
        <Nav>
            <NavLink href="/admin">Dashboard</NavLink>
            <NavLink href="/admin/produtos">Produtos</NavLink>
            <NavLink href="/admin/usuarios">Clientes</NavLink>
            <NavLink href="/admin/predidos">Vendas</NavLink>
        </Nav>
        <div className="container my-6">{children}</div>
    </>
}