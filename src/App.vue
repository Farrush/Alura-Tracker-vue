<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-quarter">
      <BarraLateral/>
    </div>
    <div class="column is-three-quarter">
      <FormularioTask @aoSalvarTarefa="salvarTarefa"/>
      <Tarefa v-for="(tarefa, index) in Tarefas" :key="index" :tarefa="tarefa"/>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ITarefa from './interfaces/ITarefa'
import BarraLateral from './components/BarraLateral.vue'
import FormularioTask from './components/Formulario.vue'
import Tarefa from './components/Tarefa.vue'
export default defineComponent({
  name: 'App',
	components: {
  BarraLateral,
  FormularioTask,
  Tarefa
  },
  data() {
    return {
      Tarefas: [] as ITarefa[]
    }
  },
  methods: {
    salvarTarefa(tarefa: ITarefa){
      this.Tarefas.push(tarefa)
    }
  }
});
</script>

<style>
  .lista{
    padding:1.25rem;
  }
</style>
