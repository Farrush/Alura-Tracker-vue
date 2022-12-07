<template>
<div class="box formulario">
    <div class="columns">
        <div class="column is-5" role="form" aria-label="Formulário para criação de uma nova tarefa.">
            <input type="text" class="input" placeholder="Qual tarefa deseja adicionar?" v-model="nomeTarefa"/>
        </div>
        <div class="column is-3">
            <div class="select">
                <select v-model="idProjeto">
                    <option value="">Selecione o projeto</option>
                    <option
                    :value="projeto.id"
                    v-for="projeto in projetos"
                    :key="projeto.id"
                    >
                    {{ projeto.nome }}
                    </option>
                </select>
            </div>
        </div>
        <div class="column">
            <Temporizador @aoFinalizarTemporizador="finalizarTarefa"/>
        </div>

    </div>
</div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import Temporizador from './Temporizador.vue'
import { useStore } from 'vuex'
import { key } from '@/store/index'

export default defineComponent({
    name: "FormularioTask",
    setup(){
        const store = useStore(key)
        return {
            projetos: computed(() => store.state.projetos)
        }
    },
    components: {
        Temporizador,

    },
    emits:['aoSalvarTarefa'],
    data(){
        return{
            nomeTarefa: "",
            idProjeto: ''
        }
    },
    methods: {
        finalizarTarefa(tempoDecorrido: number): void {
            this.$emit("aoSalvarTarefa", {
                duracaoEmSegundos: tempoDecorrido,
                descricao: this.nomeTarefa,
                projeto: this.projetos.find(proj => proj.id == this.idProjeto)
                })
            this.nomeTarefa = ""
        }
    }
})
</script>

<style>
    .formulario{
        color: var(--texto-primario);
        background-color: var(--bg-primario);
    }
</style>

