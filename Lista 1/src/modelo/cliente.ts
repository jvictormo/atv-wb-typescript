import CPF from "./cpf"
import Pet from "./pet"
import Produto from "./produto"
import RG from "./rg"
import Servico from "./servico"
import Telefone from "./telefone"

export default class Cliente {
    public nome: string
    public nomeSocial: string
    private cpf: CPF
    private rgs: Array<RG>
    private dataCadastro: Date
    private telefones: Array<Telefone>
    private produtosConsumidos: Array<Produto>
    private servicosConsumidos: Array<Servico>
    private pets: Array<Pet>
    private valorGasto: number
    constructor(nome: string, nomeSocial: string, cpf: CPF) {
        this.nome = nome
        this.nomeSocial = nomeSocial
        this.cpf = cpf
        this.rgs = []
        this.dataCadastro = new Date()
        this.telefones = []
        this.produtosConsumidos = [];
        this.servicosConsumidos = [];
        this.pets = [];
        this.valorGasto = 0
    }
    public set setNome(nome: string) {
        this.nome = nome
    }

    public set setNomeSocial(nomeSocial: string) {
        this.nomeSocial = nomeSocial
    }

    public set setCpf(cpf: CPF) {
        this.cpf = cpf
    }

    public get getCpf(): CPF {
        return this.cpf
    }

    public get getRgs(): Array<RG> {
        return this.rgs
    }

    public get getDataCadastro(): Date {
        return this.dataCadastro
    }

    public get getTelefones(): Array<Telefone> {
        return this.telefones
    }

    public get getProdutosConsumidos(): Array<Produto> {
        return this.produtosConsumidos
    }

    public get getServicosConsumidos(): Array<Servico> {
        return this.servicosConsumidos
    }

    public get getPets(): Array<Pet> {
        return this.pets
    }

    public get getValorGasto(): Number {
        return this.valorGasto
    }

    public set setPets(pet: Pet) {
        this.pets.push(pet)
    }

    public set setProdutos(produtosConsumidos: Produto) {
        this.produtosConsumidos.push(produtosConsumidos)
    }

    public set setServicos(servicosConsumidos: Servico) {
        this.servicosConsumidos.push(servicosConsumidos)
    }

    public set setValorGasto(valorGasto: number) {
        this.valorGasto += valorGasto
    }

    public set removeValorGasto(valorGasto: number) {
        this.valorGasto -= valorGasto
    }
}