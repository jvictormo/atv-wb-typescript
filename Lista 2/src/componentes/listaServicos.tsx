import React, { Component, ChangeEvent } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";

interface Servico {
    id: number;
    nome: string;
    valor: string;
}

interface ListaServicosState {
    servicos: Servico[];
    showModal: boolean;
    servicoSelecionado: Servico | null;
}

type FormElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export default class ListaServicos extends Component<{}, ListaServicosState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            servicos: [
                { id: 1, nome: "Banho e Tosa", valor: "R$ 80,00" },
                { id: 2, nome: "Vacinação", valor: "R$ 50,00" },
                { id: 3, nome: "Consulta Veterinária", valor: "R$ 100,00" },
                { id: 4, nome: "Tratamento de Pulgas", valor: "R$ 60,00" },
                { id: 5, nome: "Adestramento", valor: "R$ 300,00" },
                { id: 6, nome: "Clínica Geral", valor: "R$ 120,00" },
            ],
            showModal: false,
            servicoSelecionado: null,
        };
    }


    handleShowModal = (servico: Servico) => {
        const servicoClone: Servico = { ...servico };
        this.setState({ showModal: true, servicoSelecionado: servicoClone });
    }


    handleCloseModal = () => {
        this.setState({ showModal: false, servicoSelecionado: null });
    }


    handleServicoChange = (e: ChangeEvent<FormElement>) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            servicoSelecionado: prevState.servicoSelecionado ? {
                ...prevState.servicoSelecionado,
                [name]: value
            } : null
        }));
    }


    handleSaveServico = () => {
        const { servicoSelecionado, servicos } = this.state;
        if (servicoSelecionado) {
        
            if (servicoSelecionado.nome.trim() === "") {
                alert("O nome do serviço não pode estar vazio.");
                return;
            }

        
            const valorRegex = /^R\$\s\d{1,3}(?:\.\d{3})*,\d{2}$/;
            if (!valorRegex.test(servicoSelecionado.valor)) {
                alert("O valor do serviço deve estar no formato 'R$ 0,00'.");
                return;
            }

            const servicosAtualizados = servicos.map(servico =>
                servico.id === servicoSelecionado.id ? servicoSelecionado : servico
            );
            this.setState({ servicos: servicosAtualizados, showModal: false, servicoSelecionado: null });
        }
    }


    handleDeleteServico = (id: number) => {
        if (window.confirm("Tem certeza que deseja deletar este serviço?")) {
            const { servicos } = this.state;
            const servicosAtualizados = servicos.filter(servico => servico.id !== id);
            this.setState({ servicos: servicosAtualizados });
        }
    }

    render() {
        const { servicos, showModal, servicoSelecionado } = this.state;

        return (
            <div className="container-xxl mt-5">
                <div className="table-responsive">
                    <Table striped hover bordered className="mx-auto" style={{ width: '80%' }}>
                        <thead className="table-light">
                            <tr>
                                <th>Serviço</th>
                                <th>Valor</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {servicos.map(servico => (
                                <tr key={servico.id}>
                                    <td>{servico.nome}</td>
                                    <td>{servico.valor}</td>
                                    <td>
                                        <div className="d-flex flex-wrap justify-content-start gap-2">
                                            <Button
                                                variant="primary"
                                                size="sm"
                                                className="me-2"
                                                onClick={() => this.handleShowModal(servico)}
                                            >
                                                Detalhes
                                            </Button>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => this.handleDeleteServico(servico.id)}
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
                        <Modal.Title>Detalhes do Serviço</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {servicoSelecionado && (
                            <Form>
                                <Form.Group className="mb-3" controlId="formNome">
                                    <Form.Label>Serviço</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nome do Serviço"
                                        name="nome"
                                        value={servicoSelecionado.nome}
                                        onChange={this.handleServicoChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formValor">
                                    <Form.Label>Valor</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Valor do Serviço"
                                        name="valor"
                                        value={servicoSelecionado.valor}
                                        onChange={this.handleServicoChange}
                                    />
                                </Form.Group>
                            </Form>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCloseModal}>
                            Cancelar
                        </Button>
                        <Button variant="primary" onClick={this.handleSaveServico}>
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
