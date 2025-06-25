# 🛒 E-Commerce Full-Stack com Painel Administrativo

![Next.js](https://img.shields.io/badge/Next.js-14.x-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-5.x-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-API-6772E5?style=for-the-badge&logo=stripe&logoColor=white)

## 📌 Visão Geral

Este projeto é uma loja online (e-commerce) completa, construída do zero como uma aplicação full-stack. Ele inclui tanto a vitrine para clientes quanto um painel administrativo para gerenciamento.

A plataforma permite que usuários naveguem por produtos, gerenciem seus carrinhos de compras e finalizem pagamentos de forma segura. O painel administrativo oferece ao lojista controle total sobre o catálogo de produtos, visualização de pedidos e gestão de clientes.

## ✨ Funcionalidades Principais

### Para Clientes
-   **Navegação de Produtos**: Explore o catálogo com listagem, filtros e busca em tempo real.
-   **Carrinho de Compras**: Adicione, remova e atualize a quantidade de produtos de forma dinâmica.
-   **Checkout Seguro**: Processo de pagamento integrado com a API da Stripe.
-   **Autenticação**: Crie sua conta, faça login e gerencie seu perfil.
-   **Histórico de Pedidos**: Visualize todos os pedidos já realizados na sua conta.
-   **Email de Confirmação**: Receba um recibo automático por e-mail após cada compra bem-sucedida.

### Para Administradores
-   **Painel de Controle**: Uma visão geral com métricas de vendas, clientes e produtos.
-   **Gerenciamento de Produtos (CRUD)**: Crie, leia, atualize e remova produtos do catálogo.
-   **Gestão de Pedidos**: Visualize e gerencie o status de todos os pedidos realizados.
-   **Visualização de Clientes**: Acesse a lista de clientes cadastrados.

## 🛠️ Tecnologias Utilizadas

-   **Front-end**: **Next.js** (com App Router) e **React 18**
-   **Estilização**: **Tailwind CSS** para uma UI moderna e responsiva.
-   **Back-end**: **API Routes** do Next.js (ambiente Node.js).
-   **Banco de Dados**: **Prisma ORM** (compatível com PostgreSQL, MySQL, SQLite, etc.).
-   **Processamento de Pagamentos**: **Stripe API**.

## 📋 Pré-requisitos

Antes de começar, certifique-se de que você tem instalado:

-   **[Node.js](https://nodejs.org/)** (versão 18 ou superior)
-   **[npm](https://www.npmjs.com/)** ou **[yarn](https://yarnpkg.com/)**
-   **[Git](https://git-scm.com/)**
-   Um banco de dados de sua escolha (ex: **[PostgreSQL](https://www.postgresql.org/download/)**)
-   Uma conta **[Stripe](https://stripe.com/)** para obter as chaves de API.

## ⚙️ Instalação e Configuração

Siga os passos abaixo para executar o projeto localmente:

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/henrique-sdc/ecommerce-frontend-with-ssr.git
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente:**
    -   Abra o arquivo `.env` e preencha com suas próprias credenciais:
        ```env
        DATABASE_URL="file:./dev.db"
        ADMIN_USERNAME=admin
        HASHED_ADMIN_PASSWORD=SUA-CHAVE-AQUI
        STRIPE_SECRET_KEY=SUA-CHAVE-AQUI
        
        NEXT_PUBLIC_STRIPE_PUBLIC_KEY=SUA-CHAVE-AQUI
        NEXT_PUBLIC_SERVER_URL=http://localhost:3000
        ```

4.  **Execute as migrações do banco de dados com o Prisma:**
    -   Este comando irá criar as tabelas no seu banco de dados com base no schema do Prisma.
    ```bash
    npx prisma migrate dev --name init
    ```

5.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

## ▶️ Executando a Aplicação

-   Após a execução do `npm run dev`, a aplicação estará disponível em **[http://localhost:3000](http://localhost:3000)**.
-   O **Painel Administrativo** estará em uma rota protegida, `http://localhost:3000/admin`.
