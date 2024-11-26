import Entrada from "../../io/entrada"
import Pet from "../../modelo/pet"
import Atualiza from "../atualizar"

export default function atualizarPet(pet: Array<Pet>) {
    const entrada = new Entrada();
    return {
        atualizar(): void {
            console.log(`\nInício da atualização de pet`);

            let id = entrada.receberNumero(`Por favor infome o id do pet que deseja atualizar: `);

            let petEncontrado = pet.find(pet => pet.getId === id);

            if (petEncontrado) {
                console.log(`Pet com ID: ${id} encontrado.`)

                let novoNome = petEncontrado.getNome;
                let novoTipo = petEncontrado.getTipo;
                let novaRaca = petEncontrado.getRaca;
                let novoGenero = petEncontrado.getGenero;

                let continuarAtualizacao = true;

                while (continuarAtualizacao) {
                    console.log(`Quais informações você gostaria de atualizar?`);
                    console.log(`1 - Nome`);
                    console.log(`2 - Tipo`);
                    console.log(`3 - Raca`);
                    console.log(`4 - Genero`);
                    console.log(`5 - Finalizar Atualização`);
                    let opcao = entrada.receberNumero(`Escolha uma opção: `);

                    switch (opcao) {
                        case 1:
                            novoNome = entrada.receberTexto(`Informe o novo nome do pet: `);
                            console.log(`Nome atualizado com sucesso!`);
                            break;
                        case 2:
                            novoTipo = entrada.receberTexto(`Informe o novo tipo do pet: `);
                            console.log(`Tipo do pet atualizado com sucesso!`);
                            break;
                        case 3:
                            novaRaca = entrada.receberTexto(`Informe a nova raça do pet: `);
                            console.log(`Raça do pet atualizado com sucesso!`);
                            break;
                        case 4:
                            novoGenero = entrada.receberTexto(`Informe o novo genero do pet: `);
                            console.log(`Genero do pet atualizado com sucesso!`);
                            break;
                        case 5:
                            continuarAtualizacao = false;
                            console.log(`Atualização finalizada.`);
                            break;
                        default:
                            console.log(`Opção inválida. Tente novamente.`);
                            break;
                    }
                }

                console.log(`\nComparação dos dados:`);
                console.log(`ID: ${petEncontrado.getId}`);
                console.log(`Nome: ${petEncontrado.getNome} -> ${novoNome}`);
                console.log(`Tipo: ${petEncontrado.getTipo} -> ${novoTipo}`);
                console.log(`Raca ${petEncontrado.getRaca} -> ${novaRaca}`);
                console.log(`Genero: ${petEncontrado.getGenero} -> ${novoGenero}`);

                const confirmar = entrada.receberTexto(`Deseja confirmar as alterações? (S/N): `);

                if (confirmar.toLowerCase() === 's') {

                    petEncontrado.setNome = novoNome;
                    petEncontrado.setTipo = novoTipo;
                    petEncontrado.setRaca = novaRaca;
                    petEncontrado.setGenero = novoGenero
                    console.log(`\nAtualizações confirmadas e aplicadas com sucesso!`);
                } else {
                    console.log(`\nAtualizações descartadas.`);
                }

            } else {
                console.log(`Pet de id: ${id} não encontrado`)
            }
        }
    }
}