import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";

export default function ListaCliente() {
    // Estado para armazenar clientes
    const [clientes, setClientes] = useState([]);

    // Estado para controlar o modal
    const [showModal, setShowModal] = useState(false);
    const [clienteSelecionado, setClienteSelecionado] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("http://localhost:32831/cliente/clientes", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                });

                const clienteDataArray = await response.json();

                console.log(clienteDataArray);

                const clienteDataArrayFormatted = clienteDataArray.map(cliente => ({
                    id: cliente.id,
                    nome: cliente.nome,
                    nomeSocial: cliente.nomeSocial,
                    cpf: cliente.cpf,
                    email: cliente.email,
                    endereco: cliente.endereco,
                    telefones: cliente.telefones
                }));

                setClientes(clienteDataArrayFormatted);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, []);


    // Função para abrir o modal com os detalhes do cliente
    const handleShowModal = async (cliente) => {
        // Clonar o cliente para evitar mutação direta
        try {
            const response = await fetch(`http://localhost:32831/cliente/${cliente.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
            });

            const clienteSelecionadoApi = await response.json()

            setClienteSelecionado(clienteSelecionadoApi)
        } catch (error) {
            console.error(error)
        }
        const clienteClone = JSON.parse(JSON.stringify(cliente));
        setClienteSelecionado(clienteClone);
        setShowModal(true);
    };

    // Função para fechar o modal e limpar o cliente selecionado
    const handleCloseModal = () => {
        setShowModal(false);
        setClienteSelecionado(null);
    };

    // Função para lidar com mudanças nos inputs de edição do cliente
    const handleClienteChange = (e) => {
        const { name, value } = e.target;
        if (clienteSelecionado) {
            setClienteSelecionado({
                ...clienteSelecionado,
                [name]: value,
            });
        }
    };

    // Função para salvar as alterações do cliente
    const handleSaveCliente = async () => {
        if (clienteSelecionado) {
            const clientesAtualizados = clientes.map(cliente =>
                cliente.id === clienteSelecionado.id ? clienteSelecionado : cliente
            );
            try {
                const response = await fetch("http://localhost:32831/cliente/atualizar", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(clientesAtualizados[clienteSelecionado.id - 1])
                });

                if (response.ok) {
                    alert("Cliente atualizado com sucesso!");
                } else {
                    alert("Erro ao atualizar cliente.");
                }

            } catch (error) {
                console.error(error)
            }
            setClientes(clientesAtualizados);
            handleCloseModal();
        }
    };

    // Função para deletar um cliente
    const handleDeleteCliente = async (id) => {
        if (window.confirm("Tem certeza que deseja deletar este cliente?")) {
            try {
                const response = await fetch("http://localhost:32831/cliente/excluir", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({ id })
                });

                if (response.ok) {
                    alert("Cliente deletado com sucesso!");
                } else {
                    alert("Erro ao deletar cliente.");
                }

            } catch (error) {
                console.error(error)
            }
            const clientesAtualizados = clientes.filter(cliente => cliente.id !== id);
            setClientes(clientesAtualizados);
        }
    };

    const handleEnderecoChange = (field, value) => {
        setClienteSelecionado((prev) => ({
            ...prev,
            endereco: {
                ...prev.endereco,
                [field]: value,
            },
        }));
    };

    const handleTelefoneChange = (index, field, value) => {
        const telefonesAtualizados = [...clienteSelecionado.telefones];
        telefonesAtualizados[index] = { ...telefonesAtualizados[index], [field]: value };
        setClienteSelecionado((prev) => ({ ...prev, telefones: telefonesAtualizados }));
    };

    const handleAdicionarTelefone = () => {
        setClienteSelecionado((prev) => ({
            ...prev,
            telefones: [...prev.telefones, { id: Date.now(), ddd: "", numero: "" }],
        }));
    };

    const handleRemoverTelefone = (index) => {
        setClienteSelecionado((prev) => ({
            ...prev,
            telefones: prev.telefones.filter((_, i) => i !== index),
        }));
    };


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
                                            onClick={() => handleShowModal(cliente)}
                                        >
                                            Detalhes
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleDeleteCliente(cliente.id)}
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
                    <Modal.Title>Detalhes do Cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {clienteSelecionado && (
                        <div>
                            {/* Informações Gerais */}
                            <Form.Group className="mb-3" controlId="formNome">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nome do Cliente"
                                    name="nome"
                                    value={clienteSelecionado.nome || ""}
                                    onChange={handleClienteChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formNomeSocial">
                                <Form.Label>Nome Social</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nome Social do Cliente"
                                    name="nomeSocial"
                                    value={clienteSelecionado.nomeSocial || ""}
                                    onChange={handleClienteChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formCPF">
                                <Form.Label>CPF</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="CPF do Cliente"
                                    name="cpf"
                                    value={clienteSelecionado.cpf || ""}
                                    onChange={handleClienteChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Email do Cliente"
                                    name="email"
                                    value={clienteSelecionado.email || ""}
                                    onChange={handleClienteChange}
                                />
                            </Form.Group>

                            {/* Endereço */}
                            <h5>Endereço</h5>
                            <Form.Group className="mb-3" controlId="formEstado">
                                <Form.Label>Estado</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Estado"
                                    name="endereco.estado"
                                    value={clienteSelecionado.endereco?.estado || ""}
                                    onChange={(e) => handleEnderecoChange("estado", e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formCidade">
                                <Form.Label>Cidade</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Cidade"
                                    name="endereco.cidade"
                                    value={clienteSelecionado.endereco?.cidade || ""}
                                    onChange={(e) => handleEnderecoChange("cidade", e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBairro">
                                <Form.Label>Bairro</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Bairro"
                                    name="endereco.bairro"
                                    value={clienteSelecionado.endereco?.bairro || ""}
                                    onChange={(e) => handleEnderecoChange("bairro", e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formRua">
                                <Form.Label>Rua</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Rua"
                                    name="endereco.rua"
                                    value={clienteSelecionado.endereco?.rua || ""}
                                    onChange={(e) => handleEnderecoChange("rua", e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formNumero">
                                <Form.Label>Número</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Número"
                                    name="endereco.numero"
                                    value={clienteSelecionado.endereco?.numero || ""}
                                    onChange={(e) => handleEnderecoChange("numero", e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formCodigoPostal">
                                <Form.Label>CEP</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Código Postal"
                                    name="endereco.codigoPostal"
                                    value={clienteSelecionado.endereco?.codigoPostal || ""}
                                    onChange={(e) => handleEnderecoChange("codigoPostal", e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formInformacoesAdicionais">
                                <Form.Label>Informações Adicionais</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    placeholder="Informações Adicionais"
                                    name="endereco.informacoesAdicionais"
                                    value={clienteSelecionado.endereco?.informacoesAdicionais || ""}
                                    onChange={(e) => handleEnderecoChange("informacoesAdicionais", e.target.value)}
                                />
                            </Form.Group>

                            {/* Telefones */}
                            <h5>Telefones</h5>
                            {clienteSelecionado.telefones.map((telefone, index) => (
                                <Form.Group key={telefone.id} className="mb-3" controlId={`telefone-${index}`}>
                                    <Form.Label>Telefone {index + 1}</Form.Label>
                                    <div className="d-flex">
                                        <Form.Control
                                            type="text"
                                            placeholder="DDD"
                                            value={telefone.ddd}
                                            onChange={(e) => handleTelefoneChange(index, "ddd", e.target.value)}
                                            style={{ maxWidth: "70px", marginRight: "10px" }}
                                        />
                                        <Form.Control
                                            type="text"
                                            placeholder="Número"
                                            value={telefone.numero}
                                            onChange={(e) => handleTelefoneChange(index, "numero", e.target.value)}
                                        />
                                        <Button
                                            variant="danger"
                                            onClick={() => handleRemoverTelefone(index)}
                                            className="ms-2"
                                        >
                                            Remover
                                        </Button>
                                    </div>
                                </Form.Group>
                            ))}
                            <Button variant="success" onClick={handleAdicionarTelefone}>
                                Adicionar Telefone
                            </Button>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleSaveCliente}>
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
};