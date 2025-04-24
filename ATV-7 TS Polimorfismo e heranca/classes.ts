abstract class Calculo {
    public abstract calcular(n1: number, n2: number, n3: number): number | [number, number];
}

class Soma extends Calculo {
    public calcular(n1: number, n2: number): number {
        return n1 + n2
    }
}

class Subitracao extends Calculo {
    public calcular(n1: number, n2: number): number {
        return n1 - n2
    }
}

class Multiplicacao extends Calculo {
    public calcular(n1: number, n2: number): number {
        return n1 * n2
    }
}

class Divisao extends Calculo {
    public calcular(n1: number, n2: number): number {
        return n1 / n2
    }
}

class Potenciacao extends Calculo {
    public calcular(n1: number, n2: number): number {
        return n1 ** n2
    }
}

class Radiciacao extends Calculo {
    public calcular(n1: number, n2: number): number {
        return n1 ** (1/n2)
    }
}

class Bhaskara extends Calculo {
    public calcular(a: number, b: number, c: number): [number, number] {
        let delta = b**2 - 4 * a *c;

        if (delta < 0) throw new Error ("Não existem raizes reais.");

        let r1 = (-b + Math.sqrt(delta)) / (2 * a);
        let r2 = (-b - Math.sqrt(delta)) / (2 * a);

        return [r1, r2]
    }
}

export{Soma, Subitracao, Multiplicacao, Divisao, Potenciacao, Radiciacao, Bhaskara}