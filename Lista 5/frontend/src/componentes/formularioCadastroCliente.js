import { useState } from "react"
import axios from "axios"

export default function FormularioCadastroCliente(props) {
    const [name, setName] = useState("")
    const [socialName, setSocialName] = useState("")
    const [cpf, setCpf] = useState("")
    const [email, setEmail] = useState("")

    const verificarCamposPreenchidos = () => {
        return name && socialName && cpf && email;
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!verificarCamposPreenchidos()) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        const dadosCliente = {
            name,
            socialName,
            cpf,
            email
        };

        try {
            const response = await axios.post("http://localhost:32831/customer/create", dadosCliente);

            if (response.status === 201) {
                alert("Cliente cadastrado com sucesso!");

                props.setTelaSub("Visualizar");
            } else {
                alert("Erro ao cadastrar cliente.");
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
                alert("Erro ao cadastrar cliente, verifique o console para mais informações.")
                console.error(error)
            }
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
                    <input onChange={(e) => setSocialName(e.target.value)} type="text" className="form-control" placeholder="Nome social" aria-label="Nome social" aria-describedby="basic-addon1" />
                </div>
                <div className="input-group mb-3">
                    <input onChange={(e) => setCpf(e.target.value)} type="text" className="form-control" placeholder="CPF" aria-label="CPF" aria-describedby="basic-addon1" />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1" style={{ background: tema, color: "white" }}>@</span>
                    <input onChange={(e) => setEmail(e.target.value)} type="text" className="form-control" placeholder="E-mail" aria-label="E-mail" aria-describedby="basic-addon1" />
                </div>
                <div className="input-group mb-3">
                    <button type="submit" className="btn btn-outline-secondary" style={{ background: tema, color: "white" }}>Cadastrar</button>
                </div>
            </form>
        </div>
    )
}