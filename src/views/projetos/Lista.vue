<template>

        <router-link to="/projetos/novo" class="button">
            <span class="icon is-small">
                <i class="fas fa-plus"></i>
            </span>
            <span>Novo projeto</span>
        </router-link>
        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NOME</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="projeto in projetos" :key="projeto.id">
                    <td>{{projeto.id}}</td>
                    <td>{{projeto.nome}}</td>
                    <td>
                        <router-link :to="`/projetos/${projeto.id}`" class="button">
                            <span class="icon is-small">
                                <i class="fas fa-pencil-alt"></i>
                            </span>
                        </router-link>
                        <button class="button ml-2 is-danger" @click="deletarProjeto(projeto.id)">
                            <span class="icon is-small">
                            <i class="fas fa-trash"></i>
                            </span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
import { ADICIONA_PROJETO, APAGA_PROJETO, EDITA_PROJETO } from "@/store/tipo-mutacoes";

export default defineComponent({
    name:'ListaVue',
    data(){
        return{
            nomeProjeto: '',
        }
    },
    setup(){
        const store = useStore()
        return{
            projetos: computed(() => store.state.projetos),
            store
        }
    },
    methods:{
        deletarProjeto(id: string){
             this.store.commit(APAGA_PROJETO, id)
        }
    }
})
</script>

<style scoped>
    .projetos{
        padding: 1.25rem;
    }
</style>