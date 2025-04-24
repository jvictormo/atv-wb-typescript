import * as readline from "readline";
import { Soma, Subitracao, Multiplicacao, Divisao, Radiciacao, Potenciacao, Bhaskara } from "./classes";

let leitor = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let iniciar = () => {
    leitor.question(`Quais são seus números e a operação desejada ?\n`, (valor) => {
        let instrucoes = valor.split(' ');
        let n1 = Number(instrucoes[0])
        let n2 = Number(instrucoes[1])
        let n3: number | undefined;
        let operacao = instrucoes[2]
        if (instrucoes.length == 1) {
            operacao = instrucoes[0]
        }

        if (instrucoes.length == 4) {
            n3 = Number(instrucoes[2])
            operacao = instrucoes[3]
        }

        console.log(`Essas foram suas intruções: ${instrucoes}\n`)
        let calculo
        switch (operacao) {
            case "Somar":
                calculo = new Soma()
                console.log(`O resultado da operação é: ${calculo.calcular(n1, n2)}\n`)
                break;
            case "Subtrair":
                calculo = new Subitracao()
                console.log(`O resultado da operação é: ${calculo.calcular(n1, n2)}\n`)
                break;
            case "Multiplicar":
                calculo = new Multiplicacao()
                console.log(`O resultado da operação é: ${calculo.calcular(n1, n2)}\n`)
                break;
            case "Dividir":
                calculo = new Divisao()
                console.log(`O resultado da operação é: ${calculo.calcular(n1, n2)}\n`)
                break;
            case "Potenciar":
                calculo = new Potenciacao()
                console.log(`O resultado da operação é: ${calculo.calcular(n1, n2)}\n`)
                break;
            case "Radiciar":
                calculo = new Radiciacao()
                console.log(`O resultado da operação é: ${calculo.calcular(n1, n2)}\n`)
                break;
            case "Bhaskara":
                calculo = new Bhaskara()
                let [raiz1, raiz2] = calculo.calcular(n1, n2, n3!);
                console.log(`As raízes da equação são: ${raiz1} e ${raiz2}\n`);
                break;
            case "Sair":
                leitor.close();
                return;
            default:
                console.log("Operação não reconhecida. Tente novamente.\n");
        }

        iniciar();
    })
}

iniciar();