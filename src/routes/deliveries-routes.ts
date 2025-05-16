import { Router } from "express";
import { DeliveriesController } from "@/controllers/deliveries-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const deliveriesRoutes = Router();
const deliveriesController = new DeliveriesController();

//rota vai usar o middleware de autenticação de usuário e se o usuário é um vendedor
deliveriesRoutes.use(ensureAuthenticated, verifyUserAuthorization(["sale"]));


deliveriesRoutes.post("/", deliveriesController.create);

export { deliveriesRoutes };