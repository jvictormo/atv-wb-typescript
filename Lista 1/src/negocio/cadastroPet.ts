import Entrada from "../io/entrada";
import Pet from "../modelo/pet";
import Cadastro from "./cadastro";

export default function createCadastroPets(pets: Array<Pet>) {
    const entrada = new Entrada();

    return {
        cadastrar(): void {
            console.log(`\nInício do cadastro do pet`);


            let nome = entrada.receberTexto(`Por favor infome o nome do pet: `);
            let tipo = entrada.receberTexto(`Por favor infome o tipo do pet: `);
            let raca = entrada.receberTexto(`Por favor infome a raça do pet: `);
            let genero = entrada.receberTexto(`Por favor infome o genero do pet: `);

            let pet = new Pet(nome, raca, genero, tipo);

            pets.push(pet);
            console.log(`\nCadastro concluído :)\n`);
            console.log(`ID do pet cadastrado: ${pet.getId}`);
        }
    }
} 