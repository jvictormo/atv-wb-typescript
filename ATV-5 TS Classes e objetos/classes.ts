class Funcionario {
    nome: string;
    matricula: string;
    cpf: string;
    endereco: Endereco;
    telefone: Telefone;
    constructor(nome: string, matricula: string, cpf: string, endereco: Endereco, telefone: Telefone) {
        this.nome = nome;
        this.matricula = matricula;
        this.cpf = cpf;
        this.endereco = endereco;
        this.telefone = telefone;
    }
}

class Telefone {
    ddd: string;
    numero: string;
    constructor(ddd: string, numero: string) {
        this.ddd = ddd;
        this.numero = numero;
    }
}

class Endereco {
    numero: number;
    rua: string;
    bairro: string;
    cidade: string;
    constructor(numero: number, rua: string, bairro: string, cidade: string) {
        this.numero = numero;
        this.rua = rua;
        this.bairro = bairro;
        this.cidade = cidade;
    }
}

class Empresa {
    razaoSocial: string;
    nomeFantasia: string;
    cnpj: string;
    endereco: Endereco;
    funcionarios: Funcionario[]
    telefones: Telefone[]
    constructor(razaoSocial: string, nomeFantasia: string, cnpj: string, endereco: Endereco, funcionarios: Funcionario[], telefones: Telefone[]) {
        this.razaoSocial = razaoSocial;
        this.nomeFantasia = nomeFantasia;
        this.cnpj = cnpj
        this.endereco = endereco;
        this.funcionarios = funcionarios;
        this.telefones = telefones;
    }
}

class Descritor {
    descrever(empresa: Empresa) {
        console.log(`Razão social: ${empresa.razaoSocial}`)
        console.log(`Nome fantasia: ${empresa.nomeFantasia}`)
        console.log(`CNPJ: ${empresa.cnpj}`)
        console.log("Endereco")
        console.log(`Rua: ${empresa.endereco.rua} Bairro: ${empresa.endereco.bairro} Cidade: ${empresa.endereco.cidade}`)
        console.log("Funcionários")
        console.log("\n")
        empresa.funcionarios.forEach((funcionario) => {
            console.log(`Nome: ${funcionario.nome}`)
            console.log(`Matricula: ${funcionario.matricula}`)
            console.log(`CPF: ${funcionario.cpf}`)
            console.log(`Rua: ${funcionario.endereco.rua} Bairro: ${funcionario.endereco.bairro} Cidade: ${funcionario.endereco.cidade}`)
        })
    }
}

export { Funcionario, Telefone, Endereco, Empresa, Descritor }