import React, { useState } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";

export default function ListaProdutos () {
    const [produtos, setProdutos] = useState([
        { id: 1, nome: "Ração para Cachorros", valor: "R$ 120,00" },
        { id: 2, nome: "Ração para Gatos", valor: "R$ 100,00" },
        { id: 3, nome: "Brinquedo para Cachorro", valor: "R$ 30,00" },
        { id: 4, nome: "Brinquedo para Gato", valor: "R$ 25,00" },
        { id: 5, nome: "Shampoo para Pets", valor: "R$ 40,00" },
        { id: 6, nome: "Collar Anti-Pulgas", valor: "R$ 60,00" },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);

    const handleShowModal = (produto) => {
        setProdutoSelecionado({ ...produto });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setProdutoSelecionado(null);
    };

    const handleProdutoChange = (e) => {
        const { name, value } = e.target;
        setProdutoSelecionado((prevProduto) => ({
            ...prevProduto,
            [name]: value,
        }));
    };

    const handleSaveProduto = () => {
        if (produtoSelecionado) {
            const produtosAtualizados = produtos.map((produto) =>
                produto.id === produtoSelecionado.id ? produtoSelecionado : produto
            );
            setProdutos(produtosAtualizados);
            setShowModal(false);
            setProdutoSelecionado(null);
        }
    };

    const handleDeleteProduto = (id) => {
        if (window.confirm("Tem certeza que deseja deletar este produto?")) {
            const produtosAtualizados = produtos.filter((produto) => produto.id !== id);
            setProdutos(produtosAtualizados);
        }
    };

    return (
        <div className="container-xxl mt-5">
            <div className="table-responsive">
                <Table striped hover bordered className="mx-auto" style={{ width: '80%' }}>
                    <thead className="table-light">
                        <tr>
                            <th>Produto</th>
                            <th>Valor</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtos.map((produto) => (
                            <tr key={produto.id}>
                                <td>{produto.nome}</td>
                                <td>{produto.valor}</td>
                                <td>
                                    <div className="d-flex flex-wrap justify-content-start gap-2">
                                        <Button
                                            variant="primary"
                                            size="sm"
                                            className="me-2"
                                            onClick={() => handleShowModal(produto)}
                                        >
                                            Detalhes
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleDeleteProduto(produto.id)}
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

            {/* Modal de Detalhes do Produto */}
            <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Detalhes do Produto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {produtoSelecionado && (
                        <Form>
                            <Form.Group className="mb-3" controlId="formNome">
                                <Form.Label>Produto</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nome do Produto"
                                    name="nome"
                                    value={produtoSelecionado.nome}
                                    onChange={handleProdutoChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formValor">
                                <Form.Label>Valor</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Valor do Produto"
                                    name="valor"
                                    value={produtoSelecionado.valor}
                                    onChange={handleProdutoChange}
                                />
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleSaveProduto}>
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