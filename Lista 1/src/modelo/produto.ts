let idCounter = 0;

export default class Produto {
    private id: number;
    public nome!: string
    public valor!: number

    constructor(nome: string, valor: number, id?: number) {
        this.id = id !== undefined ? id : ++idCounter;
        this.nome = nome
        this.valor = valor
    }

    public get getId() { return this.id; }
    public get getNome() { return this.nome }
    public get getValor() { return this.valor }

    public set setNome(nome: string) { this.nome = nome }
    public set setValor(valor: number) { this.valor = valor }
}