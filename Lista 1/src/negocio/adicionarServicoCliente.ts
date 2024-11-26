import Entrada from "../io/entrada";
import Servico from "../modelo/servico";
import Cliente from "../modelo/cliente";
import Cadastro from "./cadastro";

export default function addServicosToCliente(clientes: Array<Cliente>, servicos: Array<Servico>) {
    const entrada = new Entrada()

    return {
        cadastrar(): void {

            const cpf = entrada.receberTexto(`Digite o CPF do cliente a ser adicionado o servico: `)
            const id = entrada.receberNumero(`Digite o id do servico a ser adicionado ao cliente: `)

            const clienteEncontrado = clientes.find(cliente => cliente.getCpf.getValor === cpf);

            if(clienteEncontrado) {
                let servicoEncontrado = servicos.find(servicos => servicos.getId === id)
    
                if (servicoEncontrado) {
                    clienteEncontrado.setServicos = servicoEncontrado

                    clienteEncontrado.setValorGasto = servicoEncontrado.getValor
    
                    console.log(`\Servico ${servicoEncontrado.getNome} adicionado com sucesso ao cliente ${clienteEncontrado.nome}.\n`);
                } else {
                    console.log("\Servico não encontrado\n")
                }
            } else {
                console.log("\nCliente não encontrado \n")
            }
        }
    }
}