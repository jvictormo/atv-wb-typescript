import React, { Component, ChangeEvent } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";

interface Pet {
    id: number;
    nome: string;
}

interface Produto {
    id: number;
    nome: string;
}

interface Servico {
    id: number;
    nome: string;
}

interface ClienteProduto extends Produto {
    quantidade: number;
}

interface ClienteServico extends Servico {
    quantidade: number;
}

interface Cliente {
    id: number;
    nome: string;
    nomeSocial: string;
    cpf: string;
    pets: Pet[];
    produtos: ClienteProduto[];
    servicos: ClienteServico[];
}

interface ListaClienteState {
    clientes: Cliente[];
    showModal: boolean;
    clienteSelecionado: Cliente | null;
    petsDisponiveis: Pet[];
    produtosDisponiveis: Produto[];
    servicosDisponiveis: Servico[];
    novoPetId: number | null;
    novoProdutoId: number | null;
    novoServicoId: number | null;
}

export default class ListaCliente extends Component<{}, ListaClienteState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            clientes: [
                { id: 1, nome: "Maria Silva", nomeSocial: "Mariana", cpf: "123.456.789-00", pets: [], produtos: [], servicos: [] },
                { id: 2, nome: "João Oliveira", nomeSocial: "João", cpf: "987.654.321-00", pets: [], produtos: [], servicos: [] },
                { id: 3, nome: "Ana Santos", nomeSocial: "Ana", cpf: "456.789.123-00", pets: [], produtos: [], servicos: [] },
                { id: 4, nome: "Carlos Pereira", nomeSocial: "Carlos", cpf: "321.654.987-00", pets: [], produtos: [], servicos: [] },
                { id: 5, nome: "Luiz Almeida", nomeSocial: "Luiz", cpf: "789.123.456-00", pets: [], produtos: [], servicos: [] },
                { id: 6, nome: "Fernanda Costa", nomeSocial: "Fê", cpf: "654.321.098-00", pets: [], produtos: [], servicos: [] },
            ],
            showModal: false,
            clienteSelecionado: null,
            petsDisponiveis: [
                { id: 1, nome: "Rex" },
                { id: 2, nome: "Fido" },
                { id: 3, nome: "Bella" },
            ],
            produtosDisponiveis: [
                { id: 1, nome: "Ração Premium" },
                { id: 2, nome: "Brinquedo de Corda" },
                { id: 3, nome: "Shampoo Pet" },
            ],
            servicosDisponiveis: [
                { id: 1, nome: "Banho" },
                { id: 2, nome: "Tosa" },
                { id: 3, nome: "Consulta Veterinária" },
            ],
            novoPetId: null,
            novoProdutoId: null,
            novoServicoId: null,
        };
    }


    handleShowModal = (cliente: Cliente) => {
    
        const clienteClone: Cliente = JSON.parse(JSON.stringify(cliente));
        this.setState({ showModal: true, clienteSelecionado: clienteClone });
    }


    handleCloseModal = () => {
        this.setState({
            showModal: false,
            clienteSelecionado: null,
            novoPetId: null,
            novoProdutoId: null,
            novoServicoId: null,
        });
    }


    handleClienteChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            clienteSelecionado: prevState.clienteSelecionado ? {
                ...prevState.clienteSelecionado,
                [name]: value
            } : null
        }));
    }


    handleAdicionarPet = () => {
        const { novoPetId, clienteSelecionado, petsDisponiveis } = this.state;
        if (clienteSelecionado && novoPetId) {
        
            const petExistente = clienteSelecionado.pets.find(pet => pet.id === novoPetId);
            if (petExistente) {
                alert("Este pet já foi adicionado!");
                return;
            }

            const pet = petsDisponiveis.find(pet => pet.id === novoPetId);
            if (pet) {
                this.setState(prevState => ({
                    clienteSelecionado: {
                        ...prevState.clienteSelecionado!,
                        pets: [...prevState.clienteSelecionado!.pets, pet]
                    },
                    novoPetId: null
                }));
            }
        }
    }


    handleAdicionarProduto = () => {
        const { novoProdutoId, clienteSelecionado, produtosDisponiveis } = this.state;
        if (clienteSelecionado && novoProdutoId) {
        
            const produtoExistente = clienteSelecionado.produtos.find(produto => produto.id === novoProdutoId);
            if (produtoExistente) {
            
                this.setState(prevState => ({
                    clienteSelecionado: {
                        ...prevState.clienteSelecionado!,
                        produtos: prevState.clienteSelecionado!.produtos.map(produto =>
                            produto.id === novoProdutoId
                                ? { ...produto, quantidade: produto.quantidade + 1 }
                                : produto
                        )
                    },
                    novoProdutoId: null
                }));
                return;
            }

            const produto = produtosDisponiveis.find(produto => produto.id === novoProdutoId);
            if (produto) {
                const clienteProduto: ClienteProduto = { ...produto, quantidade: 1 };
                this.setState(prevState => ({
                    clienteSelecionado: {
                        ...prevState.clienteSelecionado!,
                        produtos: [...prevState.clienteSelecionado!.produtos, clienteProduto]
                    },
                    novoProdutoId: null
                }));
            }
        }
    }


    handleAdicionarServico = () => {
        const { novoServicoId, clienteSelecionado, servicosDisponiveis } = this.state;
        if (clienteSelecionado && novoServicoId) {
        
            const servicoExistente = clienteSelecionado.servicos.find(servico => servico.id === novoServicoId);
            if (servicoExistente) {
            
                this.setState(prevState => ({
                    clienteSelecionado: {
                        ...prevState.clienteSelecionado!,
                        servicos: prevState.clienteSelecionado!.servicos.map(servico =>
                            servico.id === novoServicoId
                                ? { ...servico, quantidade: servico.quantidade + 1 }
                                : servico
                        )
                    },
                    novoServicoId: null
                }));
                return;
            }

            const servico = servicosDisponiveis.find(servico => servico.id === novoServicoId);
            if (servico) {
                const clienteServico: ClienteServico = { ...servico, quantidade: 1 };
                this.setState(prevState => ({
                    clienteSelecionado: {
                        ...prevState.clienteSelecionado!,
                        servicos: [...prevState.clienteSelecionado!.servicos, clienteServico]
                    },
                    novoServicoId: null
                }));
            }
        }
    }


    handleIncrementarProduto = (produtoId: number) => {
        this.setState(prevState => ({
            clienteSelecionado: {
                ...prevState.clienteSelecionado!,
                produtos: prevState.clienteSelecionado!.produtos.map(produto =>
                    produto.id === produtoId
                        ? { ...produto, quantidade: produto.quantidade + 1 }
                        : produto
                )
            }
        }));
    }

    handleDecrementarProduto = (produtoId: number) => {
        this.setState(prevState => ({
            clienteSelecionado: {
                ...prevState.clienteSelecionado!,
                produtos: prevState.clienteSelecionado!.produtos
                    .map(produto =>
                        produto.id === produtoId
                            ? { ...produto, quantidade: produto.quantidade - 1 }
                            : produto
                    )
                    .filter(produto => produto.quantidade > 0)
            }
        }));
    }


    handleIncrementarServico = (servicoId: number) => {
        this.setState(prevState => ({
            clienteSelecionado: {
                ...prevState.clienteSelecionado!,
                servicos: prevState.clienteSelecionado!.servicos.map(servico =>
                    servico.id === servicoId
                        ? { ...servico, quantidade: servico.quantidade + 1 }
                        : servico
                )
            }
        }));
    }

    handleDecrementarServico = (servicoId: number) => {
        this.setState(prevState => ({
            clienteSelecionado: {
                ...prevState.clienteSelecionado!,
                servicos: prevState.clienteSelecionado!.servicos
                    .map(servico =>
                        servico.id === servicoId
                            ? { ...servico, quantidade: servico.quantidade - 1 }
                            : servico
                    )
                    .filter(servico => servico.quantidade > 0)
            }
        }));
    }


    handleSaveCliente = () => {
        const { clienteSelecionado, clientes } = this.state;
        if (clienteSelecionado) {
            const clientesAtualizados = clientes.map(cliente =>
                cliente.id === clienteSelecionado.id ? clienteSelecionado : cliente
            );
            this.setState({ clientes: clientesAtualizados, showModal: false, clienteSelecionado: null });
        }
    }


    handleDeleteCliente = (id: number) => {
        if (window.confirm("Tem certeza que deseja deletar este cliente?")) {
            const { clientes } = this.state;
            const clientesAtualizados = clientes.filter(cliente => cliente.id !== id);
            this.setState({ clientes: clientesAtualizados });
        }
    }


    handleRemoverItem = (id: number, tipo: "pets" | "produtos" | "servicos") => {
        const { clienteSelecionado } = this.state;
        if (clienteSelecionado) {
            const updatedCliente = {
                ...clienteSelecionado,
                [tipo]: clienteSelecionado[tipo].filter((item: any) => item.id !== id)
            };
            this.setState({ clienteSelecionado: updatedCliente });
        }
    }

    render() {
        const { clientes, showModal, clienteSelecionado, petsDisponiveis, produtosDisponiveis, servicosDisponiveis, novoPetId, novoProdutoId, novoServicoId } = this.state;

        return (
            <div className="container-xxl mt-5">
                <div className="table-responsive">
                    <Table striped hover bordered className="mx-auto" style={{ width: '80%' }}>
                        <thead className="table-light">
                            <tr>
                                <th>Nome</th>
                                <th>Nome Social</th>
                                <th>CPF</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientes.map(cliente => (
                                <tr key={cliente.id}>
                                    <td>{cliente.nome}</td>
                                    <td>{cliente.nomeSocial}</td>
                                    <td>{cliente.cpf}</td>
                                    <td>
                                        <div className="d-flex flex-wrap justify-content-start gap-2">
                                            <Button
                                                variant="primary"
                                                size="sm"
                                                className="me-2"
                                                onClick={() => this.handleShowModal(cliente)}
                                            >
                                                Detalhes
                                            </Button>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => this.handleDeleteCliente(cliente.id)}
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
                <Modal show={showModal} onHide={this.handleCloseModal} centered size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Detalhes do Cliente</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {clienteSelecionado && (
                            <div>
                                <Form.Group className="mb-3" controlId="formNome">
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nome do Cliente"
                                        name="nome"
                                        value={clienteSelecionado.nome}
                                        onChange={this.handleClienteChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formNomeSocial">
                                    <Form.Label>Nome Social</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nome Social do Cliente"
                                        name="nomeSocial"
                                        value={clienteSelecionado.nomeSocial}
                                        onChange={this.handleClienteChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formCPF">
                                    <Form.Label>CPF</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="CPF do Cliente"
                                        name="cpf"
                                        value={clienteSelecionado.cpf}
                                        onChange={this.handleClienteChange}
                                    />
                                </Form.Group>
                                <hr />
                                <Form.Group className="mb-3" controlId="formPet">
                                    <Form.Label>Adicionar Pet</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={novoPetId || ""}
                                        onChange={(e) => this.setState({ novoPetId: Number(e.target.value) })}
                                    >
                                        <option value="">Selecione um Pet</option>
                                        {petsDisponiveis.map(pet => (
                                            <option key={pet.id} value={pet.id}>
                                                {pet.nome}
                                            </option>
                                        ))}
                                    </Form.Control>
                                    <Button
                                        variant="success"
                                        className="mt-2"
                                        onClick={this.handleAdicionarPet}
                                    >
                                        Adicionar Pet
                                    </Button>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formProduto">
                                    <Form.Label>Adicionar Produto</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={novoProdutoId || ""}
                                        onChange={(e) => this.setState({ novoProdutoId: Number(e.target.value) })}
                                    >
                                        <option value="">Selecione um Produto</option>
                                        {produtosDisponiveis.map(produto => (
                                            <option key={produto.id} value={produto.id}>
                                                {produto.nome}
                                            </option>
                                        ))}
                                    </Form.Control>
                                    <Button
                                        variant="success"
                                        className="mt-2"
                                        onClick={this.handleAdicionarProduto}
                                    >
                                        Adicionar Produto
                                    </Button>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formServico">
                                    <Form.Label>Adicionar Serviço</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={novoServicoId || ""}
                                        onChange={(e) => this.setState({ novoServicoId: Number(e.target.value) })}
                                    >
                                        <option value="">Selecione um Serviço</option>
                                        {servicosDisponiveis.map(servico => (
                                            <option key={servico.id} value={servico.id}>
                                                {servico.nome}
                                            </option>
                                        ))}
                                    </Form.Control>
                                    <Button
                                        variant="success"
                                        className="mt-2"
                                        onClick={this.handleAdicionarServico}
                                    >
                                        Adicionar Serviço
                                    </Button>
                                </Form.Group>
                                {clienteSelecionado.pets.length > 0 && (
                                    <div className="mt-4">
                                        <h5>Pets</h5>
                                        <ul className="list-group">
                                            {clienteSelecionado.pets.map(pet => (
                                                <li key={pet.id} className="list-group-item d-flex justify-content-between align-items-center">
                                                    {pet.nome}
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={() => this.handleRemoverItem(pet.id, "pets")}
                                                    >
                                                        Remover
                                                    </Button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {clienteSelecionado.produtos.length > 0 && (
                                    <div className="mt-4">
                                        <h5>Produtos</h5>
                                        <ul className="list-group">
                                            {clienteSelecionado.produtos.map(produto => (
                                                <li key={produto.id} className="list-group-item d-flex justify-content-between align-items-center">
                                                    <div>
                                                        {produto.nome} 
                                                        <span className="badge bg-secondary ms-2">Quantidade: {produto.quantidade}</span>
                                                    </div>
                                                    <div>
                                                        <Button
                                                            variant="success"
                                                            size="sm"
                                                            className="me-2"
                                                            onClick={() => this.handleIncrementarProduto(produto.id)}
                                                        >
                                                            +
                                                        </Button>
                                                        <Button
                                                            variant="warning"
                                                            size="sm"
                                                            className="me-2"
                                                            onClick={() => this.handleDecrementarProduto(produto.id)}
                                                        >
                                                            -
                                                        </Button>
                                                        <Button
                                                            variant="danger"
                                                            size="sm"
                                                            onClick={() => this.handleRemoverItem(produto.id, "produtos")}
                                                        >
                                                            Remover
                                                        </Button>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {clienteSelecionado.servicos.length > 0 && (
                                    <div className="mt-4">
                                        <h5>Serviços</h5>
                                        <ul className="list-group">
                                            {clienteSelecionado.servicos.map(servico => (
                                                <li key={servico.id} className="list-group-item d-flex justify-content-between align-items-center">
                                                    <div>
                                                        {servico.nome} 
                                                        <span className="badge bg-secondary ms-2">Quantidade: {servico.quantidade}</span>
                                                    </div>
                                                    <div>
                                                        <Button
                                                            variant="success"
                                                            size="sm"
                                                            className="me-2"
                                                            onClick={() => this.handleIncrementarServico(servico.id)}
                                                        >
                                                            +
                                                        </Button>
                                                        <Button
                                                            variant="warning"
                                                            size="sm"
                                                            className="me-2"
                                                            onClick={() => this.handleDecrementarServico(servico.id)}
                                                        >
                                                            -
                                                        </Button>
                                                        <Button
                                                            variant="danger"
                                                            size="sm"
                                                            onClick={() => this.handleRemoverItem(servico.id, "servicos")}
                                                        >
                                                            Remover
                                                        </Button>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCloseModal}>
                            Cancelar
                        </Button>
                        <Button variant="primary" onClick={this.handleSaveCliente}>
                            Salvar
                        </Button>
                    </Modal.Footer>
                </Modal>
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
