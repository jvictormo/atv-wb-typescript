import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";
import axios from "axios"

export default function ListaPets() {
    // Estado para armazenar pets e clientes
    const [pets, setPets] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [petSelecionado, setPetSelecionado] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const responsePets = await axios.get("http://localhost:32831/pet/get");
                const petDataArray = await responsePets.data;

                let petDataArrayFormatted = []
                petDataArray.forEach(petData => {
                    petDataArrayFormatted.push({ sequenceIdPet: petData.sequenceIdPet, name: petData.name, breed: petData.breed, gender: petData.gender, petType: petData.petType, owner: petData.owner })
                });

                setPets(petDataArrayFormatted)

                const responseClientes = await axios.get("http://localhost:32831/customer/get")

                setClientes(responseClientes.data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()
    }, [])

    // Função para abrir o modal com os detalhes do pet
    const handleShowModal = async (pet) => {
        try {
            const response = await axios.get(`http://localhost:32831/pet/${pet.sequenceIdPet}`)

            const petSelecionadoApi = await response.data;

            setPetSelecionado(petSelecionadoApi)
        } catch (error) {
            console.error(error)
            setPetSelecionado({ ...pet });
        } finally {
            setShowModal(true);
        }
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
            [name]: name === "owner" ? Number(value) : value,
        }));
    };

    // Função para salvar as alterações do pet
    const handleSavePet = async () => {
        if (petSelecionado) {
            const petsAtualizados = pets.map((pet) =>
                pet.sequenceIdPet === petSelecionado.sequenceIdPet ? petSelecionado : pet
            );
            try {
                const response = await axios.put(`http://localhost:32831/pet/update/${petSelecionado.sequenceIdPet}`, petSelecionado);

                if (response.status === 200) {
                    alert("Pet atualizado com sucesso!");

                    setPets(petsAtualizados);
                    handleCloseModal();
                } else {
                    alert("Erro ao atualizar pet.");
                }

            } catch (error) {

                if (error.status === 404) {
                    let notFound = ""
                    const errorStatusNotFound = error.response.data.error
                    switch (errorStatusNotFound) {
                        case "Customer not found.":
                            notFound = "Cliente"
                            break
                        case "Pet not found.":
                            notFound = "Pet"
                            break
                        default:
                            break
                    }
                    alert(`${notFound} não encontrado`)
                } else {
                    alert("Erro ao atualizar o pet, verifique o console para mais informações.")
                    console.error(error)
                }
            }
            setPets(petsAtualizados);
            setShowModal(false);
            setPetSelecionado(null);
        }
    };

    // Função para deletar um pet
    const handleDeletePet = async (sequenceIdPet) => {
        if (window.confirm("Tem certeza que deseja deletar este pet?")) {
            try {
                const response = await axios.delete(`http://localhost:32831/pet/delete/${sequenceIdPet}`);

                if (response.status === 200) {
                    alert("Pet deletado com sucesso!");
                } else {
                    alert("Erro ao deletar pet.");
                }

            } catch (error) {
                console.error(error)
            }
            const petsAtualizados = pets.filter((pet) => pet.sequenceIdPet !== sequenceIdPet);
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
                            <tr key={pet.sequenceIdPet}>
                                <td>{pet.name}</td>
                                <td>{pet.breed}</td>
                                <td>{pet.gender}</td>
                                <td>{pet.petType}</td>
                                <td>{pet.owner
                                    ? clientes.find((cliente) => cliente.sequenceIdCustomer === pet.owner)?.name || "Desconhecido"
                                    : "Não tem"}</td>
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
                                            onClick={() => handleDeletePet(pet.sequenceIdPet)}
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
                                    name="name"
                                    value={petSelecionado.name}
                                    onChange={handlePetChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formRaca">
                                <Form.Label>Raça</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Raça do Pet"
                                    name="breed"
                                    value={petSelecionado.breed}
                                    onChange={handlePetChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formGenero">
                                <Form.Label>Gênero</Form.Label>
                                <Form.Select
                                    name="gender"
                                    value={petSelecionado.gender}
                                    onChange={handlePetChange}
                                >
                                    <option value="">Selecione o Gênero</option>
                                    <option value="Macho">Macho</option>
                                    <option value="Fêmea">Fêmea</option>
                                    <option value="Fêmea">Outro</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formTipo">
                                <Form.Label>Tipo</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Raça do Pet"
                                    name="petType"
                                    value={petSelecionado.petType}
                                    onChange={handlePetChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formDono">
                                <Form.Label>Dono</Form.Label>
                                <Form.Select
                                    name="owner"
                                    value={petSelecionado.owner}
                                    onChange={handlePetChange}
                                >
                                    <option defaultValue={0}>Selecione o Dono</option>
                                    {clientes.map((cliente) => (
                                        <option key={cliente.sequenceIdCustomer} value={cliente.sequenceIdCustomer}>
                                            {cliente.name}
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