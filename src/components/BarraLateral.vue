<template>
    <header>
        <h1>
            <img src="../assets/logo.png"/>
        </h1>
        <button class="button" @click="alterarTema">
          {{textoBotao}}
        </button>
        <nav class="panel mt-5">
          <li >
            <router-link class="link" to="/">
              <i class="fas fa-tasks"/>
              Tarefas
            </router-link>
          </li>
          <li>
            <router-link class="link" to="/projetos">
              <i class="fas fa-project-diagram"/>
              Projetos
            </router-link>
          </li>
        </nav>
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

<style scoped>
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
nav{ 
    list-style-type: none;
    margin: 0;
    padding: 0;
}
.panel li {
    margin: 8px 0;
    text-decoration: none;
}
.link {
    color: #fff;
}
.link:hover {
    color: #FAF0CA;
}
.link.router-link-active {
    color: #FAF0CA;
}

</style>