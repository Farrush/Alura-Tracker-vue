import { TiposNotificacao } from "@/interfaces/INotificacao"
import { store } from "@/store"
import { NOTIFICAR } from "@/store/tipo-mutacoes"

type Notificador = {
    notificar: (tipo: TiposNotificacao, titulo: string, texto: string) => void
}

export default () : Notificador => {
    
    const notificar = (tipo: TiposNotificacao, titulo: string, texto: string) : void =>{
        store.commit(NOTIFICAR,
        {
            titulo: titulo,
            texto: texto,
            tipo: tipo
        })

    }
    return{
        notificar
    }

}