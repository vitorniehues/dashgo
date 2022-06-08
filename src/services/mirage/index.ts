import { createServer } from "miragejs";

export function createApiServer() {
  return createServer({
    routes() {
      this.urlPrefix = "http://localhost:3005";

      this.get("/usuario", () => {
        return {
          id: 1,
          cpf: "12345678911",
          email: "teste@teste.com.br",
          role: "USUARIO",
          pessoasAutorizadas: [10, 20]
        };
      });

      this.post("/login", () => {
        return {
          userInfo: {
            id: 1,
            cpf: "12345678911",
            email: "teste@teste.com.br",
            role: "USUARIO",
            pessoasAutorizadas: [10, 20]
          },
          token: "access-token",
          refreshToken: "refresh-token"
        };
      });

      this.post("/usuario", (_schema, req) => {
        return req.requestBody
      });

      this.urlPrefix = "http://localhost:3010";
      this.namespace = "pessoa";

      this.get("/autorizadas", () => {
        return [
          { cod_pessoa: 10, nome: "Pessoa 10" },
          { cod_pessoa: 20, nome: "Pessoa 20" }
        ];
      });

      this.get(
        ":idPessoa/produto/:idProduto/regrasvendas",
        (_schema, request) => {
          const idPessoa = request.params.idPessoa;
          const idProduto = request.params.idProduto;

          if (idPessoa === "10" && idProduto === "1000")
            return [
              {
                cod_regra: 1,
                lancamentos_padrao: { nome: "Dinheiro" },
                valor: 6.5
              },
              {
                cod_regra: 2,
                lancamentos_padrao: { nome: "Cartão" },
                valor: 6.9
              }
            ];
          if (idPessoa === "10" && idProduto === "1001")
            return [
              {
                cod_regra: 1,
                lancamentos_padrao: { nome: "Dinheiro" },
                valor: 7
              },
              {
                cod_regra: 2,
                lancamentos_padrao: { nome: "Cartão" },
                valor: 7.5
              }
            ];
          if (idPessoa === "20" && idProduto === "1000")
            return [
              {
                cod_regra: 1,
                lancamentos_padrao: { nome: "Dinheiro" },
                valor: 9
              },
              {
                cod_regra: 2,
                lancamentos_padrao: { nome: "Cartão" },
                valor: 9.5
              }
            ];
          if (idPessoa === "20" && idProduto === "1001")
            return [
              {
                cod_regra: 1,
                lancamentos_padrao: { nome: "Dinheiro" },
                valor: 10
              },
              {
                cod_regra: 2,
                lancamentos_padrao: { nome: "Cartão" },
                valor: 10.5
              }
            ];
        }
      );
      this.namespace = "";
      this.urlPrefix = "";
      this.passthrough();
    }
  });
}
