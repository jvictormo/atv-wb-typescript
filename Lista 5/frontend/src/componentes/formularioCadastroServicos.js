import { useState } from "react"
import axios from "axios"

export default function FormularioCadastroServicos(props) {

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

        const dadosService = {
            name,
            price
        };

        try {
            const response = await axios.post("http://localhost:32831/service/create", dadosService);

            if (response.status === 201) {
                alert("Serviço cadastrado com sucesso!");

                props.setTelaSub("Visualizar");
            } else {
                alert("Erro ao cadastrar serviço.");
            }

        } catch (error) {
            alert("Erro ao cadastrar serviço, verifique o console para mais informações.")
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