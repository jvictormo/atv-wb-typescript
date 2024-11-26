import Cliente from "../../modelo/cliente";
import Listagem from "../listagem";

export default function getProdutoServicoConsumidoValor(clientes: Array<Cliente>) {
    return {
        listar(): void {
            const clienteValor = clientes.map(cliente => {
                const totalGasto = Number(cliente.getValorGasto);

                return {
                    nome: cliente.nome,
                    cpf: cliente.getCpf.getValor,
                    valor: totalGasto
                };
            });

            clienteValor.sort((a, b) => b.valor - a.valor);

            const top10Clientes = clienteValor.slice(0, 5);

            top10Clientes.forEach(cliente => {
                console.log(`Nome: ${cliente.nome} CPF: ${cliente.cpf} Valor: ${cliente.valor}`);
            });
        }
    }
}
