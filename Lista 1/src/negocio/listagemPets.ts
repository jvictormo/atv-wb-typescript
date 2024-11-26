import Pet from "../modelo/pet"
import Listagem from "./listagem"

export default function readListagemPets(pets: Array<Pet>) {
    return {
        pets: pets,

        listar(): void {
            console.log(`\nLista de todos os pets:`);
            this.pets.forEach(pet => {
                console.log(`Id:` + pet.getId);
                console.log(`Nome:` + pet.getNome);
                console.log(`Raça:` + pet.getRaca);
                console.log(`Genero:` + pet.getGenero);
                console.log(`Tipo:` + pet.getTipo);
                console.log(`--------------------------------------`);
            })
            console.log(`\n`);
        }
    }

}
