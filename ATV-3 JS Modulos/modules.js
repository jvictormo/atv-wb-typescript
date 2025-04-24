export class Cliente {
    #cpf;
    constructor(nome, cpf, endereco) {
        this.nome = nome;
        this.endereco = endereco;
        this.telefones = new Set();
        this.#cpf = cpf;
    }

    getNomeUpper() { return this.nome.toUpperCase(); }
    getNomeLower() { return this.nome.toLowerCase(); }

    getEnderecoUpper() { return this.endereco.toUpperCase(); }
    getEnderecoLower() { return this.endereco.toLowerCase(); }

    getCpfUpper() { return this.#cpf.toUpperCase(); }
    getCpfLower() { return this.#cpf.toLowerCase(); }

    addTelefone(telefones) {
        this.telefones.add(telefones);
    }
}

export class Telefone {
    constructor(ddd, numero) {
        this.ddd = ddd;
        this.numero = numero;
    }

    getDddUpper() { return this.ddd.toUpperCase(); }
    getDddLower() { return this.ddd.toLowerCase(); }

    getNumeroUpper() { return this.numero.toUpperCase(); }
    getNumeroLower() { return this.numero.toLowerCase(); }
}

export class Endereco {
    constructor(estado, cidade, rua, numero) {
        this.estado = estado;
        this.cidade = cidade;
        this.rua = rua;
        this.numero = numero;
    }

    getEstadoUpper() { return this.estado.toUpperCase(); }
    getEstadoLower() { return this.estado.toLowerCase(); }

    getCidadeUpper() { return this.cidade.toUpperCase(); }
    getCidadeLower() { return this.cidade.toLowerCase(); }

    getRuaUpper() { return this.rua.toUpperCase(); }
    getRuaLower() { return this.rua.toLowerCase(); }

    getNumeroUpper() { return this.numero.toString().toUpperCase(); }
    getNumeroLower() { return this.numero.toString().toLowerCase(); }
}

export class Empresa {
    #cnpj
    constructor(razaoSocial, nomeFantasia, cnpj, endereco) {
        this.endereco = endereco;
        this.nomeFantasia = nomeFantasia;
        this.razaoSocial = razaoSocial;
        this.#cnpj = cnpj;
        this.clientes = new Set();
        this.telefones = new Set();
    }

    getCnpjUpper() { return this.#cnpj.toUpperCase(); }
    getCnpjLower() { return this.#cnpj.toLowerCase(); }

    getRazaoUpper() { return this.razaoSocial.toUpperCase(); }
    getRazaoLower() { return this.razaoSocial.toLowerCase(); }

    getFantasiaUpper() { return this.nomeFantasia.toUpperCase(); }
    getFantasiaLower() { return this.nomeFantasia.toLowerCase(); }

    addCliente(cliente) {
        this.clientes.add(cliente);
    }

    detalhe() {
        console.log(`Razão Social: ${this.razaoSocial}`);
        console.log(`Nome Fantasia: ${this.nomeFantasia}`);
        console.log('-'.repeat(50));

        for (const cli of this.clientes) {
            console.log(`Cliente: ${cli.nome}`);

            if (cli.endereco) {
                console.log(`Estado: ${cli.endereco.estado}, Cidade: ${cli.endereco.cidade}, Rua: ${cli.endereco.rua} Número: ${cli.endereco.numero}`);
            }

            if (cli.telefones && cli.telefones.size) {
                for (const tel of cli.telefones) {
                    console.log(`DDD: (${tel.ddd}) Número: ${tel.numero}`);
                }
            }

            console.log('\n');
        }
    }
}