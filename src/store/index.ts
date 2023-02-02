import INotificacao from "@/interfaces/INotificacao";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from "vue";
import { NOTIFICAR } from "./tipo-mutacoes";
import { EstadoProjeto, projeto } from "./modulos/projeto";
import { EstadoTarefa, tarefa } from "./modulos/tarefa";

export interface Estado {
    notificacoes: INotificacao[],
    tarefa: EstadoTarefa,
    projeto: EstadoProjeto
}
export const key: InjectionKey<Store<Estado>> = Symbol()
export const store = createStore<Estado>({
    state: {
        notificacoes: [

        ],
        tarefa: {
            tarefas: []
        },
        projeto: {
            projetos: []
        }
    },
    mutations: {
        [NOTIFICAR](state, Notificacao: INotificacao) {
            Notificacao.id = new Date().getTime()
            state.notificacoes.push(Notificacao)
            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != Notificacao.id)
            }, 2500)
        }
    },
    modules: {
        projeto,
        tarefa
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}