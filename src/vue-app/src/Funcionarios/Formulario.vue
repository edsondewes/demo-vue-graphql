<template>
  <form @submit.prevent="submit">
    <div class="form-group">
      <label
        for="nome"
        class="font-weight-bold"
      >Nome:</label>
      <input
        id="nome"
        v-model="nomeLocal"
        class="form-control"
        type="text"
        required
      >
    </div>
    <div class="form-group">
      <label
        for="sobrenome"
        class="font-weight-bold"
      >Sobrenome:</label>
      <input
        id="sobrenome"
        v-model="sobrenomeLocal"
        class="form-control"
        type="text"
        required
      >
    </div>
    <div class="form-group">
      <label
        for="dataNascimento"
        class="font-weight-bold"
      >Data de nascimento:</label>
      <input
        id="dataNascimento"
        v-model="dataNascimentoLocal"
        class="form-control"
        type="date"
        required
      >
    </div>
    <div class="text-right">
      <router-link
        :to="{name: 'lista' }"
        class="btn btn-link"
      >
        Voltar
      </router-link>
      <input
        type="submit"
        class="btn btn-primary"
        value="Salvar"
      >
    </div>
  </form>
</template>

<script>
export default {
  props: {
    nome: {
      type: String,
      default: ''
    },
    sobrenome: {
      type: String,
      default: ''
    },
    dataNascimento: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      nomeLocal: this.nome,
      sobrenomeLocal: this.sobrenome,
      dataNascimentoLocal: this.dataNascimento
    };
  },
  methods: {
    submit () {
      this.$emit('submit', {
        nome: this.nomeLocal,
        sobrenome: this.sobrenomeLocal,
        dataNascimento: this.dataNascimentoLocal
      });
    }
  }
}
</script>