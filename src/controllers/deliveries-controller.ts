import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { z } from "zod";

//criar uma entrega
class DeliveriesController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      user_id: z.string().uuid(),
      description: z.string(),
    });

    const { user_id, description } = bodySchema.parse(request.body);

    //cadastrar uma entrega no banco de dados
    await prisma.delivery.create({
      data: {
        userId: user_id,
        description,
      },
    });

    return response.status(201).json();
  }

  //listar todas as entregas
  async index(request: Request, response: Response) {
    //recupera todas - findMandy - as entregas
    const deliveries = await prisma.delivery.findMany({
      //retorna o nome e email do usuário que fez o pedido - insomnia
      include: {
        user: { select: { name: true, email: true } }, 
      },
    });

    return response.json(deliveries);
  }
}

export { DeliveriesController };
