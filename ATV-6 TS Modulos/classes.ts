class Somador {
    public calcular = (n1: number, n2: number) => {
        return n1 + n2
    }
}

class Subtrador {
    public calcular = (n1: number, n2: number) => {
        return n1 - n2
    }
}

class Multiplicador {
    public calcular = (n1: number, n2: number) => {
        return n1 * n2
    }
}

class Divisor {
    public calcular = (n1: number, n2: number) => {
        return n1 / n2
    }
}

export {Somador, Subtrador, Multiplicador, Divisor}