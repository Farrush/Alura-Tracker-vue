import IProjeto from "@/interfaces/IProjeto";
import INotificacao, { TiposNotificacao } from "@/interfaces/INotificacao";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import {InjectionKey} from "vue";
import { ADICIONA_PROJETO, ADICIONA_TAREFA, APAGA_PROJETO, DEFINIR_PROJETOS, DEFINIR_TAREFAS, DELETA_TAREFA, EDITA_PROJETO, EDITA_TAREFA, NOTIFICAR } from "./tipo-mutacoes";
import { OBTER_PROJETOS, CADASTRAR_PROJETO, ALTERAR_PROJETO, DELETAR_PROJETO, OBTER_TAREFAS, CADASTRAR_TAREFA, ALTERAR_TAREFA, DELETAR_TAREFA } from "./tipo-acoes";
import http from '@/http'
import ITarefa from "@/interfaces/ITarefa";

interface Estado {
    projetos: IProjeto[],
    notificacoes: INotificacao[],
    tarefas: ITarefa[]
} 
export const key: InjectionKey<Store<Estado>> = Symbol()
export const store = createStore<Estado>({
    state: {
        projetos:[
            
        ],
        notificacoes:[
            
        ],
        tarefas:[

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
        [DEFINIR_TAREFAS](state, tarefas: ITarefa[]){
            state.tarefas = tarefas
        },
        [NOTIFICAR](state, Notificacao: INotificacao){
            Notificacao.id = new Date().getTime()
            state.notificacoes.push(Notificacao)

            setTimeout(() =>{
                state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != Notificacao.id)
            }, 2500)
        },
        [ADICIONA_TAREFA](state, tarefa: ITarefa){
            state.tarefas.push(tarefa)
        },
        [EDITA_TAREFA](state, tarefa: ITarefa){
            const index = state.tarefas.findIndex(task => task.id == tarefa.id)
            state.tarefas[index] = tarefa
        },
        [DELETA_TAREFA](state, tarefa: ITarefa){
            state.tarefas = state.tarefas.filter(task => task.id != tarefa.id)
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
        },
        [OBTER_TAREFAS]({commit}){
            http.get('tarefas')
            .then(resposta => commit(DEFINIR_TAREFAS, resposta.data))
        },
        [CADASTRAR_TAREFA]({commit}, tarefa: ITarefa){
            return http.post('/tarefas', tarefa)
            .then(resposta=>commit(ADICIONA_TAREFA, resposta.data))
        },
        [ALTERAR_TAREFA]({commit}, tarefa: ITarefa){
            return http.put(`/tarefas/${tarefa.id}`, tarefa)
            .then(resposta => commit(EDITA_TAREFA, resposta.data))
        },
        [DELETAR_TAREFA]({commit}, tarefa: ITarefa){
            return http.delete(`/tarefas/${tarefa.id}`)
            .then(()=>commit(DELETA_TAREFA, tarefa))
        }
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}