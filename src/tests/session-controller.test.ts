import request from "supertest";
import { app } from "@/app";
import { prisma } from "@/database/prisma";

describe("Session Controller", () => {
  let user_id: string;

  //teste de login e geração do token
  it("should authenticate a and get access token", async () => {
    //cria um usuário
    const userResponse = await request(app).post("/users").send({
      name: "Auth Test User",
      email: "authtestuser@example.com",
      password: "password123",
    });

    user_id = userResponse.body.id;

    //faz o login
    const sessionResponse = await request(app).post("/sessions").send({
      email: "authtestuser@example.com",
      password: "password123",
    });

    //verifica se a resposta tem o status 200
    expect(sessionResponse.status).toBe(200);
    //verifica se a resposta tem um token e se ele é uma string
    expect(sessionResponse.body.token).toEqual(expect.any(String));
  });
});
