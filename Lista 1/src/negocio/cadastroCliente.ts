import Entrada from "../io/entrada"
import Cliente from "../modelo/cliente"
import CPF from "../modelo/cpf"
import Produto from "../modelo/produto"
import Servico from "../modelo/servico"
import Cadastro from "./cadastro"

export default class CadastroCliente extends Cadastro {
    private clientes: Array<Cliente>
    private entrada: Entrada
    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
        this.entrada = new Entrada()
    }

    private validarData(data: string): boolean {
        const regex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!regex.test(data)) {
            return false;
        }

        const [dia, mes, ano] = data.split('/').map(Number);

        const dataObjeto = new Date(ano, mes - 1, dia);
        return dataObjeto.getDate() === dia && dataObjeto.getMonth() === mes - 1 && dataObjeto.getFullYear() === ano;
    }

    public cadastrar(): void {
        console.log(`\nInício do cadastro do cliente`);
        let nome = this.entrada.receberTexto(`Por favor informe o nome do cliente: `)
        let nomeSocial = this.entrada.receberTexto(`Por favor informe o nome social do cliente: `)
        let valor = this.entrada.receberTexto(`Por favor informe o número do cpf: `);

        let data: string;
        while (true) {
            data = this.entrada.receberTexto(`Por favor informe a data de emissão do cpf, no padrão dd/mm/yyyy: `);

            if (this.validarData(data)) {
                break;
            } else {
                console.log("Data inválida! Por favor, insira uma data no formato dd/mm/yyyy.");
            }
        }

        const [dia, mes, ano] = data.split('/').map(Number);
        let dataEmissao = new Date(ano, mes, dia)

        let cpf = new CPF(valor, dataEmissao);

        let cpfExistente = this.clientes.some(cliente => cliente.getCpf.getValor === cpf.getValor);
        if (cpfExistente) {
            console.log(`\nCPF já cadastrado! Não é possível realizar o cadastro.`);
        } else {
            let cliente = new Cliente(nome, nomeSocial, cpf);
            this.clientes.push(cliente)
            console.log(`\nCadastro concluído :)\n`);
        }
    }
}