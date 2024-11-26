import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Table, InputGroup } from "react-bootstrap";
import axios from "axios"

export default function ListaProdutos() {
    const [produtos, setProdutos] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get("http://localhost:32831/product/get")

            setProdutos(response.data)
        }

        fetchData()
    }, [])

    const handleShowModal = async (produto) => {
        try {
            const response = await axios.get(`http://localhost:32831/product/${produto.sequenceIdProduct}`)

            const productSelecionadoApi = await response.data;

            setProdutoSelecionado(productSelecionadoApi)
        } catch (error) {
            console.error(error)
            setProdutoSelecionado({ ...produto });
        } finally {
            setShowModal(true);
        }
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

    const handleSaveProduto = async () => {
        if (produtoSelecionado) {
            if (produtoSelecionado.name.trim() === "") {
                alert("O nome do produto não pode estar vazio.");
                return;
            }

            const produtosAtualizados = produtos.map((produto) =>
                produto.sequenceIdProduct === produtoSelecionado.sequenceIdProduct ? produtoSelecionado : produto
            );

            try {
                const response = await axios.put(`http://localhost:32831/product/update/${produtoSelecionado.sequenceIdProduct}`, produtoSelecionado)

                if (response.status === 200) {
                    alert("Produto atualizado com sucesso!");

                    setProdutos(produtosAtualizados);
                    handleCloseModal();
                } else {
                    alert("Erro ao atualizar produto.");
                }

            } catch (error) {
                alert("Erro ao atualizar o produto, verifique o console para mais informações.")
                console.error(error)
            }
            setProdutoSelecionado(null);
        }
    };

    const handleDeleteProduto = async (sequenceIdProduct) => {
        if (window.confirm("Tem certeza que deseja deletar este produto?")) {
            const produtosAtualizados = produtos.filter((produto) => produto.sequenceIdProduct !== sequenceIdProduct);
            try {
                const response = await axios.delete(`http://localhost:32831/product/delete/${sequenceIdProduct}`)

                if (response.status === 200) {
                    alert("Produto deletado com sucesso!");
                } else {
                    alert("Erro ao deletar produto.");
                }
            } catch (error) {
                alert("Erro ao deletar produto, verifique o console para mais informaçoes.")
                console.error(error)
            }

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
                            <tr key={produto.sequenceIdProduct}>
                                <td>{produto.name}</td>
                                <td>R$ {produto.price}</td>
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
                                            onClick={() => handleDeleteProduto(produto.sequenceIdProduct)}
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
                                    name="name"
                                    value={produtoSelecionado.name}
                                    onChange={handleProdutoChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formValor">
                                <Form.Label>Valor</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text>R$</InputGroup.Text>
                                    <Form.Control
                                        type="text"
                                        placeholder="Valor do Produto"
                                        name="price"
                                        value={produtoSelecionado.price}
                                        onChange={handleProdutoChange}
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