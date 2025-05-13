import { PrismaClient } from "@prisma/client";

//conexão com o banco de dados usando o prisma
export const prisma = new PrismaClient({
  //se está em ambiente de produção, vai mostrar os logs
  log: process.env.NODE_ENV === "production" ? [] : ["query"],
});