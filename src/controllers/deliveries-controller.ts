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
}

export { DeliveriesController };
