<template>
    <header>
        <h1>
            <img src="../assets/logo.png"/>
        </h1>
        <button class="button" @click="alterarTema">
          {{textoBotao}}
        </button>
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: "BarraLateral",
    data(){
      return {
        modoEscuro: false,
      }
    },
    computed:{
      textoBotao(): string {
        if(this.modoEscuro == false){
          return "Modo Escuro"
        }
        else{
          return "Modo Claro"
        }
      }
    },
    methods:{
      alterarTema(){
        this.modoEscuro = !this.modoEscuro
        this.$emit('alteraTema', this.modoEscuro)
      }
    },
    emits: ['alteraTema']
})
</script>

<style>
    header {
  padding: 1rem;
  background: #0d3b66;
  width: 100%;
  height: 100vh;
}
@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}
</style>