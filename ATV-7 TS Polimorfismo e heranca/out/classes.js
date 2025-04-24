"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bhaskara = exports.Radiciacao = exports.Potenciacao = exports.Divisao = exports.Multiplicacao = exports.Subitracao = exports.Soma = void 0;
class Calculo {
}
class Soma extends Calculo {
    calcular(n1, n2) {
        return n1 + n2;
    }
}
exports.Soma = Soma;
class Subitracao extends Calculo {
    calcular(n1, n2) {
        return n1 - n2;
    }
}
exports.Subitracao = Subitracao;
class Multiplicacao extends Calculo {
    calcular(n1, n2) {
        return n1 * n2;
    }
}
exports.Multiplicacao = Multiplicacao;
class Divisao extends Calculo {
    calcular(n1, n2) {
        return n1 / n2;
    }
}
exports.Divisao = Divisao;
class Potenciacao extends Calculo {
    calcular(n1, n2) {
        return n1 ** n2;
    }
}
exports.Potenciacao = Potenciacao;
class Radiciacao extends Calculo {
    calcular(n1, n2) {
        return n1 ** (1 / n2);
    }
}
exports.Radiciacao = Radiciacao;
class Bhaskara extends Calculo {
    calcular(a, b, c) {
        let delta = b ** 2 - 4 * a * c;
        if (delta < 0)
            throw new Error("Não existem raizes reais.");
        let r1 = (-b + Math.sqrt(delta)) / (2 * a);
        let r2 = (-b - Math.sqrt(delta)) / (2 * a);
        return [r1, r2];
    }
}
exports.Bhaskara = Bhaskara;
