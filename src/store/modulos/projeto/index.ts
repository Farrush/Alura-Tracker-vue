import IProjeto from "@/interfaces/IProjeto";
import { Estado } from "@/store";
import { Module } from "vuex";
import { ADICIONA_PROJETO, APAGA_PROJETO, DEFINIR_PROJETOS, EDITA_PROJETO } from "@/store/tipo-mutacoes";
import { ALTERAR_PROJETO, CADASTRAR_PROJETO, DELETAR_PROJETO, OBTER_PROJETOS } from "@/store/tipo-acoes";
import http from "@/http";

export interface EstadoProjeto {
    projetos: IProjeto[]
}
export const projeto: Module<EstadoProjeto, Estado> = {
    mutations: {
        [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto,
            } as IProjeto
            state.projetos.push(projeto)
        },
        [EDITA_PROJETO](state, pro: IProjeto) {
            const index = state.projetos.findIndex(proj => proj.id == pro.id)
            state.projetos[index] = pro
        },
        [APAGA_PROJETO](state, id: string) {
            state.projetos = state.projetos.filter(proj => proj.id != id)
        },
        [DEFINIR_PROJETOS](state, projetos: IProjeto[]) {
            state.projetos = projetos
        },
    },
    actions: {
        [OBTER_PROJETOS]({ commit }) {
            http.get('projetos')
                .then(resposta => commit(DEFINIR_PROJETOS, resposta.data))
        },
        [CADASTRAR_PROJETO](contexto, nomeDoProjeto: string) {
            return http.post('/projetos', {
                nome: nomeDoProjeto
            })
        },
        [ALTERAR_PROJETO](contexto, projeto: IProjeto) {
            http.put(`/projetos/${projeto.id}`, projeto)
        },
        [DELETAR_PROJETO](contexto, id) {
            http.delete(`/projetos/${id}`)
        }
    }
}