<template>
      <FormularioTask @aoSalvarTarefa="salvarTarefa"/>
      <div class="lista">
        <Tarefa v-for="(tarefa, index) in Tarefas" :key="index" :tarefa="tarefa"/>
        <Box v-if="listaEstaVazia">
          <p class="list-placeholder">Você ainda não realizou tarefas hoje</p>
        </Box>
      </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ITarefa from '../interfaces/ITarefa'
import FormularioTask from '../components/Formulario.vue'
import Tarefa from '../components/Tarefa.vue'
import Box from '../components/Box.vue'
export default defineComponent({
  name: 'App',
	components: {
  FormularioTask,
  Tarefa,
  Box
  },
  data() {
    return {
      Tarefas: [] as ITarefa[],
    }
  },
  computed:{
    listaEstaVazia(): boolean{
      return this.Tarefas.length === 0
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
</style>
