"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Descritor = exports.Empresa = exports.Endereco = exports.Telefone = exports.Funcionario = void 0;
class Funcionario {
    constructor(nome, matricula, cpf, endereco, telefone) {
        this.nome = nome;
        this.matricula = matricula;
        this.cpf = cpf;
        this.endereco = endereco;
        this.telefone = telefone;
    }
}
exports.Funcionario = Funcionario;
class Telefone {
    constructor(ddd, numero) {
        this.ddd = ddd;
        this.numero = numero;
    }
}
exports.Telefone = Telefone;
class Endereco {
    constructor(numero, rua, bairro, cidade) {
        this.numero = numero;
        this.rua = rua;
        this.bairro = bairro;
        this.cidade = cidade;
    }
}
exports.Endereco = Endereco;
class Empresa {
    constructor(razaoSocial, nomeFantasia, cnpj, endereco, funcionarios, telefones) {
        this.razaoSocial = razaoSocial;
        this.nomeFantasia = nomeFantasia;
        this.cnpj = cnpj;
        this.endereco = endereco;
        this.funcionarios = funcionarios;
        this.telefones = telefones;
    }
}
exports.Empresa = Empresa;
class Descritor {
    descrever(empresa) {
        console.log(`Razão social: ${empresa.razaoSocial}`);
        console.log(`Nome fantasia: ${empresa.nomeFantasia}`);
        console.log(`CNPJ: ${empresa.cnpj}`);
        console.log("Endereco");
        console.log(`Rua: ${empresa.endereco.rua} Bairro: ${empresa.endereco.bairro} Cidade: ${empresa.endereco.cidade}`);
        console.log("Funcionários");
        console.log("\n");
        empresa.funcionarios.forEach((funcionario) => {
            console.log(`Nome: ${funcionario.nome}`);
            console.log(`Matricula: ${funcionario.matricula}`);
            console.log(`CPF: ${funcionario.cpf}`);
            console.log(`Rua: ${funcionario.endereco.rua} Bairro: ${funcionario.endereco.bairro} Cidade: ${funcionario.endereco.cidade}`);
        });
    }
}
exports.Descritor = Descritor;
