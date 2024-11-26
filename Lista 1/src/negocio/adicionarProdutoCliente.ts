import Entrada from "../io/entrada";
import Produto from "../modelo/produto";
import Cliente from "../modelo/cliente";
import Cadastro from "./cadastro";

export default function addProdutosToCliente(clientes: Array<Cliente>, produtos: Array<Produto>) {
    const entrada = new Entrada()

    return {
        cadastrar(): void {

            const cpf = entrada.receberTexto(`Digite o CPF do cliente a ser adicionado o produto: `)
            const id = entrada.receberNumero(`Digite o id do produto a ser adicionado ao cliente: `)

            const clienteEncontrado = clientes.find(cliente => cliente.getCpf.getValor === cpf);

            if(clienteEncontrado) {
                let produtoEncontrado = produtos.find(produtos => produtos.getId === id)
    
                if (produtoEncontrado) {
                    clienteEncontrado.setProdutos = produtoEncontrado

                    clienteEncontrado.setValorGasto = produtoEncontrado.getValor
    
                    console.log(`\Produto ${produtoEncontrado.getNome} adicionado com sucesso ao cliente ${clienteEncontrado.nome}.\n`);
                } else {
                    console.log("\Produto não encontrado\n")
                }
            } else {
                console.log("\nCliente não encontrado \n")
            }
        }
    }
}