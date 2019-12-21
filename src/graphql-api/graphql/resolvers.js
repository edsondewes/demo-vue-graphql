const { GraphQLError } = require("graphql");
const { GraphQLDate } = require("graphql-iso-date");
const FuncionarioModel = require("../db/FuncionarioModel");

module.exports = {
  Query: {
    listarFuncionarios: (_, { pagina, tamanhoPagina }, { regiao }) => {
      if (pagina < 1) {
        throw new GraphQLError("Página deve ser maior que zero");
      }

      if (tamanhoPagina < 1) {
        throw new GraphQLError("Tamanho da página deve ser maior que zero");
      }

      const posicaoInicial = (pagina - 1) * tamanhoPagina;
      return FuncionarioModel.find({ regiao }, null, {
        skip: posicaoInicial,
        sort: { nome: 1 },
        limit: tamanhoPagina,
      });
    },

    obterFuncionario: (_, { id }, { regiao }) =>
      FuncionarioModel.findOne({ _id: id, regiao }),
  },
  Mutation: {
    adicionarFuncionario: (_, { info }, { regiao }) =>
      FuncionarioModel.create({ ...info, regiao }),
    atualizarFuncionario: (_, { id, info }, { regiao }) =>
      FuncionarioModel.findOneAndUpdate({ _id: id, regiao }, info, {
        new: true,
      }),
    excluirFuncionario: (_, { id }, { regiao }) =>
      FuncionarioModel.findOneAndDelete({ _id: id, regiao }),
  },
  Date: GraphQLDate,
};
