<template>

        <form @submit.prevent="salvar">
            <div class="field">
                <label for="nomeDoProjeto" class="label">Nome do Projeto</label>
                <input type="text" class="input" v-model="nomeProjeto" id="nomeDoProjeto"/>
            </div>
            <div class="field">
                <button class="button" type="submit">Salvar</button>
            </div>
        </form>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'
//import { EDITA_PROJETO } from "@/store/tipo-mutacoes";
import { TiposNotificacao } from '@/interfaces/INotificacao';
import useNotificador from '@/hooks/notificador'
import { ALTERAR_PROJETO, CADASTRAR_PROJETO, OBTER_PROJETOS } from '@/store/tipo-acoes';
//import { notificacaoMixin } from '@/mixins/notificar'
export default defineComponent({
    name:'FormularioVue',
    props:{
        id:{
            type: String,
        }
    },
    data(){
        return{
            nomeProjeto: '',
        }
    },
    setup(){
        //hooks no setup
        const store = useStore()
        const { notificar} = useNotificador()
        return{
            store,
            notificar
        }
    },
    mounted(){
        if(this.id){
            const projeto = this.store.state.projetos.find(proj => proj.id == this.id)
            this.nomeProjeto = projeto?.nome || ''
        }
    },
    methods:{
        salvar(){
            if(this.id){
                this.store.dispatch(ALTERAR_PROJETO, {
                    id: this.id,
                    nome: this.nomeProjeto
                    })
                        .then(() =>  {
                            this.lidarComSucesso()
                            this.store.dispatch(OBTER_PROJETOS)
                        })
            }
            else
            {
                if(this.nomeProjeto != ''){
                    this.store.dispatch(CADASTRAR_PROJETO, this.nomeProjeto)
                        .then(() => {
                            this.lidarComSucesso()
                            this.store.dispatch(OBTER_PROJETOS)
                        })
                }
                else{
                    this.notificar(TiposNotificacao.FALHA, 'Projeto sem nome', 'Por falor, dê um nome ao seu projeto :(')
                }
            }

        },
        lidarComSucesso(){
            this.nomeProjeto = ''
            this.$router.push('/projetos')
            this.notificar(TiposNotificacao.SUCESSO, "Novo projeto salvo", "Pronto! Seu projeto foi salvo C:")
        }

    },
    //mixins:[notificacaoMixin]
    //Mixins são métodos externos
})
</script>

<style scoped>
    .projetos{
        padding: 1.25rem;
    }
</style>