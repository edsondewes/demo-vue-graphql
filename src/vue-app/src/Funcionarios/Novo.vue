<template>
  <Formulario @submit="salvar" />
</template>

<script>
import gql from 'graphql-tag'
import Formulario from './Formulario';

export default {
  components: {
    Formulario,
  },
  methods: {
    async salvar (info) {
      await this.$apollo.mutate({
        mutation: gql`
        mutation NovoFuncionario($funcionario: InfoFuncionario!) {
          adicionarFuncionario(info: $funcionario) {
            id,
            nome,
            sobrenome,
            dataNascimento
          }
        }`,
        variables: {
          funcionario: info
        }
      });

      this.$router.push({ name: "lista" });
    }
  },
}
</script>