<template>
  <div>
    <Formulario
      v-if="funcionario"
      v-bind="funcionario"
      @submit="salvar"
    />
    <div v-else>
      Carregando...
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import Formulario from './Formulario';

export default {
  components: {
    Formulario,
  },
  apollo: {
    funcionario: {
      query: gql`
      query ObterFuncionario($id: ID!) {
        obterFuncionario(id: $id) {
          nome,
          sobrenome,
          dataNascimento
        }
      }
    `,
      variables () {
        return { id: this.$route.params.id }
      },
      update: data => data.obterFuncionario
    }
  },
  methods: {
    async salvar (info) {
      await this.$apollo.mutate({
        mutation: gql`
        mutation AtualizarFuncionario($id: ID!, $funcionario: InfoFuncionario!) {
          atualizarFuncionario(id: $id, info: $funcionario) {
            id,
            nome,
            sobrenome,
            dataNascimento
          }
        }`,
        variables: {
          id: this.$route.params.id,
          funcionario: info
        }
      });

      this.$router.push({ name: "lista" });
    }
  },
}
</script>