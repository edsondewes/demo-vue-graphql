<template>
  <div>
    <div class="d-flex mb-3">
      <router-link
        :to="{name: 'novo' }"
        class="btn btn-primary mr-auto"
      >
        Novo funcionário
      </router-link>
      <div class="btn-group">
        <button
          class="btn btn-secondary"
          :disabled="pagina === 1"
          @click="pagina -= 1"
        >
          <Octicon
            ico="arrow-left"
            :width="15"
          />
        </button>
        <button
          class="btn btn-secondary"
          :disabled="lista && lista.length === 0"
          @click="pagina += 1"
        >
          <Octicon
            ico="arrow-right"
            :width="15"
          />
        </button>
      </div>
    </div>
    <div
      v-if="!lista"
      class="alert alert-light"
    >
      Carregando...
    </div>
    <div v-else>
      <div
        v-if="!lista.length"
        class="alert alert-warning"
      >
        Nenhum item nesta página
      </div>
      <table
        v-else
        class="table table-striped table-hover"
      >
        <thead>
          <tr>
            <th>Nome</th>
            <th>Sobrenome</th>
            <th>Data de nascimento</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in lista"
            :key="item.id"
          >
            <td>
              <router-link :to="{name: 'editar', params: { id: item.id } }">
                {{ item.nome }}
              </router-link>
            </td>
            <td>{{ item.sobrenome }}</td>
            <td>{{ item.dataNascimento }}</td>
            <td>
              <button
                class="btn btn-link btn-excluir"
                @click="excluir(item.id)"
              >
                <Octicon ico="trashcan" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import Octicon from '../Octicon';

export default {
  components: {
    Octicon,
  },
  data () {
    return {
      pagina: 1
    }
  },
  apollo: {
    lista: {
      query: gql`
      query ListarFuncionarios($pagina: Int!){
        listarFuncionarios(pagina: $pagina) {
          id,
          nome,
          sobrenome,
          dataNascimento
        }
      }
    `,
      variables () {
        return {
          pagina: this.pagina
        }
      },
      update: data => data.listarFuncionarios,
      fetchPolicy: 'network-only'
    }
  },
  methods: {
    async excluir (id) {
      await this.$apollo.mutate({
        mutation: gql`
        mutation ExcluirFuncionario($id: ID!) {
          excluirFuncionario(id: $id) {
            id
          }
        }`,
        variables: {
          id
        }
      });

      await this.$apollo.queries.lista.refetch();
    }
  },
};
</script>

<style scoped>
.btn-excluir {
  line-height: 0;
  padding: 0;
}
</style>