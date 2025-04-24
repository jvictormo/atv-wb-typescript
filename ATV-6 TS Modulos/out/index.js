"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const calcuadora_1 = __importDefault(require("./calcuadora"));
const calcuadora = new calcuadora_1.default();
console.log(calcuadora.somar(1, 2));
console.log(calcuadora.subtrair(3, 4));
console.log(calcuadora.multiplicar(5, 6));
console.log(calcuadora.dividir(7, 8));
