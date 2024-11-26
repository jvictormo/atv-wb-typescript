import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";
import Pet from "../modelo/pet";
import Cadastro from "./cadastro"

export default function addPetstoClient(clientes: Array<Cliente>, pets: Array<Pet>) {
    return {
        cadastrar(): void {
            const entrada = new Entrada()

            let cpf = entrada.receberTexto(`Digite o CPF do cliente a ser adicionado o pet: `)
            let id = entrada.receberNumero(`Digite o id do pet a ser adicionado ao cliente: `)
        
            let clienteEncontrado = clientes.find(cliente => cliente.getCpf.getValor === cpf);
    
            if(clienteEncontrado) {
                let petEncontrado = pets.find(pet => pet.getId === id)
    
                if (petEncontrado) {
                    clienteEncontrado.setPets = petEncontrado
    
                    console.log(`\nPet ${petEncontrado.getNome} adicionado com sucesso ao cliente ${clienteEncontrado.nome}.\n`);
                } else {
                    console.log("\nPet não encontrado\n")
                }
            } else {
                console.log("\nCliente não encontrado \n")
            }
        }
    }
}