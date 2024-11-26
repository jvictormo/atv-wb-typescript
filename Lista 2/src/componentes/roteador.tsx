import { Component } from "react";
import BarraNavegacao from "./barraNavegacao";
import ListaCliente from "./listaClientes";
import FormularioCadastroCliente from "./formularioCadastroCliente";
import FormularioCadastroPet from "./formularioCadastroPet";
import FormularioCadastroServicos from "./formularioCadastroServicos";
import FormularioCadastroProdutos from "./formularioCadastroProdutos";
import HomeInfo from "./homeInfo";
import SubNavBar from "./subNavBar";
import ListaPets from "./listaPets";
import ListaServicos from "./listaServicos";
import ListaProdutos from "./listProdutos";
import HomeFooter from "./homeFooter";

type State = {
    tela: string;
    botãoSelecionado: string;
    telaSub: string;
    botãoSelecionadoSub: string;
};

export default class Roteador extends Component<{}, State> {
    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.state = {
            tela: 'Home',
            botãoSelecionado: 'Home',
            telaSub: 'Visualizar',
            botãoSelecionadoSub: 'Visualizar',
        };
        this.selecionarView = this.selecionarView.bind(this);
        this.selecionarSubView = this.selecionarSubView.bind(this);
    }

    selecionarView(novaTela: string, evento: Event) {
        evento.preventDefault();
        console.log(novaTela);
        this.setState({
            tela: novaTela,
            botãoSelecionado: novaTela,
            telaSub: 'Visualizar',
            botãoSelecionadoSub: 'Visualizar',
        });
    }

    selecionarSubView(novaTelaSub: string, evento: Event) {
        evento.preventDefault();
        console.log(novaTelaSub);
        this.setState({
            telaSub: novaTelaSub,
            botãoSelecionadoSub: novaTelaSub,
        });
    }

    render() {
        let barraNavegacao = (
            <BarraNavegacao
                seletorView={this.selecionarView}
                tema='#95C093'
                botoes={['Home', 'Clientes', 'Pet', 'Serviços', 'Produtos']}
                botãoSelecionado={this.state.botãoSelecionado}
            />
        );

        if (this.state.tela === 'Clientes') {
            return (
                <>
                    {barraNavegacao}
                    <SubNavBar
                        seletorView={this.selecionarSubView}
                        tema='#E4E7E4'
                        botoes={['Visualizar', 'Cadastrar']}
                        botãoSelecionado={this.state.botãoSelecionadoSub}
                    />
                    {this.state.telaSub === 'Visualizar' ? (
                        <ListaCliente />
                    ) : (
                        <FormularioCadastroCliente tema='#3E9242' />
                    )}
                </>
            );
        } else if (this.state.tela === 'Pet') {
            return (
                <>
                    {barraNavegacao}
                    <SubNavBar
                        seletorView={this.selecionarSubView}
                        tema='#E4E7E4'
                        botoes={['Visualizar', 'Cadastrar']}
                        botãoSelecionado={this.state.botãoSelecionadoSub}
                    />
                    {this.state.telaSub === 'Visualizar' ? (
                        <ListaPets />
                    ) : (
                        <FormularioCadastroPet tema='#3E9242' />
                    )}
                </>
            );
        } else if (this.state.tela === 'Serviços') {
            return (
                <>
                    {barraNavegacao}
                    <SubNavBar
                        seletorView={this.selecionarSubView}
                        tema='#E4E7E4'
                        botoes={['Visualizar', 'Cadastrar']}
                        botãoSelecionado={this.state.botãoSelecionadoSub}
                    />
                    {this.state.telaSub === 'Visualizar' ? (
                        <ListaServicos />
                    ) : (
                        <FormularioCadastroServicos tema='#3E9242' />
                    )}
                </>
            );
        } else if (this.state.tela === 'Produtos') {
            return (
                <>
                    {barraNavegacao}
                    <SubNavBar
                        seletorView={this.selecionarSubView}
                        tema='#E4E7E4'
                        botoes={['Visualizar', 'Cadastrar']}
                        botãoSelecionado={this.state.botãoSelecionadoSub}
                    />
                    {this.state.telaSub === 'Visualizar' ? (
                        <ListaProdutos />
                    ) : (
                        <FormularioCadastroProdutos tema='#3E9242' />
                    )}
                </>
            );
        } else {
            return (
                <>
                    {barraNavegacao}
                    <HomeInfo />
                    <HomeFooter />
                </>
            );
        }
    }
}
