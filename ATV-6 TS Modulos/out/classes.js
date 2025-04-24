"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Divisor = exports.Multiplicador = exports.Subtrador = exports.Somador = void 0;
class Somador {
    constructor() {
        this.calcular = (n1, n2) => {
            return n1 + n2;
        };
    }
}
exports.Somador = Somador;
class Subtrador {
    constructor() {
        this.calcular = (n1, n2) => {
            return n1 - n2;
        };
    }
}
exports.Subtrador = Subtrador;
class Multiplicador {
    constructor() {
        this.calcular = (n1, n2) => {
            return n1 * n2;
        };
    }
}
exports.Multiplicador = Multiplicador;
class Divisor {
    constructor() {
        this.calcular = (n1, n2) => {
            return n1 / n2;
        };
    }
}
exports.Divisor = Divisor;
