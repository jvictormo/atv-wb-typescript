"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("./classes");
let endereco = new classes_1.Endereco(123, 'Av. Paulista', 'Jardim Paulista', 'São Paulo');
let telefone = new classes_1.Telefone('011', '9-9999-9999');
let funcionario = new classes_1.Funcionario('Tony Stark', '123456789', '999.999.999-99', endereco, telefone);
let funcionarios = [funcionario];
let telefones = [telefone];
let empresa = new classes_1.Empresa('Mercado Online', 'ABC LTDA', '999-999-999-999-99', endereco, funcionarios, telefones);
let descricao = new classes_1.Descritor();
descricao.descrever(empresa);
