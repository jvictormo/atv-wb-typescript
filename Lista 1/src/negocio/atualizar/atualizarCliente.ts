import Entrada from "../../io/entrada";
import Cliente from "../../modelo/cliente";
import CPF from "../../modelo/cpf";
import Atualiza from "../atualizar";

export default function atualizarCleinte(cliente: Array<Cliente>) {
    const entrada = new Entrada()
    return {
        atualizar(): void {
            console.log(`\nInício da atualização do cliente`);

            const cpf = entrada.receberTexto(`Por favor, informe o CPF do cliente que deseja atualizar: `);

            const clienteEncontrado = cliente.find(cliente => cliente.getCpf.getValor == cpf);

            if (clienteEncontrado) {
                console.log(`Cliente com CPF: ${cpf} encontrado.`);

                let novoNome = clienteEncontrado.nome;
                let novoNomeSocial = clienteEncontrado.nomeSocial;
                let novoCPF = clienteEncontrado.getCpf;

                let continuarAtualizacao = true;

                while (continuarAtualizacao) {
                    console.log(`Quais informações você gostaria de atualizar?`);
                    console.log(`1 - Nome`);
                    console.log(`2 - Nome Social`);
                    console.log(`3 - Finalizar Atualização`);
                    let opcao = entrada.receberNumero(`Escolha uma opção: `);

                    switch (opcao) {
                        case 1:
                            novoNome = entrada.receberTexto(`Informe o novo nome: `);
                            console.log(`Nome atualizado com sucesso!`);
                            break;
                        case 2:
                            novoNomeSocial = entrada.receberTexto(`Informe o novo nome social: `);
                            console.log(`Nome social atualizado com sucesso!`);
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
                console.log(`Nome: ${clienteEncontrado.nome} -> ${novoNome}`);
                console.log(`Nome Social: ${clienteEncontrado.nomeSocial} -> ${novoNomeSocial}`);
                console.log(`CPF: ${clienteEncontrado.getCpf.getValor}`);

                const confirmar = entrada.receberTexto(`Deseja confirmar as alterações? (S/N): `);

                if (confirmar.toLowerCase() === 's') {

                    clienteEncontrado.setNome = novoNome;
                    clienteEncontrado.setNomeSocial = novoNomeSocial;
                    clienteEncontrado.setCpf = novoCPF;
                    console.log(`\nAtualizações confirmadas e aplicadas com sucesso!`);
                } else {
                    console.log(`\nAtualizações descartadas.`);
                }

            } else {
                console.log(`Cliente com CPF: ${cpf} não encontrado.`);
            }
        }
    }
}