import Entrada from "../io/entrada";
import Produto from "../modelo/produto";
import Cadastro from "./cadastro";

export default function createCadastoProduto(produtos: Array<Produto>) {
    const entrada = new Entrada();

    return {
        cadastrar(): void {
            console.log(`\nInício do cadastro do produto`);


            let nome = entrada.receberTexto(`Por favor infome o nome do produto: `);

            let valor: number;
            while (true) {
                valor = entrada.receberNumero(`Por favor informe o valor do produto: `);
                if (isNaN(valor) || valor <= 0) {
                    console.log("Valor inválido! Por favor, insira um número válido maior que zero.");
                } else {
                    break;
                }
            }
            
            let produto = new Produto(nome, valor);

            produtos.push(produto);
            console.log(`\nCadastro concluído :)\n`);
        }
    }
}