import { Nav, NavLink } from "@/components/Nav";

export const dynamic = "force-dynamic"; //isso força o NextJS a não deixar no cache a página de admin, já que ela não precisa ser rápida, pois são poucas pessoas que acessam, ela precisa estar com os dados em dia

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    // Navbar da página principal
    return <>
        <Nav>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/produtos">Produtos</NavLink>
            <NavLink href="/pedidos">Meus Pedidos</NavLink>
        </Nav>
        <div className="container my-6">{children}</div>
    </>
}