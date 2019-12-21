const { gql } = require("apollo-server");

module.exports = gql`
  scalar Date

  type Funcionario {
    id: ID!
    nome: String!
    sobrenome: String!
    dataNascimento: Date
  }

  input InfoFuncionario {
    nome: String!
    sobrenome: String!
    dataNascimento: String
  }

  type Query {
    listarFuncionarios(pagina: Int = 1, tamanhoPagina: Int = 20): [Funcionario]
    obterFuncionario(id: ID!): Funcionario
  }

  type Mutation {
    adicionarFuncionario(info: InfoFuncionario!): Funcionario
    atualizarFuncionario(id: ID!, info: InfoFuncionario!): Funcionario
    excluirFuncionario(id: ID!): Funcionario
  }
`;
