<template>
	<FormularioTask @aoSalvarTarefa="salvarTarefa" />
	<div class="lista">
		<Tarefa 
    v-for="(tarefa, index) in Tarefas" 
    :key="index" :tarefa="tarefa" 
    @aoTarefaClicada="selecionarTarefa"/>
		<Box v-if="listaEstaVazia">
			<p class="list-placeholder">Você ainda não realizou tarefas hoje</p>
		</Box>
		<div class="modal" 
    :class="{'is-active': tarefaSelecionada}"
    v-if="tarefaSelecionada">
			<div class="modal-background"></div>
			<div class="modal-card">
				<header class="modal-card-head">
					<p class="modal-card-title">Editando a tarefa</p>
					<button class="delete" aria-label="close"></button>
				</header>
				<section class="modal-card-body">
					<input class="input" v-model="tarefaSelecionada.descricao" type="text"/>
				</section>
				<footer class="modal-card-foot">
					<button @click="alterarTarefa" class="button is-success">Salvar Alterações</button>
					<button @click="fecharModal" class="button">Cancelar</button>
          <button @click="deletarTarefa" class="button is-danger">Excluir</button>
				</footer>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import ITarefa from "../interfaces/ITarefa";
import FormularioTask from "../components/Formulario.vue";
import Tarefa from "../components/Tarefa.vue";
import Box from "../components/Box.vue";
import { useStore } from "@/store";
import {
	ALTERAR_TAREFA,
	CADASTRAR_TAREFA,
	DELETAR_TAREFA,
	OBTER_PROJETOS,
	OBTER_TAREFAS,
} from "@/store/tipo-acoes";

export default defineComponent({
	name: "App",
	components: {
		FormularioTask,
		Tarefa,
		Box,
	},
  data(){
    return{
      tarefaSelecionada: null as ITarefa | null
    }
  },
	setup() {
		const store = useStore();
		store.dispatch(OBTER_PROJETOS);
		store.dispatch(OBTER_TAREFAS);
		return {
			store,
			Tarefas: computed(() => store.state.tarefas),
		};
	},
	computed: {
		listaEstaVazia(): boolean {
			return this.Tarefas.length === 0;
		},
	},
	methods: {
		salvarTarefa(tarefa: ITarefa) {
			this.store.dispatch(CADASTRAR_TAREFA, tarefa);
		},
    selecionarTarefa(tarefa: ITarefa):void{
      this.tarefaSelecionada = tarefa
    },
    fecharModal(){
      this.tarefaSelecionada = null
    },
    alterarTarefa(){
      this.store.dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
      .then(this.fecharModal)
    },
    deletarTarefa(){
      this.store.dispatch(DELETAR_TAREFA, this.tarefaSelecionada)
      .then(this.fecharModal)
    }
	},
});
</script>

<style scoped>

</style>
