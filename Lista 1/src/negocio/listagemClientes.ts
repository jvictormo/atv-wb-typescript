import Cliente from "../modelo/cliente";
import Listagem from "./listagem";

export default class ListagemClientes extends Listagem {
    private clientes: Array<Cliente>
    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
    }

    public listar(): void {

        console.log(`\nLista de todos os clientes:`);
        this.clientes.forEach(cliente => {
            const Pets = cliente.getPets

            console.log(`Nome: ` + cliente.nome);
            console.log(`Nome social: ` + cliente.nomeSocial);
            console.log(`CPF: ` + cliente.getCpf.getValor);
            if(cliente.getPets)Pets.forEach(pet => {
                console.log(`Pet: ${pet.getNome}`)
            })
            console.log(`--------------------------------------`);
        });
        console.log(`\n`);
    }
}