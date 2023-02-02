<template>
	<FormularioTask @aoSalvarTarefa="salvarTarefa" />
	<div class="lista">
		<div class="field">
			<p class="control has-icons-left has-icons-right">
				<input type="email" class="input" placeholder="Digite para filtrar" v-model="filtro" />
				<span class="icon is-small is-left">
					<i class="fas fa-search"></i>
				</span>
			</p>
		</div>
		<Tarefa v-for="(tarefa, index) in Tarefas" :key="index" :tarefa="tarefa" @aoTarefaClicada="selecionarTarefa" />
		<Box v-if="listaEstaVazia">
			<p class="list-placeholder">Você ainda não realizou tarefas hoje</p>
		</Box>
		<Modal :mostrar="tarefaSelecionada != null">
			<template v-slot:cabecalho>
				<p class="modal-card-title">Editando a tarefa</p>
				<button class="delete" aria-label="close"></button>
			</template>
			<template v-slot:corpo>
				<input class="input" v-model="tarefaSelecionada.descricao" type="text" />
			</template>
			<template v-slot:rodape>
				<button @click="alterarTarefa" class="button is-success">Salvar Alterações</button>
				<button @click="fecharModal" class="button">Cancelar</button>
				<button @click="deletarTarefa" class="button is-danger">Excluir</button>
			</template>
		</Modal>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from "vue";
import ITarefa from "../interfaces/ITarefa";
import FormularioTask from "../components/Formulario.vue";
import Tarefa from "../components/Tarefa.vue";
import Box from "../components/Box.vue";
import Modal from '@/components/Modal.vue'
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
		Modal
	},
	data() {
		return {
			tarefaSelecionada: null as ITarefa | null,
		};
	},
	setup() {
		const store = useStore();
		const filtro = ref("");
		//const Tarefas = computed(() =>
		//	store.state.tarefas.filter(
		//		(t) => !filtro.value || t.descricao.includes(filtro.value)
		//	)
		//);
		watchEffect(()=>{
			store.dispatch(OBTER_TAREFAS, filtro.value)
		})
		store.dispatch(OBTER_PROJETOS);
		store.dispatch(OBTER_TAREFAS);
		return {
			store,
			filtro,
			Tarefas: computed(()=> store.state.tarefa.tarefas),
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
		selecionarTarefa(tarefa: ITarefa): void {
			this.tarefaSelecionada = tarefa;
		},
		fecharModal() {
			this.tarefaSelecionada = null;
		},
		alterarTarefa() {
			this.store
				.dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
				.then(this.fecharModal);
		},
		deletarTarefa() {
			this.store
				.dispatch(DELETAR_TAREFA, this.tarefaSelecionada)
				.then(this.fecharModal);
		},
	},
});
</script>

<style scoped>
.lista{
	height: 85vh;
	overflow-y: auto;
}
::-webkit-scrollbar{
	width: 15px;
}
::-webkit-scrollbar-track {
  background: var(--bg-scrollbar);
}
::-webkit-scrollbar-thumb {
  background: var(--thumb-scrollbar);
}
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
