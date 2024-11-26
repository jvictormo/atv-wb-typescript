import Entrada from "../../io/entrada";
import Servico from "../../modelo/servico";
import Cliente from "../../modelo/cliente";
import Deletar from "./../deletar";

export default function deletarServico(servicos: Array<Servico>) {
    const entrada = new Entrada();

    return {
        deletar(): void {
            console.log(`\nInício da remoção do serviço`);

            let id = entrada.receberNumero(`Por favor infome o id do serviço que deseja deletar: `);

            let servicoEncontrado = servicos.find(servico => servico.getId === id);

            let confirm = null

            if (servicoEncontrado) {
                confirm = entrada.receberTexto(`Tem certeza que deseja deletar o serviço de id: ${id} (S/N) ? `)

                if (confirm != null && confirm.toUpperCase() == "S") {
                    servicos.splice(servicos.indexOf(servicoEncontrado), 1);
                    console.log(`Servico de id: ${id} foi deletado com sucesso.`);
                } else {
                    console.log(`Serviço de id: ${id} mantido`)
                    return
                }
            } else {
                console.log(`Serviço de id: ${id} não encontrado`)
            }
        }
    }
}