import INotificacao from "@/interfaces/INotificacao";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from "vue";
import { ADICIONA_TAREFA, DEFINIR_TAREFAS, DELETA_TAREFA, EDITA_TAREFA, NOTIFICAR } from "./tipo-mutacoes";
import { OBTER_TAREFAS, CADASTRAR_TAREFA, ALTERAR_TAREFA, DELETAR_TAREFA } from "./tipo-acoes";
import http from '@/http'
import ITarefa from "@/interfaces/ITarefa";
import { EstadoProjeto, projeto } from "./modulos/projeto";

export interface Estado {
    notificacoes: INotificacao[],
    tarefas: ITarefa[],
    projeto: EstadoProjeto
}
export const key: InjectionKey<Store<Estado>> = Symbol()
export const store = createStore<Estado>({
    state: {
        notificacoes: [

        ],
        tarefas: [

        ],
        projeto: {
            projetos: []
        }
    },
    mutations: {
        [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
            state.tarefas = tarefas
        },
        [NOTIFICAR](state, Notificacao: INotificacao) {
            Notificacao.id = new Date().getTime()
            state.notificacoes.push(Notificacao)
            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != Notificacao.id)
            }, 2500)
        },
        [ADICIONA_TAREFA](state, tarefa: ITarefa) {
            state.tarefas.push(tarefa)
        },
        [EDITA_TAREFA](state, tarefa: ITarefa) {
            const index = state.tarefas.findIndex(task => task.id == tarefa.id)
            state.tarefas[index] = tarefa
        },
        [DELETA_TAREFA](state, tarefa: ITarefa) {
            state.tarefas = state.tarefas.filter(task => task.id != tarefa.id)
        }
    },
    actions: {
        [OBTER_TAREFAS]({ commit }) {
            http.get('tarefas')
                .then(resposta => commit(DEFINIR_TAREFAS, resposta.data))
        },
        [CADASTRAR_TAREFA]({ commit }, tarefa: ITarefa) {
            return http.post('/tarefas', tarefa)
                .then(resposta => commit(ADICIONA_TAREFA, resposta.data))
        },
        [ALTERAR_TAREFA]({ commit }, tarefa: ITarefa) {
            return http.put(`/tarefas/${tarefa.id}`, tarefa)
                .then(resposta => commit(EDITA_TAREFA, resposta.data))
        },
        [DELETAR_TAREFA]({ commit }, tarefa: ITarefa) {
            return http.delete(`/tarefas/${tarefa.id}`)
                .then(() => commit(DELETA_TAREFA, tarefa))
        }
    },
    modules: {
        projeto
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}