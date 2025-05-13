import { Request, Response } from "express";
import { z } from "zod";

class UsersController {
  create(request: Request, response: Response) {
    //validar o body com o zod - se não passar na validação, vai retornar um erro
    const bodySchema = z.object({
      name: z.string().trim().min(3),
      email: z.string().email(),
      password: z.string().min(6),
    });

    //recuperar o body da requisição
    const { name, email, password } = bodySchema.parse(request.body);

    return response.json({ message: "create user" });
  }
}

export { UsersController };
