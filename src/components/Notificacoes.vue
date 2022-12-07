<template>
    <div class="notificacao">
        <article class="message" :class="contexto[notificacao.tipo]" v-for="notificacao in notificacoes" :key="notificacao.id">
            <div class="message-header">
                {{notificacao.titulo}}
            </div>
            <div class="message-body">
                {{notificacao.texto}}
            </div>
        </article>

    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
import { TiposNotificacao } from '@/interfaces/INotificacao';

export default defineComponent({
    name: 'NotificacoesVue',
    data(){
        return{
            contexto:{
                [TiposNotificacao.SUCESSO]: 'is-success',
                [TiposNotificacao.ATENCAO]: 'is-warning',
                [TiposNotificacao.FALHA]: 'is-danger'
            }
        }
    },
    setup(){
        const store = useStore();
        return{
            notificacoes: computed(() => store.state.notificacoes)
        }
    }
})
</script>

<style scoped>
.notificacao{
    position: absolute;
    right:0;
    width: 300px;
    padding: 8px;
    z-index: 100;
}
</style>
