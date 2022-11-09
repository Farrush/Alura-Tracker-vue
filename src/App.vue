<template>
  <main class="columns is-gapless is-multiline" :class="{'modoEscuro': modoEscuro}">
    <div class="column is-one-quarter">
      <BarraLateral @alteraTema="trocarTema"/>
    </div>
    <div class="column is-three-quarter conteudo">
      <FormularioTask @aoSalvarTarefa="salvarTarefa"/>
      <div class="lista">
        <Tarefa v-for="(tarefa, index) in Tarefas" :key="index" :tarefa="tarefa"/>
        <Box v-if="listaEstaVazia">
          <p class="list-placeholder">Você ainda não realizou tarefas hoje</p>
        </Box>
      </div>
      
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ITarefa from './interfaces/ITarefa'
import BarraLateral from './components/BarraLateral.vue'
import FormularioTask from './components/Formulario.vue'
import Tarefa from './components/Tarefa.vue'
import Box from './components/Box.vue'
export default defineComponent({
  name: 'App',
	components: {
  BarraLateral,
  FormularioTask,
  Tarefa,
  Box
  },
  data() {
    return {
      Tarefas: [] as ITarefa[],
      modoEscuro: false
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
    },
    trocarTema(modoEscuro: boolean){
      this.modoEscuro = modoEscuro
    }
  }
});
</script>

<style>
  .lista{
    padding:1.25rem;
  }
  main {
    --bg-primario: #FFF;
    --texto-primario: #000;
    --bg-tarefa: #fff9dc;
  }
  main.modoEscuro{
    --bg-primario: #2b2d42;
    --texto-primario:#ddd;
    --bg-tarefa: #30475e;
  }
  .conteudo{
    background-color: var(--bg-primario);
  }
  .list-placeholder{
    color: var(--texto-primario);
  }
</style>
