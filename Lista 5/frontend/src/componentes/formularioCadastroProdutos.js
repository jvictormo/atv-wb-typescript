import { useState } from "react"
import axios from "axios"

export default function FormularioCadastroProdutos(props) {

    const [name, setName] = useState([])
    const [price, setPrice] = useState([])

    const verificarCamposPreenchidos = () => {
        return name && price;
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!verificarCamposPreenchidos()) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        const dadosProduct = {
            name,
            price
        };

        try {
            const response = await axios.post("http://localhost:32831/product/create", dadosProduct);

            if (response.status === 201) {
                alert("Produto cadastrado com sucesso!");

                props.setTelaSub("Visualizar");
            } else {
                alert("Erro ao cadastrar produto.");
            }

        } catch (error) {
            alert("Erro ao cadastrar produto, verifique o console para mais informações.")
            console.error(error)
        }
    }

    let tema = props.tema
    return (
        <div className="container-fluid mt-5" style={{ width: '70%' }}>
            <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                    <input onChange={(e) => setName(e.target.value)} type="text" className="form-control" placeholder="Nome" aria-label="Nome" aria-describedby="basic-addon1" />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">R$</span>
                    <input onChange={(e) => setPrice(e.target.value)} type="number" className="form-control" placeholder="Valor" aria-label="Valor" aria-describedby="basic-addon1" />
                </div>
                <div className="input-group mb-3">
                    <button type="submit" className="btn btn-outline-secondary" style={{ background: tema, color: "white" }}>Cadastrar</button>
                </div>
            </form>
        </div>
    )
}