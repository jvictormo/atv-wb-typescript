import Entrada from "../../io/entrada";
import Cliente from "../../modelo/cliente";
import Deletar from "../deletar";

export default function deletarCliente(clientes: Array<Cliente>) {
    const entrada = new Entrada();

    return {
        deletar(): void {
            console.log(`\nInício da remoção do cliente`);

            let cpf = entrada.receberTexto(`Por favor, informe o CPF do cliente que deseja deletar: `);

            let clienteEncontrado = clientes.find(cliente => cliente.getCpf.getValor === cpf);

            if (clienteEncontrado) {
                let confirm = entrada.receberTexto(`Tem certeza que deseja deletar o cliente de CPF: ${cpf} (S/N)? `);

                if (confirm && confirm.toUpperCase() === "S") {
                    clientes.splice(clientes.indexOf(clienteEncontrado), 1);
                    console.log(`Cliente de CPF: ${cpf} foi deletado com sucesso.`);
                } else {
                    console.log(`Cliente de CPF: ${cpf} não foi deletado.`);
                }
            } else {
                console.log(`Cliente com CPF: ${cpf} não encontrado.`);
            }
        }
    };
}
