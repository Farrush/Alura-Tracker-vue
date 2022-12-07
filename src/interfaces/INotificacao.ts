export enum TiposNotificacao{
    SUCESSO,
    FALHA,
    ATENCAO
}

export default interface INotificacao {
    titulo: string,
    texto: string,
    tipo: TiposNotificacao,
    id: number
}