class Cliente {
    constructor(nome, telefoneCelular, email, endereco) {
        this.nome = nome;
        this.telefoneCelular = telefoneCelular;
        this.email = email;
        this.endereco = endereco;
    }

    getNomeUpper() { return this.nome.toUpperCase(); }
    getNomeLower() { return this.nome.toLowerCase(); }

    getEnderecoUpper() { return this.endereco.toUpperCase(); }
    getEnderecoLower() { return this.endereco.toLowerCase(); }

    getEmailUpper() { return this.email.toUpperCase(); }
    getEmailLower() { return this.email.toLowerCase(); }

    getTelefoneCelularUpper() { return this.telefoneCelular.toUpperCase(); }
    getTelefoneCelularLower() { return this.telefoneCelular.toLowerCase(); }

    setNome(nome) { return this.nome = nome }
    setTelefoneCelular(telefoneCelular) { return this.telefoneCelular = telefoneCelular }
    setEmail(email) { return this.email = email }
    setEndereco(endereco) { return this.endereco = endereco }

    getCliente() {
        console.log("-".repeat(50))
        console.log("Informações do Cliente:")
        console.log(this.nome)
        console.log("-".repeat(50))
        console.log("-".repeat(50))
        console.log(`DDD: ${this.telefoneCelular.ddd}`)
        console.log(`Número: ${this.telefoneCelular.ddd}`)
        console.log("-".repeat(50))
        console.log("Endereço:")
        console.log(`Rua: ${this.endereco.rua}`)
        console.log(`Número: ${this.endereco.numero}`)
        console.log(`Cidade: ${this.endereco.cidade}`)
        console.log(`Estado: ${this.endereco.estado}`)
    }

    static ordenarPorNome(clientes) {
        // cria uma cópia pra não mutar o original
        return [...clientes].sort((a, b) =>
            a.nome.localeCompare(b.nome, 'pt', { sensitivity: 'base' })
        );
    }
}

class Telefone {
    constructor(ddd, numero) {
        this.ddd = ddd;
        this.numero = numero;
    }

    getDddUpper() { return this.ddd.toUpperCase(); }
    getDddLower() { return this.ddd.toLowerCase(); }

    getNumeroUpper() { return this.numero.toUpperCase(); }
    getNumeroLower() { return this.numero.toLowerCase(); }

    setDDD(ddd) { this.ddd = ddd; }
    setNumero(numero) { this.numero = numero; }

    getTelefone() {
        console.log("-".repeat(50))
        console.log("Informações de Telefone:")
        console.log(`Rua: ${this.rua}`)
        console.log(`Número: ${this.numero}`)
        console.log(`Cidade: ${this.cidade}`)
        console.log(`Estado: ${this.estado}`)
        console.log("-".repeat(50))
    }
}

class Endereco {
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

    setEstado(estado) { this.estado = estado; }
    setCidade(cidade) { this.cidade = cidade; }
    setRua(rua) { this.rua = rua; }
    setNumero(numero) { this.numero = numero; }

    getEndereco() {
        console.log("-".repeat(50))
        console.log("Informações de Endereço:")
        console.log(`DDD: ${this.ddd}`)
        console.log(`Número: ${this.ddd}`)
        console.log("-".repeat(50))
    }
}

export { Cliente, Telefone, Endereco }