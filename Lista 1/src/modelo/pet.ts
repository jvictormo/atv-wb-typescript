let idCounter = 0;

export default class Pet {
    private id: number;
    private nome: string
    private tipo: string
    private raca: string
    private genero: string

    constructor(nome: string, raca: string, genero: string, tipo: string, id?: number) {
        this.id = id !== undefined ? id : ++idCounter;
        this.nome = nome
        this.raca = raca
        this.genero = genero
        this.tipo = tipo
    }

    public get getId() { return this.id; }
    public get getNome() { return this.nome }
    public get getRaca() { return this.raca }
    public get getGenero() { return this.genero }
    public get getTipo() { return this.tipo }

    public set setId(id: number) { this.id = id; }
    public set setNome(nome: string) { this.nome = nome }
    public set setRaca(raca: string) { this.raca = raca }
    public set setGenero(genero: string) { this.genero = genero }
    public set setTipo(tipo: string) { this.tipo = tipo }
}