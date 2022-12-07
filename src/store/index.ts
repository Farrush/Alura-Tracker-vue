import IProjeto from "@/interfaces/IProjeto";
import INotificacao, { TiposNotificacao } from "@/interfaces/INotificacao";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import {InjectionKey} from "vue";
import { ADICIONA_PROJETO, APAGA_PROJETO, EDITA_PROJETO, NOTIFICAR } from "./tipo-mutacoes";

interface Estado {
    projetos: IProjeto[],
    notificacoes: INotificacao[]
} 
export const key: InjectionKey<Store<Estado>> = Symbol()
export const store = createStore<Estado>({
    state: {
        projetos:[
            
        ],
        notificacoes:[
            
        ]
    },
    mutations: {
        [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto,
            } as IProjeto
            state.projetos.push(projeto)
        },
        [EDITA_PROJETO](state, projeto: IProjeto) {
            const index = state.projetos.findIndex(proj => proj.id == projeto.id)
            state.projetos[index] = projeto
        },
        [APAGA_PROJETO](state, id: string){
            state.projetos = state.projetos.filter(proj => proj.id != id)
        },
        [NOTIFICAR](state, Notificacao: INotificacao){
            Notificacao.id = new Date().getTime()
            state.notificacoes.push(Notificacao)

            setTimeout(() =>{
                state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != Notificacao.id)
            }, 2500)
        }
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}