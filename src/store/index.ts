import IProjeto from "@/interfaces/IProjeto";
import INotificacao, { TiposNotificacao } from "@/interfaces/INotificacao";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import {InjectionKey} from "vue";
import { ADICIONA_PROJETO, APAGA_PROJETO, DEFINIR_PROJETOS, EDITA_PROJETO, NOTIFICAR } from "./tipo-mutacoes";
import { OBTER_PROJETOS, CADASTRAR_PROJETO, ALTERAR_PROJETO, DELETAR_PROJETO } from "./tipo-acoes";
import http from '@/http'

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
        /*
        Mutations trocadas por actions para fazer o CRUD
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
        },*/
        [DEFINIR_PROJETOS](state, projetos: IProjeto[]){
            state.projetos = projetos
        },
        [NOTIFICAR](state, Notificacao: INotificacao){
            Notificacao.id = new Date().getTime()
            state.notificacoes.push(Notificacao)

            setTimeout(() =>{
                state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != Notificacao.id)
            }, 2500)
        }
    },
    actions:{
        [OBTER_PROJETOS]({commit}){
            http.get('projetos')
            .then(resposta => commit(DEFINIR_PROJETOS, resposta.data))
        },
        [CADASTRAR_PROJETO](contexto, nomeDoProjeto: string){
            return http.post('/projetos', {
                nome: nomeDoProjeto
            })
        },
        [ALTERAR_PROJETO](contexto, projeto: IProjeto){
            http.put(`/projetos/${projeto.id}`, projeto)
        },
        [DELETAR_PROJETO](contexto, id){
            http.delete(`/projetos/${id}`)
        }
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}