import React, { useState } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";

export default function ListaServicos () {
    const [servicos, setServicos] = useState([
        { id: 1, nome: "Banho e Tosa", valor: "R$ 80,00" },
        { id: 2, nome: "Vacinação", valor: "R$ 50,00" },
        { id: 3, nome: "Consulta Veterinária", valor: "R$ 100,00" },
        { id: 4, nome: "Tratamento de Pulgas", valor: "R$ 60,00" },
        { id: 5, nome: "Adestramento", valor: "R$ 300,00" },
        { id: 6, nome: "Clínica Geral", valor: "R$ 120,00" },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [servicoSelecionado, setServicoSelecionado] = useState(null);

    const handleShowModal = (servico) => {
        const servicoClone = { ...servico };
        setServicoSelecionado(servicoClone);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setServicoSelecionado(null);
    };

    const handleServicoChange = (e) => {
        const { name, value } = e.target;
        setServicoSelecionado((prevServico) => ({
            ...prevServico,
            [name]: value,
        }));
    };

    const handleSaveServico = () => {
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

            const servicosAtualizados = servicos.map((servico) =>
                servico.id === servicoSelecionado.id ? servicoSelecionado : servico
            );
            setServicos(servicosAtualizados);
            setShowModal(false);
            setServicoSelecionado(null);
        }
    };

    const handleDeleteServico = (id) => {
        if (window.confirm("Tem certeza que deseja deletar este serviço?")) {
            const servicosAtualizados = servicos.filter((servico) => servico.id !== id);
            setServicos(servicosAtualizados);
        }
    };

    return (
        <div className="container-xxl mt-5">
            <div className="table-responsive">
                <Table striped hover bordered className="mx-auto" style={{ width: "80%" }}>
                    <thead className="table-light">
                        <tr>
                            <th>Serviço</th>
                            <th>Valor</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {servicos.map((servico) => (
                            <tr key={servico.id}>
                                <td>{servico.nome}</td>
                                <td>{servico.valor}</td>
                                <td>
                                    <div className="d-flex flex-wrap justify-content-start gap-2">
                                        <Button
                                            variant="primary"
                                            size="sm"
                                            className="me-2"
                                            onClick={() => handleShowModal(servico)}
                                        >
                                            Detalhes
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleDeleteServico(servico.id)}
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

            <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
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
                                    onChange={handleServicoChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formValor">
                                <Form.Label>Valor</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Valor do Serviço"
                                    name="valor"
                                    value={servicoSelecionado.valor}
                                    onChange={handleServicoChange}
                                />
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleSaveServico}>
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
};