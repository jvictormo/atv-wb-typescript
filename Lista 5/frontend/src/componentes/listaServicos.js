import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Table, InputGroup } from "react-bootstrap";
import axios from "axios"

export default function ListaServicos() {
    const [servicos, setServicos] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [servicoSelecionado, setServicoSelecionado] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get("http://localhost:32831/service/get")

            setServicos(response.data)

        }

        fetchData()
    }, [])

    const handleShowModal = async (servico) => {
        try {
            const response = await axios.get(`http://localhost:32831/service/${servico.sequenceIdService}`)

            const serviceSelecionadoApi = await response.data;

            setServicoSelecionado(serviceSelecionadoApi)
        } catch (error) {
            console.error(error)
            setServicoSelecionado({ ...servico });
        } finally {
            setShowModal(true);
        }
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

    const handleSaveServico = async () => {
        if (servicoSelecionado) {
            if (servicoSelecionado.name.trim() === "") {
                alert("O nome do serviço não pode estar vazio.");
                return;
            }

            const servicoAtualizado = servicos.map((servico) =>
                servico.sequenceIdService === servicoSelecionado.sequenceIdService ? servicoSelecionado : servico
            );

            try {
                const response = await axios.put(`http://localhost:32831/service/update/${servicoSelecionado.sequenceIdService}`, servicoSelecionado)

                if (response.status === 200) {
                    alert("Serviço atualizado com sucesso!");

                    setServicos(servicoAtualizado);
                    handleCloseModal();
                } else {
                    alert("Erro ao atualizar serviço.");
                }

            } catch (error) {
                alert("Erro ao atualizar o serviço, verifique o console para mais informações.")
                console.error(error)
            }
            setServicoSelecionado(null);
        }
    };

    const handleDeleteServico = async (sequenceIdService) => {
        if (window.confirm("Tem certeza que deseja deletar este serviço?")) {
            const servicosAtualizados = servicos.filter((servico) => servico.sequenceIdService !== sequenceIdService);

            try {
                const response = await axios.delete(`http://localhost:32831/service/delete/${sequenceIdService}`)

                if (response.status === 200) {
                    alert("Cliente deletado com sucesso!");
                } else {
                    alert("Erro ao deletar cliente.");
                }
            } catch (error) {
                alert("Erro ao deletar serviço, verifique o console para mais informaçoes.")
                console.error(error)
            }

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
                            <tr key={servico.sequenceIdService}>
                                <td>{servico.name}</td>
                                <td>R$ {servico.price}</td>
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
                                            onClick={() => handleDeleteServico(servico.sequenceIdService)}
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
                                    name="name"
                                    value={servicoSelecionado.name}
                                    onChange={handleServicoChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formValor">
                                <Form.Label>Valor</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text>R$</InputGroup.Text>
                                    <Form.Control
                                        type="number"
                                        placeholder="Valor do Serviço"
                                        name="price"
                                        value={servicoSelecionado.price}
                                        onChange={handleServicoChange}
                                    />
                                </InputGroup>
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