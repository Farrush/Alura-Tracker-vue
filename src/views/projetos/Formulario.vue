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
import { ADICIONA_PROJETO, APAGA_PROJETO, EDITA_PROJETO, NOTIFICAR } from "@/store/tipo-mutacoes";
import { TiposNotificacao } from '@/interfaces/INotificacao';

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
        const store = useStore()
        return{
            store
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
                this.store.commit(EDITA_PROJETO, {
                    id: this.id,
                    nome: this.nomeProjeto
                    })
            }
            else
            {
                this.store.commit(ADICIONA_PROJETO, this.nomeProjeto)
                this.store.commit(NOTIFICAR,
                {
                    titulo: 'seu novo Projeto foi salvo.',
                    texto: 'Pronto! Seu projeto está disponível C:',
                    tipo: TiposNotificacao.SUCESSO
                })
            }
            this.nomeProjeto = ''
            this.$router.push('/projetos')
        }
    }
})
</script>

<style scoped>
    .projetos{
        padding: 1.25rem;
    }
</style>