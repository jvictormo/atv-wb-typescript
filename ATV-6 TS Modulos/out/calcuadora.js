"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("./classes");
class Calculadora {
    constructor() {
        this.somador = new classes_1.Somador();
        this.subtrador = new classes_1.Subtrador();
        this.multiplicador = new classes_1.Multiplicador();
        this.divisor = new classes_1.Divisor();
    }
    somar(n1, n2) {
        return this.somador.calcular(n1, n2);
    }
    subtrair(n1, n2) {
        return this.subtrador.calcular(n1, n2);
    }
    multiplicar(n1, n2) {
        return this.multiplicador.calcular(n1, n2);
    }
    dividir(n1, n2) {
        if (n2 === 0) {
            throw new Error("Não é possível dividir por zero");
        }
        return this.divisor.calcular(n1, n2);
    }
}
exports.default = Calculadora;
