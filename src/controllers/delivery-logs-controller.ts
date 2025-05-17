import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";

//rota para criar um novo registro de log de entrega
class DeliveryLogsController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      delivery_id: z.string().uuid(),
      description: z.string(),
    });

    const { delivery_id, description } = bodySchema.parse(request.body);

    //procura se existe uma entrega com o id informado
    const delivery = await prisma.delivery.findUnique({
      where: {
        id: delivery_id,
      },
    });

    //se não existir a entrega
    if (!delivery) {
      throw new AppError("Delivery not found", 404);
    }

    //entrega em processamento, não foi enviado
    if (delivery.status === "processing") {
      throw new AppError("Change status to shipped", 404);
    }

    await prisma.deliveryLog.create({
      data: {
        deliveryId: delivery_id,
        description,
      },
    });

    return response.status(201).json({
      message: "log created",
    });
  }

  //lista detalhes de um registro de log de entrega
  async show(request: Request, response: Response) {
    const paramsSchema = z.object({
      delivery_id: z.string().uuid(),
    });

    const { delivery_id } = paramsSchema.parse(request.params);

    const delivery = await prisma.delivery.findUnique({
      where: {
        id: delivery_id,
      },
    });

    //verifica se o usuário é cliente, e se o id do usuário é diferente do id do usuário da entrega
    if (
      request.user?.role === "customer" &&
      request.user.id !== delivery?.userId
    ) {
      throw new AppError("The user can only view their deliveries", 401);
    }

    return response.json(delivery);
  }
}

export { DeliveryLogsController };
