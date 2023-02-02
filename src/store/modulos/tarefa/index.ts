import ITarefa from "@/interfaces/ITarefa";
import { Estado } from "@/store";
import { Module } from "vuex";
import { ADICIONA_TAREFA, DELETA_TAREFA, DEFINIR_TAREFAS, EDITA_TAREFA } from "@/store/tipo-mutacoes";
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, DELETAR_TAREFA, OBTER_TAREFAS } from "@/store/tipo-acoes";
import http from "@/http";

export interface EstadoTarefa {
    tarefas: ITarefa[]
}
export const tarefa: Module<EstadoTarefa, Estado> = {
    mutations: {
        [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
            state.tarefas = tarefas
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
        [OBTER_TAREFAS]({ commit }, filtro: string) {
            let url = 'tarefas'
            if(filtro){
                url+= '?descricao='+filtro
            }
            http.get(url)
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
    }
}