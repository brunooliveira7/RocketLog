import { Request, Response } from "express";

class SessionsController {
  create(request: Request, response: Response) {
    return response.json({ message: "Criando sessão" });
  }
}

export { SessionsController };
