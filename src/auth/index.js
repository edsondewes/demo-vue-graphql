const express = require("express");
const bodyParser = require("body-parser");
const { autenticar, cert } = require("./autenticacao");

const app = express();
app.set("view engine", "pug");
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function(req, res) {
  res.render("index");
});

app.post("/", function(req, res) {
  const { usuario, senha } = req.body;
  const token = autenticar(usuario, senha);

  const { redirect } = req.query;
  if (token && redirect) {
    res.redirect(`${redirect}#token=${token}`);
  } else {
    const model = token ? { token } : { erro: true };
    res.render("index", model);
  }
});

app.get("/cert", function(_, res) {
  res.set("Content-Type", "text/plain");
  res.send(cert);
});

const port = process.env.NODE_ENV === "production" ? 80 : 4001;
app.listen(port, () => console.log(`Express app rodando na porta ${port}!`));
