import Entrada from "../../io/entrada";
import Produto from "../../modelo/produto";
import Cliente from "../../modelo/cliente";
import Deletar from "../deletar";

export default function deletarProduto(produtos: Array<Produto>) {
    const entrada = new Entrada();

    return {
        deletar(): void {
            console.log(`\nInício da remoção do produto`);

            let id = entrada.receberNumero(`Por favor infome o id do produto que deseja deletar: `);

            let produtoEncontrado = produtos.find(produto => produto.getId === id);

            let confirm = null

            if (produtoEncontrado) {
                confirm = entrada.receberTexto(`Tem certeza que deseja deletar o produto de id: ${id} (S/N) ? `)

                if (confirm != null && confirm.toUpperCase() == "S") {
                    produtos.splice(produtos.indexOf(produtoEncontrado), 1);
                    console.log(`Produto de id: ${id} foi deletado com sucesso.`);
                } else {
                    console.log(`Produto de id: ${id} mantido`)
                    return
                }
            } else {
                console.log(`Produto de id: ${id} não encontrado`)
            }
        }
    }
}