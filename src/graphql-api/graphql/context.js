const config = require("../config");
const { validar } = require("../autenticacao");

module.exports = config.get("auth")
  ? ({ req }) => {
      // Token é recebido no formato "Bearer <token>"
      // Só nos interessa a segunda parte
      const token = req.headers.authorization
        ? req.headers.authorization.split(" ")[1]
        : null;

      const claims = validar(token);
      return claims;
    }
  : // Caso autenticação esteja desabilitada
    // Todos usuário acessam a região global
    { regiao: "global" };
