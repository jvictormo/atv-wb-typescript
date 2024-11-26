import Entrada from "../../io/entrada";
import Pet from "../../modelo/pet";
import Cliente from "../../modelo/cliente";
import Deletar from "../deletar";

export default function deletarPet(pets: Array<Pet>) {
    const entrada = new Entrada();

    return {
        deletar(): void {
            console.log(`\nInício da remoção do pet`);

            let id = entrada.receberNumero(`Por favor infome o id do pet que deseja deletar: `);

            let petEncontrado = pets.find(pet => pet.getId === id);

            let confirm = null

            if (petEncontrado) {
                confirm = entrada.receberTexto(`Tem certeza que deseja deletar o pet de id: ${id} (S/N) ? `)

                if (confirm != null && confirm.toUpperCase() == "S") {
                    pets.splice(pets.indexOf(petEncontrado), 1);
                    console.log(`Pet de id: ${id} foi deletado com sucesso.`);
                } else {
                    console.log(`Pet de id: ${id} mantido`)
                    return
                }
            } else {
                console.log(`Pet de id: ${id} não encontrado`)
            }
        }
    }
}