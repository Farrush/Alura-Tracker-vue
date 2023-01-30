<template>
	<div class="box formulario">
		<div class="columns">
			<div class="column is-5" role="form" aria-label="Formulário para criação de uma nova tarefa.">
				<input type="text" class="input" placeholder="Qual tarefa deseja adicionar?" v-model="nomeTarefa" />
			</div>
			<div class="column is-3">
				<div class="select">
					<select v-model="idProjeto">
						<option value="">Selecione o projeto</option>
						<option :value="projeto.id" v-for="projeto in projetos" :key="projeto.id">
							{{ projeto.nome }}
						</option>
					</select>
				</div>
			</div>
			<div class="column">
				<Temporizador @aoFinalizarTemporizador="finalizarTarefa" />
			</div>

		</div>
	</div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import Temporizador from "./Temporizador.vue";
import { useStore } from "vuex";
import { key } from "@/store/index";
import { CADASTRAR_TAREFA, OBTER_TAREFAS } from "@/store/tipo-acoes";

export default defineComponent({
	name: "FormularioTask",
	setup(props, { emit }) {
		const store = useStore(key);
		const nomeTarefa = ref("");
        
		const idProjeto = ref("");
		const projetos = computed(() => store.state.projeto.projetos);

		const finalizarTarefa = (tempoDecorrido: number): void => {
			emit("aoSalvarTarefa", {duracaoEmSegundos: tempoDecorrido,
					descricao: nomeTarefa,
					projeto: projetos.value.find(
						proj => proj.id == idProjeto.value)
            })
					nomeTarefa.value = ""
        };
		return {
			store,
			nomeTarefa,
			idProjeto,
			projetos,
            finalizarTarefa
		};
	},
	components: {
		Temporizador,
	},
	emits: ["aoSalvarTarefa"],
	data() {
		return {};
	},
});
</script>

<style>
.formulario {
	color: var(--texto-primario);
	background-color: var(--bg-primario);
}
</style>

