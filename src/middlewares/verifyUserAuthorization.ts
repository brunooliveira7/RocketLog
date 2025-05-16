import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";

//verifica se os usuários estão autorizados a acessar a rota
function verifyUserAuthorization(role: string[]) {
  return (request: Request, response: Response, next: NextFunction) => {
    //verifica se o usuário está autenticado
    if (!request.user) {
      throw new AppError("Unauthorized", 401);
    }

    //verifica se o usuário tem a role correta para acessar a rota
    if (!role.includes(request.user.role)) {
      throw new AppError("Unauthorized", 401);
    }

    return next();
  };
}

export { verifyUserAuthorization };
