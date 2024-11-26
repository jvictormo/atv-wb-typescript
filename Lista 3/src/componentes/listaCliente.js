import React, { useState } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";

export default function ListaCliente () {
    // Estado para armazenar clientes
    const [clientes, setClientes] = useState([
        { id: 1, nome: "Maria Silva", nomeSocial: "Mariana", cpf: "123.456.789-00", pets: [], produtos: [], servicos: [] },
        { id: 2, nome: "João Oliveira", nomeSocial: "João", cpf: "987.654.321-00", pets: [], produtos: [], servicos: [] },
        { id: 3, nome: "Ana Santos", nomeSocial: "Ana", cpf: "456.789.123-00", pets: [], produtos: [], servicos: [] },
        { id: 4, nome: "Carlos Pereira", nomeSocial: "Carlos", cpf: "321.654.987-00", pets: [], produtos: [], servicos: [] },
        { id: 5, nome: "Luiz Almeida", nomeSocial: "Luiz", cpf: "789.123.456-00", pets: [], produtos: [], servicos: [] },
        { id: 6, nome: "Fernanda Costa", nomeSocial: "Fê", cpf: "654.321.098-00", pets: [], produtos: [], servicos: [] },
    ]);

    // Estado para controlar o modal
    const [showModal, setShowModal] = useState(false);
    const [clienteSelecionado, setClienteSelecionado] = useState(null);

    // Listas disponíveis para adicionar
    const [petsDisponiveis] = useState([
        { id: 1, nome: "Rex" },
        { id: 2, nome: "Fido" },
        { id: 3, nome: "Bella" },
    ]);

    const [produtosDisponiveis] = useState([
        { id: 1, nome: "Ração Premium" },
        { id: 2, nome: "Brinquedo de Corda" },
        { id: 3, nome: "Shampoo Pet" },
    ]);

    const [servicosDisponiveis] = useState([
        { id: 1, nome: "Banho" },
        { id: 2, nome: "Tosa" },
        { id: 3, nome: "Consulta Veterinária" },
    ]);

    // Estados para armazenar IDs selecionados para adicionar
    const [novoPetId, setNovoPetId] = useState(null);
    const [novoProdutoId, setNovoProdutoId] = useState(null);
    const [novoServicoId, setNovoServicoId] = useState(null);

    // Função para abrir o modal com os detalhes do cliente
    const handleShowModal = (cliente) => {
        // Clonar o cliente para evitar mutação direta
        const clienteClone = JSON.parse(JSON.stringify(cliente));
        setClienteSelecionado(clienteClone);
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
            // Verificar se o pet já foi adicionado
            const petExistente = clienteSelecionado.pets.find(pet => pet.id === novoPetId);
            if (petExistente) {
                alert("Este pet já foi adicionado!");
                return;
            }

            // Encontrar o pet selecionado na lista disponível
            const pet = petsDisponiveis.find(pet => pet.id === novoPetId);
            if (pet) {
                setClienteSelecionado({
                    ...clienteSelecionado,
                    pets: [...clienteSelecionado.pets, pet],
                });
                setNovoPetId(null);
            }
        }
    };

    // Função para adicionar um produto ao cliente
    const handleAdicionarProduto = () => {
        if (clienteSelecionado && novoProdutoId) {
            // Verificar se o produto já foi adicionado
            const produtoExistente = clienteSelecionado.produtos.find(produto => produto.id === novoProdutoId);
            if (produtoExistente) {
                // Incrementar a quantidade
                const produtosAtualizados = clienteSelecionado.produtos.map(produto =>
                    produto.id === novoProdutoId ? { ...produto, quantidade: produto.quantidade + 1 } : produto
                );
                setClienteSelecionado({
                    ...clienteSelecionado,
                    produtos: produtosAtualizados,
                });
                setNovoProdutoId(null);
                return;
            }

            // Encontrar o produto selecionado na lista disponível
            const produto = produtosDisponiveis.find(produto => produto.id === novoProdutoId);
            if (produto) {
                const clienteProduto = { ...produto, quantidade: 1 };
                setClienteSelecionado({
                    ...clienteSelecionado,
                    produtos: [...clienteSelecionado.produtos, clienteProduto],
                });
                setNovoProdutoId(null);
            }
        }
    };

    // Função para adicionar um serviço ao cliente
    const handleAdicionarServico = () => {
        if (clienteSelecionado && novoServicoId) {
            // Verificar se o serviço já foi adicionado
            const servicoExistente = clienteSelecionado.servicos.find(servico => servico.id === novoServicoId);
            if (servicoExistente) {
                // Incrementar a quantidade
                const servicosAtualizados = clienteSelecionado.servicos.map(servico =>
                    servico.id === novoServicoId ? { ...servico, quantidade: servico.quantidade + 1 } : servico
                );
                setClienteSelecionado({
                    ...clienteSelecionado,
                    servicos: servicosAtualizados,
                });
                setNovoServicoId(null);
                return;
            }

            // Encontrar o serviço selecionado na lista disponível
            const servico = servicosDisponiveis.find(servico => servico.id === novoServicoId);
            if (servico) {
                const clienteServico = { ...servico, quantidade: 1 };
                setClienteSelecionado({
                    ...clienteSelecionado,
                    servicos: [...clienteSelecionado.servicos, clienteServico],
                });
                setNovoServicoId(null);
            }
        }
    };

    // Funções para incrementar/decrementar quantidade de produtos
    const handleIncrementarProduto = (produtoId) => {
        if (clienteSelecionado) {
            const produtosAtualizados = clienteSelecionado.produtos.map(produto =>
                produto.id === produtoId ? { ...produto, quantidade: produto.quantidade + 1 } : produto
            );
            setClienteSelecionado({
                ...clienteSelecionado,
                produtos: produtosAtualizados,
            });
        }
    };

    const handleDecrementarProduto = (produtoId) => {
        if (clienteSelecionado) {
            const produtosAtualizados = clienteSelecionado.produtos
                .map(produto =>
                    produto.id === produtoId ? { ...produto, quantidade: produto.quantidade - 1 } : produto
                )
                .filter(produto => produto.quantidade > 0);
            setClienteSelecionado({
                ...clienteSelecionado,
                produtos: produtosAtualizados,
            });
        }
    };

    // Funções para incrementar/decrementar quantidade de serviços
    const handleIncrementarServico = (servicoId) => {
        if (clienteSelecionado) {
            const servicosAtualizados = clienteSelecionado.servicos.map(servico =>
                servico.id === servicoId ? { ...servico, quantidade: servico.quantidade + 1 } : servico
            );
            setClienteSelecionado({
                ...clienteSelecionado,
                servicos: servicosAtualizados,
            });
        }
    };

    const handleDecrementarServico = (servicoId) => {
        if (clienteSelecionado) {
            const servicosAtualizados = clienteSelecionado.servicos
                .map(servico =>
                    servico.id === servicoId ? { ...servico, quantidade: servico.quantidade - 1 } : servico
                )
                .filter(servico => servico.quantidade > 0);
            setClienteSelecionado({
                ...clienteSelecionado,
                servicos: servicosAtualizados,
            });
        }
    };

    // Função para salvar as alterações do cliente
    const handleSaveCliente = () => {
        if (clienteSelecionado) {
            const clientesAtualizados = clientes.map(cliente =>
                cliente.id === clienteSelecionado.id ? clienteSelecionado : cliente
            );
            setClientes(clientesAtualizados);
            handleCloseModal();
        }
    };

    // Função para deletar um cliente
    const handleDeleteCliente = (id) => {
        if (window.confirm("Tem certeza que deseja deletar este cliente?")) {
            const clientesAtualizados = clientes.filter(cliente => cliente.id !== id);
            setClientes(clientesAtualizados);
        }
    };

    // Função para remover itens (pets, produtos, serviços) do cliente
    const handleRemoverItem = (id, tipo) => {
        if (clienteSelecionado) {
            const updatedCliente = {
                ...clienteSelecionado,
                [tipo]: clienteSelecionado[tipo].filter((item) => item.id !== id),
            };
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
                            {/* Informações do Cliente */}
                            <Form.Group className="mb-3" controlId="formNome">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nome do Cliente"
                                    name="nome"
                                    value={clienteSelecionado.nome}
                                    onChange={handleClienteChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formNomeSocial">
                                <Form.Label>Nome Social</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nome Social do Cliente"
                                    name="nomeSocial"
                                    value={clienteSelecionado.nomeSocial}
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
                                        <option key={pet.id} value={pet.id}>
                                            {pet.nome}
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
                                        <option key={produto.id} value={produto.id}>
                                            {produto.nome}
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
                                        <option key={servico.id} value={servico.id}>
                                            {servico.nome}
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
                                                    onClick={() => handleRemoverItem(pet.id, "pets")}
                                                >
                                                    Remover
                                                </Button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Lista de Produtos do Cliente */}
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
                                                        onClick={() => handleIncrementarProduto(produto.id)}
                                                    >
                                                        +
                                                    </Button>
                                                    <Button
                                                        variant="warning"
                                                        size="sm"
                                                        className="me-2"
                                                        onClick={() => handleDecrementarProduto(produto.id)}
                                                    >
                                                        -
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={() => handleRemoverItem(produto.id, "produtos")}
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
                                                        onClick={() => handleIncrementarServico(servico.id)}
                                                    >
                                                        +
                                                    </Button>
                                                    <Button
                                                        variant="warning"
                                                        size="sm"
                                                        className="me-2"
                                                        onClick={() => handleDecrementarServico(servico.id)}
                                                    >
                                                        -
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={() => handleRemoverItem(servico.id, "servicos")}
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