/* global __GRAPHQL_URL__ */

import Vue from "vue";
import ApolloClient from "apollo-boost";
import VueApollo from "vue-apollo";
import VueRouter from "vue-router";
import { carregarToken } from "./autenticacao";

import App from "./App";
import EdicaoFuncionario from "./Funcionarios/Edicao";
import NovoFuncionario from "./Funcionarios/Novo";
import ListaFuncionarios from "./Funcionarios/Lista";

const authToken = carregarToken();
if (authToken) {
  const apolloProvider = new VueApollo({
    defaultClient: new ApolloClient({
      uri: __GRAPHQL_URL__,
      request: operation => {
        operation.setContext({
          headers: {
            authorization: `Bearer ${authToken}`,
          },
        });
      },
    }),
  });

  const router = new VueRouter({
    routes: [
      { path: "/", name: "lista", component: ListaFuncionarios },
      { path: "/novo", name: "novo", component: NovoFuncionario },
      { path: "/editar/:id", name: "editar", component: EdicaoFuncionario },
    ],
  });

  Vue.use(VueApollo);
  Vue.use(VueRouter);

  new Vue({
    el: "#app",
    apolloProvider,
    router,
    render: h => h(App),
  });
}
