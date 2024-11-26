import React, { Component, ChangeEvent } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";

interface Produto {
    id: number;
    nome: string;
    valor: string;
}

interface ListaProdutosState {
    produtos: Produto[];
    showModal: boolean;
    produtoSelecionado: Produto | null;
}

type FormElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export default class ListaProdutos extends Component<{}, ListaProdutosState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            produtos: [
                { id: 1, nome: "Ração para Cachorros", valor: "R$ 120,00" },
                { id: 2, nome: "Ração para Gatos", valor: "R$ 100,00" },
                { id: 3, nome: "Brinquedo para Cachorro", valor: "R$ 30,00" },
                { id: 4, nome: "Brinquedo para Gato", valor: "R$ 25,00" },
                { id: 5, nome: "Shampoo para Pets", valor: "R$ 40,00" },
                { id: 6, nome: "Collar Anti-Pulgas", valor: "R$ 60,00" },
            ],
            showModal: false,
            produtoSelecionado: null,
        };
    }

    handleShowModal = (produto: Produto) => {
        const produtoClone: Produto = { ...produto };
        this.setState({ showModal: true, produtoSelecionado: produtoClone });
    }

    handleCloseModal = () => {
        this.setState({ showModal: false, produtoSelecionado: null });
    }

    handleProdutoChange = (e: ChangeEvent<FormElement>) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            produtoSelecionado: prevState.produtoSelecionado ? {
                ...prevState.produtoSelecionado,
                [name]: value
            } : null
        }));
    }

    handleSaveProduto = () => {
        const { produtoSelecionado, produtos } = this.state;
        if (produtoSelecionado) {
            const produtosAtualizados = produtos.map(produto =>
                produto.id === produtoSelecionado.id ? produtoSelecionado : produto
            );
            this.setState({ produtos: produtosAtualizados, showModal: false, produtoSelecionado: null });
        }
    }

    handleDeleteProduto = (id: number) => {
        if (window.confirm("Tem certeza que deseja deletar este produto?")) {
            const { produtos } = this.state;
            const produtosAtualizados = produtos.filter(produto => produto.id !== id);
            this.setState({ produtos: produtosAtualizados });
        }
    }

    render() {
        const { produtos, showModal, produtoSelecionado } = this.state;

        return (
            <div className="container-xxl mt-5">
                <div className="table-responsive">
                    <Table striped hover bordered className="mx-auto" style={{ width: '80%' }}>
                        <thead className="table-light">
                            <tr>
                                <th>Produto</th>
                                <th>Valor</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {produtos.map(produto => (
                                <tr key={produto.id}>
                                    <td>{produto.nome}</td>
                                    <td>{produto.valor}</td>
                                    <td>
                                        <div className="d-flex flex-wrap justify-content-start gap-2">
                                            <Button
                                                variant="primary"
                                                size="sm"
                                                className="me-2"
                                                onClick={() => this.handleShowModal(produto)}
                                            >
                                                Detalhes
                                            </Button>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => this.handleDeleteProduto(produto.id)}
                                            >
                                                Deletar
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>

                {/* Modal de Detalhes do Produto */}
                <Modal show={showModal} onHide={this.handleCloseModal} centered size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Detalhes do Produto</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {produtoSelecionado && (
                            <Form>
                                <Form.Group className="mb-3" controlId="formNome">
                                    <Form.Label>Produto</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nome do Produto"
                                        name="nome"
                                        value={produtoSelecionado.nome}
                                        onChange={this.handleProdutoChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formValor">
                                    <Form.Label>Valor</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Valor do Produto"
                                        name="valor"
                                        value={produtoSelecionado.valor}
                                        onChange={this.handleProdutoChange}
                                    />
                                </Form.Group>
                            </Form>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCloseModal}>
                            Cancelar
                        </Button>
                        <Button variant="primary" onClick={this.handleSaveProduto}>
                            Salvar
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Estilos Personalizados */}
                <style>{`
                    .table tbody tr:hover {
                        background-color: #ACCCAB;
                        cursor: pointer;
                    }
                `}</style>
            </div>
        );
    }
}
