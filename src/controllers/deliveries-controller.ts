import { Request, Response } from "express";

class DeliveriesController {
  async create(request: Request, response: Response) {
    return response.status(201).json({ message: "Delivery created" });
  }
}

export { DeliveriesController };
