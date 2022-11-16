import IProjeto from "./IProjeto";

export default interface ITarefa {
    duracaoEmSegundos: number,
    desricao: string,
    projeto: IProjeto
}