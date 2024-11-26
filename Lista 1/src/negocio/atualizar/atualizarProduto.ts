import Entrada from "../../io/entrada";
import Produto from "../../modelo/produto";
import Atualiza from "../atualizar";

export default function atualizarProdutos(produtos: Array<Produto>) {
    const entrada = new Entrada();

    return {
        atualizar(): void {
            console.log(`\nInício da atualização do produto`);

            let id = entrada.receberNumero(`Por favor infome o id do produto que deseja atualizar: `);

            let produtoEncontrado = produtos.find(produtos => produtos.getId === id);

            if (produtoEncontrado) {
                console.log(`Produto com ID: ${id} encontrado.`)

                let novoNome = produtoEncontrado.getNome;
                let novoValor = produtoEncontrado.getValor;

                let continuarAtualizacao = true;

                while (continuarAtualizacao) {
                    console.log(`Quais informações você gostaria de atualizar?`);
                    console.log(`1 - Nome`);
                    console.log(`2 - Valor`);
                    console.log(`3 - Finalizar Atualização`);
                    let opcao = entrada.receberNumero(`Escolha uma opção: `);

                    switch (opcao) {
                        case 1:
                            novoNome = entrada.receberTexto(`Informe o novo nome do produto: `);
                            console.log(`Nome atualizado com sucesso!`);
                            break;
                        case 2:
                            while (true) {
                                novoValor = entrada.receberNumero(`Por favor informe o valor do produto: `);

                                if (isNaN(novoValor) || novoValor <= 0) {
                                    console.log("Valor inválido! Por favor, insira um número válido maior que zero.");
                                } else {
                                    console.log(`Valor atualizado com sucesso!`);
                                    break;
                                }
                            }
                            break;
                        case 3:
                            continuarAtualizacao = false;
                            console.log(`Atualização finalizada.`);
                            break;
                        default:
                            console.log(`Opção inválida. Tente novamente.`);
                            break;
                    }
                }

                console.log(`\nComparação dos dados:`);
                console.log(`ID: ${produtoEncontrado.getId}`);
                console.log(`Nome: ${produtoEncontrado.getNome} -> ${novoNome}`);
                console.log(`Valor: ${produtoEncontrado.getValor} -> ${novoValor}`);


                const confirmar = entrada.receberTexto(`Deseja confirmar as alterações? (S/N): `);

                if (confirmar.toLowerCase() === 's') {
                    produtoEncontrado.setNome = novoNome;
                    produtoEncontrado.setValor = novoValor;
                    console.log(`\nAtualizações confirmadas e aplicadas com sucesso!`);
                } else {
                    console.log(`\nAtualizações descartadas.`);
                }
            } else {
                console.log(`Produto de id: ${id} não encontrado`)
            }
        }
    }
}