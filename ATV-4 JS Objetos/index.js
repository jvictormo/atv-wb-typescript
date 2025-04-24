import { Cliente, Telefone, Endereco } from "./classes.js"

const joao_endereco = new Endereco("SP", "São José dos Campos", "Av Andromeda", "101")
const joao_tel = new Telefone("012", "97528-2241")
const joao = new Cliente("João", joao_tel, "joao@email.com", joao_endereco)

const gabriel_endereco = new Endereco("SP", "São José dos Campos", "Av Andromeda", "202")
const gabriel_tel = new Telefone("012", "99402-6736")
const gabriel = new Cliente("Gabriel", gabriel_tel, "gabriel@email.com", gabriel_endereco)

const barbara_endereco = new Endereco("SP", "São José dos Campos", "Av Andromeda", "303")
const barbara_tel = new Telefone("012", "99359-3377")
const barbara = new Cliente("Barbara", barbara_tel, "barbara@email.com", barbara_endereco)

const marcia_endereco = new Endereco("SP", "São José dos Campos", "Av Andromeda", "404")
const marcia_tel = new Telefone("012", "98414-1122")
const marcia = new Cliente("Márcia", marcia_tel, "marcia@email.com", marcia_endereco)

const adalberto_endereco = new Endereco("SP", "São José dos Campos", "Av Andromeda", "505")
const adalberto_tel = new Telefone("012", "97632-6481")
const adalberto = new Cliente("Adalberto", adalberto_tel, "adalberto@email.com", adalberto_endereco)

const clientes = [joao, gabriel, barbara, marcia, adalberto]

const ordenados = Cliente.ordenarPorNome(clientes)

joao.getCliente()
console.log(ordenados)