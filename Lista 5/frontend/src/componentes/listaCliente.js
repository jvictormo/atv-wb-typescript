import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";
import axios from "axios"

export default function ListaCliente() {
    // Estado para armazenar clientes
    const [clientes, setClientes] = useState([]);

    // Estado para controlar o modal
    const [showModal, setShowModal] = useState(false);
    const [clienteSelecionado, setClienteSelecionado] = useState(null);

    // Listas disponíveis para adicionar
    const [pets, setPets] = useState([])
    const [petsDisponiveis, setPetsDisponiveis] = useState([]);

    const [produtosDisponiveis, setProdutosDisponiveis] = useState([]);

    const [servicosDisponiveis, setServocpsDisponiveis] = useState([]);

    // Estados para armazenar IDs selecionados para adicionar
    const [novoPetId, setNovoPetId] = useState(null);
    const [novoProdutoId, setNovoProdutoId] = useState(null);
    const [novoServicoId, setNovoServicoId] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("http://localhost:32831/customer/get");

                const clienteDataArray = await response.data;

                let clienteDataArrayFormatted = []

                clienteDataArray.forEach(clienteData => {
                    clienteDataArrayFormatted.push({ sequenceIdCustomer: clienteData.sequenceIdCustomer, name: clienteData.name, socialName: clienteData.socialName, cpf: clienteData.cpf, email: clienteData.email })
                });

                setClientes(clienteDataArrayFormatted)
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()
    }, [])

    // Função para abrir o modal com os detalhes do cliente
    const handleShowModal = async (cliente) => {
        // Clonar o cliente para evitar mutação direta
        try {
            const responseCustomer = await axios.get(`http://localhost:32831/customer/${cliente.sequenceIdCustomer}`);
            const clienteSelecionadoApi = await responseCustomer.data;

            clienteSelecionadoApi.pets = clienteSelecionadoApi.pets || [];

            setClienteSelecionado(clienteSelecionadoApi)

            const avaliblePets = await axios.get(`http://localhost:32831/pet/owner`)
            const avaliblePetsfromApi = avaliblePets.data

            setPetsDisponiveis(avaliblePetsfromApi)

            const avalibleProducts = await axios.get(`http://localhost:32831/product/get`)
            const avalibleProductsfromApi = avalibleProducts.data

            setProdutosDisponiveis(avalibleProductsfromApi)

            const avalibleServices = await axios.get(`http://localhost:32831/service/get`)
            const avalibleServicesfromApi = avalibleServices.data

            setServocpsDisponiveis(avalibleServicesfromApi)

            const responsePets = await axios.get(`http://localhost:32831/pet/get`)
            setPets(responsePets.data)
        } catch (error) {
            console.error(error)
        }
        setShowModal(true);
    };

    // Função para fechar o modal e limpar o cliente selecionado
    const handleCloseModal = () => {
        setShowModal(false);
        setClienteSelecionado(null);
        setNovoPetId(null);
        setNovoProdutoId(null);
        setNovoServicoId(null);
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

    // Função para adicionar um pet ao cliente
    const handleAdicionarPet = () => {
        if (clienteSelecionado && novoPetId) {
            // Inicializar `pets` como uma lista vazia, se necessário
            const petsIds = clienteSelecionado.pets || [];

            // Verificar se o ID do pet já foi adicionado
            if (petsIds.includes(novoPetId)) {
                alert("Este pet já foi adicionado!");
                return;
            }

            setClienteSelecionado({
                ...clienteSelecionado,
                pets: [...petsIds, novoPetId],
            });

            // Resetar o ID selecionado
            setNovoPetId(null);
        }
    };


    // Função para adicionar um produto ao cliente
    const handleAdicionarProduto = () => {
        if (clienteSelecionado && novoProdutoId) {
            // Verificar se o produto já foi adicionado
            const produtos = clienteSelecionado.products || [];

            const produtoExistente = produtos.find(produto => produto.sequenceIdProduct === novoProdutoId);
            if (produtoExistente) {
                const produtosAtualizados = produtos.map(produto =>
                    produto.sequenceIdProduct === novoProdutoId
                        ? { ...produto, quantity: produto.quantity + 1 }
                        : produto
                );
                setClienteSelecionado({
                    ...clienteSelecionado,
                    products: produtosAtualizados,
                });
                setNovoProdutoId(null);
                return;
            }

            const produto = produtosDisponiveis.find(produto => produto.sequenceIdProduct === novoProdutoId);
            if (produto) {
                const clienteProduto = { ...produto, quantity: 1 };
                setClienteSelecionado({
                    ...clienteSelecionado,
                    products: [...produtos, clienteProduto],
                });
                setNovoProdutoId(null);
            }
        }
    };

    // Função para adicionar um serviço ao cliente
    const handleAdicionarServico = () => {
        if (clienteSelecionado && novoServicoId) {
            const services = clienteSelecionado.services || [];

            // Verificar se o serviço já foi adicionado
            const servicoExistente = services.find(servico => servico.sequenceIdService === novoServicoId);
            if (servicoExistente) {
                // Incrementar a quantidade
                const servicosAtualizados = services.map(servico =>
                    servico.sequenceIdService === novoServicoId ? { ...servico, quantity: servico.quantity + 1 } : servico
                );
                setClienteSelecionado({
                    ...clienteSelecionado,
                    services: servicosAtualizados,
                });
                setNovoServicoId(null);
                return;
            }

            // Encontrar o serviço selecionado na lista disponível
            const servico = servicosDisponiveis.find(servico => servico.sequenceIdService === novoServicoId);
            if (servico) {
                const clienteServico = { ...servico, quantity: 1 };
                setClienteSelecionado({
                    ...clienteSelecionado,
                    services: [...services, clienteServico],
                });
                setNovoServicoId(null);
            }
        }
    };

    // Funções para incrementar/decrementar quantidade de produtos
    const handleIncrementarProduto = (produtoId) => {
        if (clienteSelecionado) {
            const produtosAtualizados = clienteSelecionado.products.map(produto =>
                produto.sequenceIdProduct === produtoId ? { ...produto, quantity: produto.quantity + 1 } : produto
            );
            setClienteSelecionado({
                ...clienteSelecionado,
                products: produtosAtualizados,
            });
        }
    };

    const handleDecrementarProduto = (produtoId) => {
        if (clienteSelecionado) {
            const produtosAtualizados = clienteSelecionado.products
                .map(produto =>
                    produto.sequenceIdProduct === produtoId ? { ...produto, quantity: produto.quantity - 1 } : produto
                )
                .filter(produto => produto.quantity > 0);
            setClienteSelecionado({
                ...clienteSelecionado,
                products: produtosAtualizados,
            });
        }
    };

    // Funções para incrementar/decrementar quantidade de serviços
    const handleIncrementarServico = (servicoId) => {
        if (clienteSelecionado) {
            const servicosAtualizados = clienteSelecionado.services.map(servico =>
                servico.sequenceIdService === servicoId ? { ...servico, quantity: servico.quantity + 1 } : servico
            );
            setClienteSelecionado({
                ...clienteSelecionado,
                services: servicosAtualizados,
            });
        }
    };

    const handleDecrementarServico = (servicoId) => {
        if (clienteSelecionado) {
            const servicosAtualizados = clienteSelecionado.services
                .map(servico =>
                    servico.sequenceIdService === servicoId ? { ...servico, quantity: servico.quantity - 1 } : servico
                )
                .filter(servico => servico.quantity > 0);
            setClienteSelecionado({
                ...clienteSelecionado,
                services: servicosAtualizados,
            });
        }
    };

    // Função para salvar as alterações do cliente
    const handleSaveCliente = async () => {
        if (clienteSelecionado) {
            const clientesAtualizados = clientes.map(cliente =>
                cliente.sequenceIdCustomer === clienteSelecionado.sequenceIdCustomer ? clienteSelecionado : cliente
            );
            try {
                const response = await axios.put(`http://localhost:32831/customer/update/${clienteSelecionado.sequenceIdCustomer}`, clienteSelecionado);

                if (response.status === 200) {
                    alert("Cliente atualizado com sucesso!");

                    setClientes(clientesAtualizados);
                    handleCloseModal();
                } else {
                    alert("Erro ao atualizar cliente.");
                }

            } catch (error) {
                if (error.status === 409) {
                    let alredyUsed = ""
                    const errorStatusAlredyUsed = error.response.data.error
                    switch (errorStatusAlredyUsed) {
                        case "CPF already registered.":
                            alredyUsed = "CPF"
                            break
                        case "Email already registered.":
                            alredyUsed = "Email"
                            break
                        default:
                            break
                    }
                    alert(`${alredyUsed} já está em uso`)
                } else {
                    alert("Erro ao atualizar o cliente, verifique o console para mais informações.")
                    console.error(error)
                }
            }
        }
    };

    // Função para deletar um cliente
    const handleDeleteCliente = async (sequenceIdCustomer) => {
        if (window.confirm("Tem certeza que deseja deletar este cliente?")) {
            try {
                const response = await axios.delete(`http://localhost:32831/customer/delete/${sequenceIdCustomer}`);

                if (response.status === 200) {
                    alert("Cliente deletado com sucesso!");
                } else {
                    alert("Erro ao deletar cliente.");
                }

            } catch (error) {
                console.error(error)
            }
            const clientesAtualizados = clientes.filter(cliente => cliente.sequenceIdCustomer !== sequenceIdCustomer);
            setClientes(clientesAtualizados);
        }
    };

    const handleRemoverItem = (id, tipo) => {
        if (clienteSelecionado) {
            const updatedCliente = { ...clienteSelecionado };
            
            if (tipo === "products") {
                updatedCliente.products = clienteSelecionado.products.filter(
                    (item) => item.sequenceIdProduct !== id
                );
            } else if (tipo === "service") {
                updatedCliente.services = clienteSelecionado.services.filter(
                    (item) => item.sequenceIdService !== id
                );
            } else if (tipo === "pets") {
                updatedCliente.pets = clienteSelecionado.pets.filter(
                    (item) => item !== id
                );
            }

            setClienteSelecionado(updatedCliente);
        }
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
                            <tr key={cliente.sequenceIdCustomer}>
                                <td>{cliente.name}</td>
                                <td>{cliente.socialName}</td>
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
                                            onClick={() => handleDeleteCliente(cliente.sequenceIdCustomer)}
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
                            {/* Informações do Cliente */}
                            <Form.Group className="mb-3" controlId="formNome">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nome do Cliente"
                                    name="name"
                                    value={clienteSelecionado.name}
                                    onChange={handleClienteChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formNomeSocial">
                                <Form.Label>Nome Social</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nome Social do Cliente"
                                    name="socialName"
                                    value={clienteSelecionado.socialName}
                                    onChange={handleClienteChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formCPF">
                                <Form.Label>CPF</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="CPF do Cliente"
                                    name="cpf"
                                    value={clienteSelecionado.cpf}
                                    onChange={handleClienteChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Email do Cliente"
                                    name="email"
                                    value={clienteSelecionado.email}
                                    onChange={handleClienteChange}
                                />
                            </Form.Group>
                            <hr />

                            {/* Adicionar Pet */}
                            <Form.Group className="mb-3" controlId="formPet">
                                <Form.Label>Adicionar Pet</Form.Label>
                                <Form.Select
                                    value={novoPetId ?? ""}
                                    onChange={(e) => setNovoPetId(Number(e.target.value))}
                                >
                                    <option value="">Selecione um Pet</option>
                                    {petsDisponiveis.map(pet => (
                                        <option key={pet.sequenceIdPet} value={pet.sequenceIdPet}>
                                            {pet.name}
                                        </option>
                                    ))}
                                </Form.Select>
                                <Button
                                    variant="success"
                                    className="mt-2"
                                    onClick={handleAdicionarPet}
                                    disabled={!novoPetId}
                                >
                                    Adicionar Pet
                                </Button>
                            </Form.Group>

                            {/* Adicionar Produto */}
                            <Form.Group className="mb-3" controlId="formProduto">
                                <Form.Label>Adicionar Produto</Form.Label>
                                <Form.Select
                                    value={novoProdutoId ?? ""}
                                    onChange={(e) => setNovoProdutoId(Number(e.target.value))}
                                >
                                    <option value="">Selecione um Produto</option>
                                    {produtosDisponiveis.map(produto => (
                                        <option key={produto.sequenceIdProduct} value={produto.sequenceIdProduct}>
                                            {produto.name}
                                        </option>
                                    ))}
                                </Form.Select>
                                <Button
                                    variant="success"
                                    className="mt-2"
                                    onClick={handleAdicionarProduto}
                                    disabled={!novoProdutoId}
                                >
                                    Adicionar Produto
                                </Button>
                            </Form.Group>

                            {/* Adicionar Serviço */}
                            <Form.Group className="mb-3" controlId="formServico">
                                <Form.Label>Adicionar Serviço</Form.Label>
                                <Form.Select
                                    value={novoServicoId ?? ""}
                                    onChange={(e) => setNovoServicoId(Number(e.target.value))}
                                >
                                    <option value="">Selecione um Serviço</option>
                                    {servicosDisponiveis.map(servico => (
                                        <option key={servico.sequenceIdService} value={servico.sequenceIdService}>
                                            {servico.name}
                                        </option>
                                    ))}
                                </Form.Select>
                                <Button
                                    variant="success"
                                    className="mt-2"
                                    onClick={handleAdicionarServico}
                                    disabled={!novoServicoId}
                                >
                                    Adicionar Serviço
                                </Button>
                            </Form.Group>

                            {/* Lista de Pets do Cliente */}
                            {clienteSelecionado?.pets?.length > 0 && (
                                <div className="mt-4">
                                    <h5>Pets</h5>
                                    <ul className="list-group">
                                        {clienteSelecionado.pets.map(pet => (
                                            <li key={pet} className="list-group-item d-flex justify-content-between align-items-center">
                                                {pets.find((petApi) => petApi.sequenceIdPet === pet)?.name}
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => handleRemoverItem(pet, "pets")}
                                                >
                                                    Remover
                                                </Button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Lista de Produtos do Cliente */}
                            {clienteSelecionado?.products?.length > 0 && (
                                <div className="mt-4">
                                    <h5>Produtos</h5>
                                    <ul className="list-group">
                                        {clienteSelecionado.products.map(produto => (
                                            <li key={produto.sequenceIdProduct} className="list-group-item d-flex justify-content-between align-items-center">
                                                <div>
                                                    {produto.name}
                                                    <span className="badge bg-secondary ms-2">Quantidade: {produto.quantity}</span>
                                                </div>
                                                <div>
                                                    <Button
                                                        variant="success"
                                                        size="sm"
                                                        className="me-2"
                                                        onClick={() => handleIncrementarProduto(produto.sequenceIdProduct)}
                                                    >
                                                        +
                                                    </Button>
                                                    <Button
                                                        variant="warning"
                                                        size="sm"
                                                        className="me-2"
                                                        onClick={() => handleDecrementarProduto(produto.sequenceIdProduct)}
                                                    >
                                                        -
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={() => handleRemoverItem(produto.sequenceIdProduct, "products")}
                                                    >
                                                        Remover
                                                    </Button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Lista de Serviços do Cliente */}
                            {clienteSelecionado?.services?.length > 0 && (
                                <div className="mt-4">
                                    <h5>Serviços</h5>
                                    <ul className="list-group">
                                        {clienteSelecionado.services.map(servico => (
                                            <li key={servico.sequenceIdService} className="list-group-item d-flex justify-content-between align-items-center">
                                                <div>
                                                    {servico.name}
                                                    <span className="badge bg-secondary ms-2">Quantidade: {servico.quantity}</span>
                                                </div>
                                                <div>
                                                    <Button
                                                        variant="success"
                                                        size="sm"
                                                        className="me-2"
                                                        onClick={() => handleIncrementarServico(servico.sequenceIdService)}
                                                    >
                                                        +
                                                    </Button>
                                                    <Button
                                                        variant="warning"
                                                        size="sm"
                                                        className="me-2"
                                                        onClick={() => handleDecrementarServico(servico.sequenceIdService)}
                                                    >
                                                        -
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={() => handleRemoverItem(servico.sequenceIdService, "service")}
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