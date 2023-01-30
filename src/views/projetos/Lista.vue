<template>
        <div class="caixa">
        <router-link class="btn-novo-proj button" to="/projetos/novo">
            <span class="icon is-small">
                <i class="fas fa-plus"></i>
            </span>
            <span>Novo projeto</span>
        </router-link>
        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th style="width:8%">ID</th>
                    <th style="width:79%">NOME</th>
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
        </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
//import { ADICIONA_PROJETO, APAGA_PROJETO, EDITA_PROJETO } from "@/store/tipo-mutacoes";
import useNotificador from '@/hooks/notificador'
import { TiposNotificacao } from '@/interfaces/INotificacao';
import { OBTER_PROJETOS, DELETAR_PROJETO } from '@/store/tipo-acoes';
export default defineComponent({
    name:'ListaVue',
    data(){
        return{
            nomeProjeto: '',
        }
    },
    setup(){
        const {notificar} = useNotificador()
        const store = useStore()
        store.dispatch(OBTER_PROJETOS)
        return{
            projetos: computed(() => store.state.projeto.projetos),
            store,
            notificar
        }
    },
    methods:{
        deletarProjeto(id: string){
             this.store.dispatch(DELETAR_PROJETO, id)
                .then(()=>{
                    this.store.dispatch(OBTER_PROJETOS)
                    this.notificar(TiposNotificacao.SUCESSO, 'Projeto Deletado', 'Seu projeto foi excluído')
                })

        }
    }
})
</script>

<style scoped>
    .caixa{
        padding:20px;
        background-color: var(--bg-primario);
    }
    .btn-novo-proj{
        margin-bottom: 10px;
    }
    .button{
        background-color: var(--botoes);
        color: var(--texto-primario)
    }
    table, table th{
        background-color: var(--bg-tarefa);
        color: var(--texto-primario);
        
    }
</style>