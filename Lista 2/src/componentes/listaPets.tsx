import React, { Component, ChangeEvent } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";

interface Cliente {
    id: number;
    nome: string;
}

interface Pet {
    id: number;
    nome: string;
    raca: string;
    genero: string;
    tipo: string;
    dono: number;
}

interface ListaPetsState {
    pets: Pet[];
    clientes: Cliente[];
    showModal: boolean;
    petSelecionado: Pet | null;
}

type FormElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export default class ListaPets extends Component<{}, ListaPetsState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            pets: [
                { id: 1, nome: "Rex", raca: "Labrador", genero: "Macho", tipo: "Cachorro", dono: 1 },
                { id: 2, nome: "Whiskers", raca: "Persa", genero: "Fêmea", tipo: "Gato", dono: 2 },
                { id: 3, nome: "Fido", raca: "Poodle", genero: "Macho", tipo: "Cachorro", dono: 3 },
                { id: 4, nome: "Garfield", raca: "Siames", genero: "Masculino", tipo: "Gato", dono: 4 },
                { id: 5, nome: "Max", raca: "Bulldog", genero: "Macho", tipo: "Cachorro", dono: 5 },
                { id: 6, nome: "Salem", raca: "Preto", genero: "Fêmea", tipo: "Gato", dono: 6 },
            ],
            clientes: [
                { id: 1, nome: "Maria Silva" },
                { id: 2, nome: "João Oliveira" },
                { id: 3, nome: "Ana Santos" },
                { id: 4, nome: "Carlos Pereira" },
                { id: 5, nome: "Luiz Almeida" },
                { id: 6, nome: "Fernanda Costa" },
            ],
            showModal: false,
            petSelecionado: null,
        };
    }


    handleShowModal = (pet: Pet) => {
        const petClone: Pet = { ...pet };
        this.setState({ showModal: true, petSelecionado: petClone });
    }


    handleCloseModal = () => {
        this.setState({ showModal: false, petSelecionado: null });
    }


    handlePetChange = (e: ChangeEvent<FormElement>) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            petSelecionado: prevState.petSelecionado ? {
                ...prevState.petSelecionado,
                [name]: name === "dono" ? Number(value) : value
            } : null
        }));
    }


    handleSavePet = () => {
        const { petSelecionado, pets } = this.state;
        if (petSelecionado) {
            const petsAtualizados = pets.map(pet =>
                pet.id === petSelecionado.id ? petSelecionado : pet
            );
            this.setState({ pets: petsAtualizados, showModal: false, petSelecionado: null });
        }
    }


    handleDeletePet = (id: number) => {
        if (window.confirm("Tem certeza que deseja deletar este pet?")) {
            const { pets } = this.state;
            const petsAtualizados = pets.filter(pet => pet.id !== id);
            this.setState({ pets: petsAtualizados });
        }
    }

    render() {
        const { pets, clientes, showModal, petSelecionado } = this.state;

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
                            {pets.map(pet => (
                                <tr key={pet.id}>
                                    <td>{pet.nome}</td>
                                    <td>{pet.raca}</td>
                                    <td>{pet.genero}</td>
                                    <td>{pet.tipo}</td>
                                    <td>{clientes.find(cliente => cliente.id === pet.dono)?.nome || "Desconhecido"}</td>
                                    <td>
                                        <div className="d-flex flex-wrap justify-content-start gap-2">
                                            <Button
                                                variant="primary"
                                                size="sm"
                                                className="me-2"
                                                onClick={() => this.handleShowModal(pet)}
                                            >
                                                Detalhes
                                            </Button>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => this.handleDeletePet(pet.id)}
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
                                        onChange={this.handlePetChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formRaca">
                                    <Form.Label>Raça</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Raça do Pet"
                                        name="raca"
                                        value={petSelecionado.raca}
                                        onChange={this.handlePetChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formGenero">
                                    <Form.Label>Gênero</Form.Label>
                                    <Form.Select
                                        name="genero"
                                        value={petSelecionado.genero}
                                        onChange={this.handlePetChange}
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
                                        onChange={this.handlePetChange}
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
                                        onChange={this.handlePetChange}
                                    >
                                        <option value="">Selecione o Dono</option>
                                        {clientes.map(cliente => (
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
                        <Button variant="secondary" onClick={this.handleCloseModal}>
                            Cancelar
                        </Button>
                        <Button variant="primary" onClick={this.handleSavePet}>
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