import Entrada from "../io/entrada";
import Empresa from "../modelo/empresa";
import addPetstoClient from "../negocio/adicionarPetsCliente";
import addProdutosToCliente from "../negocio/adicionarProdutoCliente";
import addServicosToCliente from "../negocio/adicionarServicoCliente";
import atualizarCleinte from "../negocio/atualizar/atualizarCliente";
import atualizarPet from "../negocio/atualizar/atualizarPet";
import atualizarServicos from "../negocio/atualizar/atualizarServico";
import atualizarProdutos from "../negocio/atualizar/atualizarProduto";
import CadastroCliente from "../negocio/cadastroCliente";
import createCadastroPets from "../negocio/cadastroPet";
import createCadastoProduto from "../negocio/cadastroProduto";
import createCadastoServicos from "../negocio/cadastroServico";
import deletarCliente from "../negocio/excluir/excluirCliente";
import deletarPet from "../negocio/excluir/excluirPet";
import deletarProduto from "../negocio/excluir/excluirProduto";
import deletarServico from "../negocio/excluir/excluirServico";
import ListagemClientes from "../negocio/listagemClientes";
import readListagemPets from "../negocio/listagemPets";
import readListagemProdutos from "../negocio/listagemProdutos";
import readListagemServicos from "../negocio/listagemServicos";
import getProdutoServicoConsumidoQuantidade from "../negocio/listas/listagemClientesQuantidade";
import getProdutoServicoConsumidoValor from "../negocio/listas/listagemClientesValor";
import listarConsumoPorRacaETipo from "../negocio/listas/listagemProdutosRaça";

console.log(`Bem-vindo ao melhor sistema de gerenciamento de pet shops e clínicas veterinarias`)
let empresa = new Empresa()
let execucao = true

while (execucao) {
    console.log(`Opções:`);
    console.log(`1 - Cadastrar cliente`);
    console.log(`2 - Listar todos os clientes`);
    console.log(`3 - Atualizar cliente`);
    console.log(`4 - Deletar cliente`);
    console.log(`5 - Cadastrar pet`);
    console.log(`6 - Listar todos os pets`);
    console.log(`7 - Atualizar pet`);
    console.log(`8 - Deletar pet`);
    console.log(`9 - Cadastrar produto`);
    console.log(`10 - Listar todos os produtos`);
    console.log(`11 - Atualizar produto`);
    console.log(`12 - Deletar produto`);
    console.log(`13 - Cadastrar serviço`);
    console.log(`14 - Listar todos os serviços`);
    console.log(`15 - Atualizar serviço`);
    console.log(`16 - Deletar serviço`);
    console.log(`17 - Relacionar pet com cliente`);
    console.log(`18 - Relacionar produto com cliente`);
    console.log(`19 - Relacionar servico com cliente`);
    console.log(`20 - Listagem dos clientes que mais consumiram em quantidade`);
    console.log(`21 - Listagem dos clientes que mais consumiram em valor`);
    console.log(`22 - Listagem dos raças e tipos que mais consumiram em quantidade`);

    console.log(`0 - Sair`);

    let entrada = new Entrada()
    let opcao = entrada.receberNumero(`Por favor, escolha uma opção: `)

    switch (opcao) {
        case 1:
            let cadastro = new CadastroCliente(empresa.getClientes)
            cadastro.cadastrar()
            break;
        case 2:
            let listagem = new ListagemClientes(empresa.getClientes)
            listagem.listar()
            break;
        case 3:
            let atualizacao = atualizarCleinte(empresa.getClientes)
            atualizacao.atualizar()
            break;
        case 4:
            let deleta = deletarCliente(empresa.getClientes)
            deleta.deletar()
            break;
        case 5:
            let pets = createCadastroPets(empresa.getPets)
            pets.cadastrar();
            break;
        case 6:
            let listagemPets = readListagemPets(empresa.getPets)
            listagemPets.listar();
            break;
        case 7:
            let atualizaPet = atualizarPet(empresa.getPets)
            atualizaPet.atualizar()
            break;
        case 8:
            let deletaPet = deletarPet(empresa.getPets)
            deletaPet.deletar()
            break;
        case 9:
            let produtos = createCadastoProduto(empresa.getProdutos)
            produtos.cadastrar()
            break;
        case 10:
            let listagemProdutos = readListagemProdutos(empresa.getProdutos)
            listagemProdutos.listar();
            break;
        case 11:
            let atualizaProdutos = atualizarProdutos(empresa.getProdutos)
            atualizaProdutos.atualizar()
            break;
        case 12:
            let deletaProdutos = deletarProduto(empresa.getProdutos)
            deletaProdutos.deletar()
            break;
        case 13:
            let servicos = createCadastoServicos(empresa.getServicos)
            servicos.cadastrar()
        case 14:
            let listagemServicos = readListagemServicos(empresa.getServicos)
            listagemServicos.listar();
            break;
        case 15:
            let atualizaServicos = atualizarServicos(empresa.getServicos)
            atualizaServicos.atualizar()
            break;
        case 16:
            let deletaServicos = deletarServico(empresa.getServicos)
            deletaServicos.deletar()
            break;
        case 17:
            let linkPetCliente = addPetstoClient(empresa.getClientes, empresa.getPets)
            linkPetCliente.cadastrar();
            break;
        case 18:
            let linkProdutoCliente = addProdutosToCliente(empresa.getClientes, empresa.getProdutos)
            linkProdutoCliente.cadastrar();
            break;
        case 19:
            let linkServicoCliente = addServicosToCliente(empresa.getClientes, empresa.getServicos)
            linkServicoCliente.cadastrar();
            break;
        case 20:
            let listagemQuantidade = getProdutoServicoConsumidoQuantidade(empresa.getClientes)
            listagemQuantidade.listar();
            break;
        case 21:
            let listagemValor = getProdutoServicoConsumidoValor(empresa.getClientes)
            listagemValor.listar();
            break;
        case 22:
            let listagemRacaTipo = listarConsumoPorRacaETipo(empresa.getClientes)
            listagemRacaTipo.listar();
            break;
        case 0:
            execucao = false
            console.log(`Até mais`)
            break;
        default:
            console.log(`Operação não entendida :(`)
    }
}