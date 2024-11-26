import Entrada from "../../io/entrada";
import Servico from "../../modelo/servico";
import Atualiza from "../atualizar";

export default function atualizarServicos(servicos: Array<Servico>) {
    const entrada = new Entrada();

    return {
        atualizar(): void {
            console.log(`\nInício da atualização do servico`);

            let id = entrada.receberNumero(`Por favor infome o id do servico que deseja atualizar: `);

            let servicoEncontrado = servicos.find(servicos => servicos.getId === id);

            if (servicoEncontrado) {
                console.log(`Servico com ID: ${id} encontrado.`)

                let novoNome = servicoEncontrado.getNome;
                let novoValor = servicoEncontrado.getValor;

                let continuarAtualizacao = true;

                while (continuarAtualizacao) {
                    console.log(`Quais informações você gostaria de atualizar?`);
                    console.log(`1 - Nome`);
                    console.log(`2 - Valor`);
                    console.log(`3 - Finalizar Atualização`);
                    let opcao = entrada.receberNumero(`Escolha uma opção: `);

                    switch (opcao) {
                        case 1:
                            novoNome = entrada.receberTexto(`Informe o novo nome do servico: `);
                            console.log(`Nome atualizado com sucesso!`);
                            break;
                        case 2:
                            while (true) {
                                novoValor = entrada.receberNumero(`Por favor informe o valor do servico: `);

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
                console.log(`ID: ${servicoEncontrado.getId}`);
                console.log(`Nome: ${servicoEncontrado.getNome} -> ${novoNome}`);
                console.log(`Valor: ${servicoEncontrado.getValor} -> ${novoValor}`);


                const confirmar = entrada.receberTexto(`Deseja confirmar as alterações? (S/N): `);

                if (confirmar.toLowerCase() === 's') {
                    servicoEncontrado.setNome = novoNome;
                    servicoEncontrado.setValor = novoValor;
                    console.log(`\nAtualizações confirmadas e aplicadas com sucesso!`);
                } else {
                    console.log(`\nAtualizações descartadas.`);
                }
            } else {
                console.log(`Servico de id: ${id} não encontrado`)
            }
        }
    }
}