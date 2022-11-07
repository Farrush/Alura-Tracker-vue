<template>
<div class="box">
    <div class="columns">
        <div class="column is-8" role="form" aria-label="Formulário para criação de uma nova tarefa.">
            <input type="text" class="input" placeholder="Qual tarefa deseja adicionar?" v-model="nomeTarefa"/>
        </div>
        <div class="column">
            <Temporizador @aoFinalizarTemporizador="finalizarTarefa"/>
        </div>
    </div>
</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Temporizador from './Temporizador.vue'
export default defineComponent({
    name: "FormularioTask",
    components: {
        Temporizador
    },
    data(){
        return{
            nomeTarefa: ""
        }
    },
    methods: {
        finalizarTarefa(tempoDecorrido: number): void {
            console.log("Tempo da tarefa:"+ tempoDecorrido)
            console.log("Descrição da tarefa:"+ this.nomeTarefa)
            this.nomeTarefa = ""
        }
    }
})
</script>

<style scoped>

</style>

