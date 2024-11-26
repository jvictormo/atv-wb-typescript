import Cliente from "../../modelo/cliente";
import Servico from "../../modelo/servico";
import Produto from "../../modelo/produto";
import Listagem from "../listagem";

export default function getProdutoServicoConsumidoQuantidade(clientes: Array<Cliente>) {
    return {
        listar(): void {
            const clienteQuantidade = clientes.map(cliente => {
                const totalProdutosConsumidos = cliente.getProdutosConsumidos.length;
                const totalServicosConsumidos = cliente.getServicosConsumidos.length;
                const totalConsumido = totalProdutosConsumidos + totalServicosConsumidos;

                return {
                    nome: cliente.nome,
                    cpf: cliente.getCpf.getValor,
                    quantidade: totalConsumido
                };
            });

            clienteQuantidade.sort((a, b) => b.quantidade - a.quantidade);

            const top10Clientes = clienteQuantidade.slice(0, 10);

            top10Clientes.forEach(cliente => {
                console.log(`Nome: ${cliente.nome} CPF: ${cliente.cpf} Quantidade: ${cliente.quantidade}`);
            });
        }
    }
}
