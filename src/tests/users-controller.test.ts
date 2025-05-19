import request from "supertest";
import { app } from "@/app";


describe("Users Controller", () => {
  //tester se o usuário foi criado
  it("should create a new user", async () => {
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
  });
});
