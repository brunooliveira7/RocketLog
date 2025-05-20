# 📦 API de Entregas de Encomendas

Este projeto consiste no desenvolvimento de uma **API RESTful** para gerenciamento de entregas, com funcionalidades voltadas tanto para **clientes** quanto para **vendedores**, cada um com permissões distintas. A API oferece rastreamento detalhado do status dos pedidos e permite o controle completo do fluxo de entrega.

---

## 🚀 Funcionalidades

- ✅ Cadastro com autenticação e validação de **usuários** (clientes e vendedores);
- ✅ Criação de **pedidos de entrega**;
- ✅ Atualização de **status** do pedido:
  - `processing`
  - `shipped`
  - `delivered`
- ✅ Registro de **logs** de movimentação da entrega (ex: “Produto saiu para entrega”);
- ✅ Rastreamento em tempo real das entregas;
- ✅ Associação de entregas a usuários;
- ✅ Respostas estruturadas em JSON para facilitar o consumo por front-ends ou serviços externos.

---

## 📁 Organização das Rotas
Método	Rota	Descrição
POST	/users	Criação de usuários
POST	/sessions	Autenticação de usuários
POST	/deliveries	Criação de pedidos de entrega
GET	/delivery-logs	Listagem de logs de entregas
PATCH	/deliveries/:id/status	Atualização de status da entrega
GET	/deliveries/:id/show	Exibição detalhada de uma entrega

---

## 🐳 Ambiente com Docker
O ambiente de desenvolvimento e testes utiliza Docker e Docker Compose para facilitar a configuração e portabilidade da aplicação.

## 📦 Imagem utilizada:
PostgreSQL via Bitnami PostgreSQL

---

## 🧱 Tecnologias Utilizadas
Node.js

- Express

- TypeScript

- Prisma ORM

- PostgreSQL

- Jest + Supertest

- Docker

- Docker Compose

