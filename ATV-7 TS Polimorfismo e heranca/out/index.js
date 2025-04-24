"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
const classes_1 = require("./classes");
let leitor = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let iniciar = () => {
    leitor.question(`Quais são seus números e a operação desejada ?\n`, (valor) => {
        let instrucoes = valor.split(' ');
        let n1 = Number(instrucoes[0]);
        let n2 = Number(instrucoes[1]);
        let n3;
        let operacao = instrucoes[2];
        if (instrucoes.length == 1) {
            operacao = instrucoes[0];
        }
        if (instrucoes.length == 4) {
            n3 = Number(instrucoes[2]);
            operacao = instrucoes[3];
        }
        console.log(`Essas foram suas intruções: ${instrucoes}\n`);
        let calculo;
        switch (operacao) {
            case "Somar":
                calculo = new classes_1.Soma();
                console.log(`O resultado da operação é: ${calculo.calcular(n1, n2)}\n`);
                break;
            case "Subtrair":
                calculo = new classes_1.Subitracao();
                console.log(`O resultado da operação é: ${calculo.calcular(n1, n2)}\n`);
                break;
            case "Multiplicar":
                calculo = new classes_1.Multiplicacao();
                console.log(`O resultado da operação é: ${calculo.calcular(n1, n2)}\n`);
                break;
            case "Dividir":
                calculo = new classes_1.Divisao();
                console.log(`O resultado da operação é: ${calculo.calcular(n1, n2)}\n`);
                break;
            case "Potenciar":
                calculo = new classes_1.Potenciacao();
                console.log(`O resultado da operação é: ${calculo.calcular(n1, n2)}\n`);
                break;
            case "Radiciar":
                calculo = new classes_1.Radiciacao();
                console.log(`O resultado da operação é: ${calculo.calcular(n1, n2)}\n`);
                break;
            case "Bhaskara":
                calculo = new classes_1.Bhaskara();
                let [raiz1, raiz2] = calculo.calcular(n1, n2, n3);
                console.log(`As raízes da equação são: ${raiz1} e ${raiz2}\n`);
                break;
            case "Sair":
                leitor.close();
                return;
            default:
                console.log("Operação não reconhecida. Tente novamente.\n");
        }
        iniciar();
    });
};
iniciar();
