const { ApolloServer } = require("apollo-server");
const config = require("../config");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const context = require("./context");

const graphqlOptions = config.get("graphql");
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  playground: graphqlOptions.playground,
  introspection: graphqlOptions.introspection,
});

function iniciar() {
  const port = process.env.NODE_ENV === "production" ? 80 : 4000;
  return server.listen({
    port,
  });
}

module.exports = {
  iniciar,
};
