import { env } from "../env";

//define o segredo (JWT - com var de ambiente) e o tempo de expiração - token
export const authConfig = {
  jwt: {
    secret: env.JWT_SECRET,
    expiresIn: "1d",
  },
};
