import { Request, Response } from "express";
import { z } from "zod";

//rota para criar um novo registro de log de entrega
class DeliveryLogsController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      delivery_id: z.string().uuid(),
      description: z.string(),
    });

    return response.json({
      message: "log created",
    });
  }
}

export { DeliveryLogsController };
