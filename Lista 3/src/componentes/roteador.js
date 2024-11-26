/* eslint-disable no-unused-vars */
import { useState } from "react";
import BarraNavegacao from "./barraNavegacao";
import SubNavBar from "./subNavBar";
import HomeInfo from "./homeInfo";
import HomeFooter from "./homeFooter";
import ListaCliente from "./listaCliente";
import FormularioCadastroCliente from "./formularioCadastroCliente";
import ListaPets from "./listaPets";
import FormularioCadastroPet from "./formularioCadastroPet";
import ListaServicos from "./listaServicos";
import FormularioCadastroServicos from "./formularioCadastroServicos";
import ListaProdutos from "./listProdutos";
import FormularioCadastroProdutos from "./formularioCadastroProdutos";

export default function Roteador() {
    const [tela, setTela] = useState('Home')
    const [telaSub, setTelaSub] = useState('Visualizar')
    const selecionarView = (valor, e) => {
        e.preventDefault()
        setTela(valor)
        setTelaSub('Visualizar')
    }
    const selecionaSubView = (valor, e) => {
        e.preventDefault()
        setTelaSub(valor)
    }


    const temNavBar = "#95C093"
    const temaCor = "#3E9242"

    const construirView = () => {
        const barraNavegacao = (
            <BarraNavegacao
                seletorView={selecionarView}
                tema={temNavBar}
                botoes={['Home', 'Clientes', 'Pet', 'Serviços', 'Produtos']}
                botãoSelecionado={tela}
            />
        );

        const subNavBar = (
            <SubNavBar
                seletorView={selecionaSubView}
                tema='#E4E7E4'
                botoes={['Visualizar', 'Cadastrar']}
                botãoSelecionado={telaSub}
            />
        )

        if (tela === 'Clientes') {
            return (
                <>
                    {barraNavegacao}
                    {subNavBar}
                    {telaSub === 'Visualizar' ? (
                        <ListaCliente />
                    ) : (
                        <FormularioCadastroCliente tema={temaCor} />
                    )}
                </>
            );
        } else if (tela === 'Pet') {
            return (
                <>
                    {barraNavegacao}
                    {subNavBar}
                    {telaSub === 'Visualizar' ? (
                        <ListaPets />
                    ) : (
                        <FormularioCadastroPet tema={temaCor} />
                    )}
                </>
            );
        } else if (tela === 'Serviços') {
            return (
                <>
                    {barraNavegacao}
                    {subNavBar}
                    {telaSub === 'Visualizar' ? (
                        <ListaServicos />
                    ) : (
                        <FormularioCadastroServicos tema={temaCor} />
                    )}
                </>
            );
        } else if (tela === 'Produtos') {
            return (
                <>
                    {barraNavegacao}
                    {subNavBar}
                    {telaSub === 'Visualizar' ? (
                        <ListaProdutos />
                    ) : (
                        <FormularioCadastroProdutos tema={temaCor} />
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

    return (
        construirView()
    )
}