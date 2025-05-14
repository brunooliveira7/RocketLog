import { Request, Response } from "express";
import { z } from "zod";
import { hash } from "bcrypt";
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";

class UsersController {
  async create(request: Request, response: Response) {
    //valida o body com o zod - se não passar(dados do user), retorna erro
    const bodySchema = z.object({
      name: z.string().trim().min(3),
      email: z.string().email(),
      password: z.string().min(6),
    });

    //recuperar o body da requisição do user
    const { name, email, password } = bodySchema.parse(request.body);

    //verificar usuário com mesmo email
    const userWithSameEmail = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (userWithSameEmail) {
      throw new AppError("User with same email already exists");
    }

    //criptografar a senha - 8 é o numero de rounds
    const hashedPassword = await hash(password, 8);

    //criar o usuário
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    //para não retornar a senha
    const { password: _, ...userWithoutPassword } = user;

    return response.json(userWithoutPassword);
  }
}

export { UsersController };
