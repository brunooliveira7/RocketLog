import { Request, Response } from "express";
import { z } from "zod";
import { hash } from "bcrypt";

class UsersController {
  async create(request: Request, response: Response) {
    //validar o body com o zod - se não passar na validação, vai retornar um erro
    const bodySchema = z.object({
      name: z.string().trim().min(3),
      email: z.string().email(),
      password: z.string().min(6),
    });

    //recuperar o body da requisição
    const { name, email, password } = bodySchema.parse(request.body);

    //criptografar a senha - 8 é o numero de rounds
    const hashedPassword = await hash(password, 8);

    return response.json({ message: "create user", hashedPassword });
  }
}

export { UsersController };
