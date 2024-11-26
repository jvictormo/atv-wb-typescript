import Servico from "../modelo/servico"
import Listagem from "./listagem"

export default function readListagemServicos(servicos: Array<Servico>) {
    return {
        servicos: servicos,

        listar(): void {
            console.log(`\nLista de todos os servicos:`);
            this.servicos.forEach(servico => {
                console.log(`Id:` + servico.getId);
                console.log(`Nome:` + servico.getNome);
                console.log(`Valor:` + servico.getValor);;
                console.log(`--------------------------------------`);
            })
            console.log(`\n`);
        }
    }

}
