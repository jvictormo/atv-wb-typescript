import React, { useState } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";

export default function ListaPets() {
    // Estado para armazenar pets e clientes
    const [pets, setPets] = useState([
        { id: 1, nome: "Rex", raca: "Labrador", genero: "Macho", tipo: "Cachorro", dono: 1 },
        { id: 2, nome: "Whiskers", raca: "Persa", genero: "Fêmea", tipo: "Gato", dono: 2 },
        { id: 3, nome: "Fido", raca: "Poodle", genero: "Macho", tipo: "Cachorro", dono: 3 },
        { id: 4, nome: "Garfield", raca: "Siames", genero: "Masculino", tipo: "Gato", dono: 4 },
        { id: 5, nome: "Max", raca: "Bulldog", genero: "Macho", tipo: "Cachorro", dono: 5 },
        { id: 6, nome: "Salem", raca: "Preto", genero: "Fêmea", tipo: "Gato", dono: 6 },
    ]);
    const [clientes] = useState([
        { id: 1, nome: "Maria Silva" },
        { id: 2, nome: "João Oliveira" },
        { id: 3, nome: "Ana Santos" },
        { id: 4, nome: "Carlos Pereira" },
        { id: 5, nome: "Luiz Almeida" },
        { id: 6, nome: "Fernanda Costa" },
    ]);
    const [showModal, setShowModal] = useState(false);
    const [petSelecionado, setPetSelecionado] = useState(null);

    // Função para abrir o modal com os detalhes do pet
    const handleShowModal = (pet) => {
        setPetSelecionado({ ...pet });
        setShowModal(true);
    };

    // Função para fechar o modal
    const handleCloseModal = () => {
        setShowModal(false);
        setPetSelecionado(null);
    };

    // Função para lidar com mudanças nos inputs do pet
    const handlePetChange = (e) => {
        const { name, value } = e.target;
        setPetSelecionado((prev) => ({
            ...prev,
            [name]: name === "dono" ? Number(value) : value,
        }));
    };

    // Função para salvar as alterações do pet
    const handleSavePet = () => {
        if (petSelecionado) {
            const petsAtualizados = pets.map((pet) =>
                pet.id === petSelecionado.id ? petSelecionado : pet
            );
            setPets(petsAtualizados);
            setShowModal(false);
            setPetSelecionado(null);
        }
    };

    // Função para deletar um pet
    const handleDeletePet = (id) => {
        if (window.confirm("Tem certeza que deseja deletar este pet?")) {
            const petsAtualizados = pets.filter((pet) => pet.id !== id);
            setPets(petsAtualizados);
        }
    };

    return (
        <div className="container-xxl mt-5">
            <div className="table-responsive">
                <Table striped hover bordered className="mx-auto" style={{ width: '80%' }}>
                    <thead className="table-light">
                        <tr>
                            <th>Nome</th>
                            <th>Raça</th>
                            <th>Gênero</th>
                            <th>Tipo</th>
                            <th>Dono</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pets.map((pet) => (
                            <tr key={pet.id}>
                                <td>{pet.nome}</td>
                                <td>{pet.raca}</td>
                                <td>{pet.genero}</td>
                                <td>{pet.tipo}</td>
                                <td>{clientes.find((cliente) => cliente.id === pet.dono)?.nome || "Desconhecido"}</td>
                                <td>
                                    <div className="d-flex flex-wrap justify-content-start gap-2">
                                        <Button
                                            variant="primary"
                                            size="sm"
                                            className="me-2"
                                            onClick={() => handleShowModal(pet)}
                                        >
                                            Detalhes
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleDeletePet(pet.id)}
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

            {/* Modal para edição de pet */}
            <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Detalhes do Pet</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {petSelecionado && (
                        <Form>
                            <Form.Group className="mb-3" controlId="formNome">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nome do Pet"
                                    name="nome"
                                    value={petSelecionado.nome}
                                    onChange={handlePetChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formRaca">
                                <Form.Label>Raça</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Raça do Pet"
                                    name="raca"
                                    value={petSelecionado.raca}
                                    onChange={handlePetChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formGenero">
                                <Form.Label>Gênero</Form.Label>
                                <Form.Select
                                    name="genero"
                                    value={petSelecionado.genero}
                                    onChange={handlePetChange}
                                >
                                    <option value="">Selecione o Gênero</option>
                                    <option value="Macho">Macho</option>
                                    <option value="Fêmea">Fêmea</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formTipo">
                                <Form.Label>Tipo</Form.Label>
                                <Form.Select
                                    name="tipo"
                                    value={petSelecionado.tipo}
                                    onChange={handlePetChange}
                                >
                                    <option value="">Selecione o Tipo</option>
                                    <option value="Cachorro">Cachorro</option>
                                    <option value="Gato">Gato</option>
                                    <option value="Outro">Outro</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formDono">
                                <Form.Label>Dono</Form.Label>
                                <Form.Select
                                    name="dono"
                                    value={petSelecionado.dono}
                                    onChange={handlePetChange}
                                >
                                    <option value="">Selecione o Dono</option>
                                    {clientes.map((cliente) => (
                                        <option key={cliente.id} value={cliente.id}>
                                            {cliente.nome}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleSavePet}>
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