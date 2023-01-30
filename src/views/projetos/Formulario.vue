<template>

	<form @submit.prevent="salvar">
		<div class="field">
			<label for="nomeDoProjeto" class="label">Nome do Projeto</label>
			<input type="text" class="input" v-model="nomeProjeto" id="nomeDoProjeto" />
		</div>
		<div class="field">
			<button class="button" type="submit">Salvar</button>
		</div>
	</form>

</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "@/store";
import { TiposNotificacao } from "@/interfaces/INotificacao";
import useNotificador from "@/hooks/notificador";
import {
	ALTERAR_PROJETO,
	CADASTRAR_PROJETO,
	OBTER_PROJETOS,
} from "@/store/tipo-acoes";
import { useRouter } from "vue-router";
export default defineComponent({
	name: "FormularioVue",
	props: {
		id: {
			type: String,
		},
	},
	data() {
		return {
			//	nomeProjeto: "",
		};
	},
	setup(props) {
		//hooks no setup
		const store = useStore();
		const router = useRouter();
		const nomeProjeto = ref("");
		if (props.id) {
			const projeto = store.state.projeto.projetos.find(
				(proj) => proj.id == props.id
			);
			nomeProjeto.value = projeto?.nome || "";
		}
		const { notificar } = useNotificador();
		const lidarComSucesso = () => {
			nomeProjeto.value = "";
			router.push("/projetos");
			notificar(
				TiposNotificacao.SUCESSO,
				"Novo projeto salvo",
				"Pronto! Seu projeto foi salvo C:"
			);
		};
		const salvar = () => {
			if (props.id) {
				store
					.dispatch(ALTERAR_PROJETO, {
						id: props.id,
						nome: nomeProjeto.value,
					})
					.then(() => {
						lidarComSucesso();
						store.dispatch(OBTER_PROJETOS);
					});
			} else {
				if (nomeProjeto.value != "") {
					store
						.dispatch(CADASTRAR_PROJETO, nomeProjeto.value)
						.then(() => {
							lidarComSucesso();
							store.dispatch(OBTER_PROJETOS);
						});
				} else {
					notificar(
						TiposNotificacao.FALHA,
						"Projeto sem nome",
						"Por falor, dê um nome ao seu projeto :("
					);
				}
			}
		};
		return {
			store,
			notificar,
			nomeProjeto,
			salvar,
		};
	},
	/*mounted(){
        if(this.id){
            const projeto = this.store.state.projeto.projetos.find(proj => proj.id == this.id)
            this.nomeProjeto = projeto?.nome || ''
        }
    },*/
	//mixins:[notificacaoMixin]
	//Mixins são métodos externos
});
</script>

<style scoped>
form {
	background-color: var(--bg-primario);
}
label,
button {
	color: var(--texto-primario);
}
button {
	background-color: var(--botoes);
}
</style>