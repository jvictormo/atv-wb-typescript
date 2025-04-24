import { Somador, Subtrador, Multiplicador, Divisor } from "./classes";

class Calculadora {
    private somador: Somador;
    private subtrador: Subtrador;
    private multiplicador: Multiplicador;
    private divisor: Divisor;

    constructor() {
        this.somador = new Somador();
        this.subtrador = new Subtrador();
        this.multiplicador = new Multiplicador();
        this.divisor = new Divisor();
    }

    public somar(n1: number, n2: number): number {
        return this.somador.calcular(n1, n2);
    }

    public subtrair(n1: number, n2: number): number {
        return this.subtrador.calcular(n1, n2);
    }

    public multiplicar(n1: number, n2: number): number {
        return this.multiplicador.calcular(n1, n2);
    }

    public dividir(n1: number, n2: number): number {
        if (n2 === 0) {
            throw new Error("Não é possível dividir por zero");
        }
        return this.divisor.calcular(n1, n2);
    }
}

export default Calculadora