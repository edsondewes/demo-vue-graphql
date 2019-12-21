const fs = require("fs");
const jwt = require("jsonwebtoken");

const key = fs.readFileSync("./cert/private.key", "utf8");
const cert = fs.readFileSync("./cert/public.cert", "utf8");

const listaUsuarios = [
  {
    usuario: "joao",
    senha: "1234",
    claims: { nome: "João Teste", regiao: "oeste" },
  },
  {
    usuario: "maria",
    senha: "1234",
    claims: { nome: "Maria Teste", regiao: "leste" },
  },
];

function autenticar(usuario, senha) {
  const login = listaUsuarios.find(
    u => u.usuario === usuario && u.senha === senha,
  );

  return login ? jwt.sign(login.claims, key, { algorithm: "RS256" }) : null;
}

module.exports = {
  autenticar,
  cert,
};
