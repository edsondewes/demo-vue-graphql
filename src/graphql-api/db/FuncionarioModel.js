const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    nome: String,
    sobrenome: String,
    dataNascimento: Date,
    regiao: String,
  },
  {
    versionKey: false,
  },
);

schema.index({ regiao: 1, nome: 1, sobrenome: 1 });

const FuncionarioModel = mongoose.model("Funcionario", schema);
module.exports = FuncionarioModel;
