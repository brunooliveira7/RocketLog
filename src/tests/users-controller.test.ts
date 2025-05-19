import request from "supertest";
import { app } from "@/app";
import { prisma } from "@/database/prisma";

describe("Users Controller", () => {
  //variável para armazenar o id do usuário criado do teste
  let user_id: string;

  //deletar o usuário criado após o teste
  afterAll(async () => {
    await prisma.user.delete({
      where: {
        id: user_id,
      },
    });
  });

  //teste para criar um novo usuário
  it("should create a new user", async () => {
    //variável para armazenar o id do usuário criado do teste

    //fazer uma requisição POST para a rota /users com os dados do usuário para cadastrar
    const response = await request(app).post("/users").send({
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
    });

    //verificar se a resposta tem o status 201 (created) - igual userController.ts
    expect(response.status).toBe(201);
    //verificar se o corpo da resposta contém as propriedades esperadas
    expect(response.body).toHaveProperty("id");
    //verificar se o nome do usuário foi criado corretamente
    expect(response.body.name).toBe("Test User");

    //
    user_id = response.body.id;
  });
  //teste para cadastrar um usuário com email já existente
  it("should throw an error if user whit email already existe", async () => {
    //fazer uma requisição POST para a rota /users com os dados do usuário para cadastrar
    const response = await request(app).post("/users").send({
      name: "Duplicate User",
      email: "testuser@example.com",
      password: "password123",
    });

    //verificar se a resposta tem o status 400 (bad request) - igual userController.ts
    expect(response.status).toBe(400);
    //verificar se o corpo da resposta contém a mensagem de erro esperada
    expect(response.body.message).toBe("User with same email already exists");
  });

  //teste validar email
  it("should throw a validation error if email is invalid", async () => {
    //fazer uma requisição POST para a rota /users com os dados do usuário para cadastrar
    const response = await request(app).post("/users").send({
      name: "Test User",
      email: "invalid-email",
      password: "password123",
    });

    //verificar se a resposta tem o status 400 (bad request) - igual userController.ts
    expect(response.status).toBe(400);
    //verificar se o corpo da resposta contém a mensagem de erro esperada
    expect(response.body.message).toBe("Validation error");
  });
});
