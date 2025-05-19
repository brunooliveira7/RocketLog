import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { z } from "zod";

//atualiza o status de uma entrega
class DeliveriesStatusController {
  async update(request: Request, response: Response) {
    //validar parâmetros da rota
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    //validar o body da requisição
    const bodySchema = z.object({
      status: z.enum(["processing", "shipped", "delivered"]),
    });

    const { id } = paramsSchema.parse(request.params);
    const { status } = bodySchema.parse(request.body);

    //atualiza o status da entrega no banco de dados
    await prisma.delivery.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });

    //cria um log sempre que o status mudar
    await prisma.deliveryLog.create({
      data: {
        deliveryId: id,
        description: `Status changed to ${status}`,
      },
    });

    return response.json({
      message: "Delivery status updated",
    });
  }
}

export { DeliveriesStatusController };
