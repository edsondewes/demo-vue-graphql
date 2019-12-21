const nconf = require("nconf");
const path = require("path");

// Variáveis de ambiente sobrescrevem as configs do arquivo
nconf
  .env({ separator: "__", parseValues: true })
  .file({ file: path.resolve("appsettings.json") });

module.exports = nconf;
