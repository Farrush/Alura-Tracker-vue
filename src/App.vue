<template>
  <main class="columns is-gapless is-multiline" :class="{'modoEscuro': modoEscuro}">
    
    <div class="column is-one-quarter">
      <BarraLateral @alteraTema="trocarTema"/>
    </div>
    <div class="column is-three-quarter conteudo">
      <Notificacoes/>
      <router-view></router-view>
      
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BarraLateral from './components/BarraLateral.vue'
import Notificacoes from './components/Notificacoes.vue';
export default defineComponent({
  name: 'App',
	components: {
  BarraLateral,
  Notificacoes,
  },
  data() {
    return {
      modoEscuro: false
    }
  },
  computed:{
  },
  methods: {
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
  html{
    overflow-y: hidden;
  }
  main {
    --bg-primario: #FFF;
    --texto-primario: #000;
    --bg-tarefa: #fff9dc;
    --botoes: rgb(123, 163, 231);
    --bg-scrollbar: rgba(204, 171, 106, 0.607);
    --thumb-scrollbar: rgba(235, 183, 100, 0.896);
  }
  main.modoEscuro{
    --bg-primario: #2b2d42;
    --texto-primario:#ddd;
    --bg-tarefa: #30475e;
    --botoes: rgb(78, 96, 147);
    --bg-scrollbar: rgba(27, 41, 103, 0.889);
    --thumb-scrollbar: rgba(29, 159, 234, 0.94);
  }
  .conteudo{
    background-color: var(--bg-primario);
  }
  .list-placeholder{
    color: var(--texto-primario);
  }
</style>
