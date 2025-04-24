import { Cliente, Telefone, Endereco, Empresa } from "./classes.js"

const enderecoDaEmpresa = new Endereco("SP", "São José dos Campos", "Av Andromeda", "1000")
const empresa = new Empresa("Mercado Online", "ABC LTDA", "131.313.113/55", enderecoDaEmpresa)

const joao_endereco = new Endereco("SP", "São José dos Campos", "Av Andromeda", "101")
const joao_tel_1 = new Telefone("012", "97528-2241")
const joao_tel_2 = new Telefone("012", "99447-5933")
const joao = new Cliente("João", "443.070.700-62", joao_endereco)
joao.addTelefone(joao_tel_1)
joao.addTelefone(joao_tel_2)

const gabriel_endereco = new Endereco("SP", "São José dos Campos", "Av Andromeda", "202")
const gabriel_tel_1 = new Telefone("012", "99402-6736")
const gabriel_tel_2 = new Telefone("012", "98416-7331")
const gabriel = new Cliente("Gabriel", "704.549.690-74", gabriel_endereco)
gabriel.addTelefone(gabriel_tel_1)
gabriel.addTelefone(gabriel_tel_2)

const barbara_endereco = new Endereco("SP", "São José dos Campos", "Av Andromeda", "303")
const barbara_tel_1 = new Telefone("012", "99359-3377")
const barbara_tel_2 = new Telefone("012", "97218-3907")
const barbara = new Cliente("Barbara", "543.311.720-07", barbara_endereco)
barbara.addTelefone(barbara_tel_1)
barbara.addTelefone(barbara_tel_2)

const marcia_endereco = new Endereco("SP", "São José dos Campos", "Av Andromeda", "404")
const marcia_tel_1 = new Telefone("012", "98414-1122")
const marcia_tel_2 = new Telefone("012", "99291-7926")
const marcia = new Cliente("Márcia", "206.444.110-74", marcia_endereco)
marcia.addTelefone(marcia_tel_1)
marcia.addTelefone(marcia_tel_2)

const adalberto_endereco = new Endereco("SP", "São José dos Campos", "Av Andromeda", "505")
const adalberto_tel_1 = new Telefone("012", "97632-6481")
const adalberto_tel_2 = new Telefone("012", "98179-2486")
const adalberto = new Cliente("Adalberto", "126.278.190-62", adalberto_endereco)
adalberto.addTelefone(adalberto_tel_1)
adalberto.addTelefone(adalberto_tel_2)

empresa.addCliente(joao)
empresa.addCliente(gabriel)
empresa.addCliente(barbara)
empresa.addCliente(marcia)
empresa.addCliente(adalberto)

empresa.detalhe()