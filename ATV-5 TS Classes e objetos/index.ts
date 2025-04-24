import { Funcionario, Telefone, Endereco, Empresa, Descritor } from "./classes";

let endereco = new Endereco(123, 'Av. Paulista', 'Jardim Paulista', 'São Paulo');
let telefone = new Telefone('011', '9-9999-9999');
let funcionario = new Funcionario('Tony Stark', '123456789', '999.999.999-99', endereco, telefone);
let funcionarios = [funcionario]
let telefones = [telefone]
let empresa = new Empresa('Mercado Online', 'ABC LTDA', '999-999-999-999-99', endereco, funcionarios, telefones)

let descricao = new Descritor()

descricao.descrever(empresa)