const iniciarMongoDb = require("./db/conexao").iniciar;
const iniciarAutenticacao = require("./autenticacao").iniciar;
const iniciarGraphql = require("./graphql/server").iniciar;

iniciarAutenticacao()
  .then(() => iniciarMongoDb())
  .then(() => iniciarGraphql())
  .then(({ url }) => {
    console.log(`🚀  Servidor rodando em ${url}`);
  })
  .catch(erro => {
    console.error(erro);
  });
