import Produto from "../modelo/produto"
import Listagem from "./listagem"

export default function readListagemProdutos(produtos: Array<Produto>) {
    return {
        produtos: produtos,

        listar(): void {
            console.log(`\nLista de todos os produtos:`);
            this.produtos.forEach(produto => {
                console.log(`Id:` + produto.getId);
                console.log(`Nome:` + produto.getNome);
                console.log(`Valor:` + produto.getValor);;
                console.log(`--------------------------------------`);
            })
            console.log(`\n`);
        }
    }

}
