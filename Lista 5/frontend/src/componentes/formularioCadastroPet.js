import { useState, useEffect } from "react";
import axios from "axios";

export default function FormularioCadastroPet(props) {
    let tema = props.tema

    const [clientes, setClientes] = useState([])

    const [name, setName] = useState("")
    const [breed, setBreed] = useState("")
    const [gender, setGender] = useState("")
    const [petType, setPetType] = useState("")
    const [owner, setOwner] = useState(0)

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("http://localhost:32831/customer/get")

                setClientes(response.data)
            } catch (error) {
                console.error(error)
            }

        }
        fetchData()
    }, [])

    const verificarCamposPreenchidos = () => {
        return name && breed && gender && petType;
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!verificarCamposPreenchidos()) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        const dadosPet = {
            name,
            breed,
            gender,
            petType,
            ...(owner !== 0) && { owner }
        };

        try {
            const response = await axios.post("http://localhost:32831/pet/create", dadosPet);

            if (response.status === 201) {
                alert("Pet cadastrado com sucesso!");

                props.setTelaSub("Visualizar");
            } else {
                alert("Erro ao cadastrar Pet.");
            }

        } catch (error) {
            alert("Erro ao cadastrar pet, verifique o console para mais informações.")
            console.error(error)
        }
    }

    return (
        <div className="container-fluid mt-5" style={{ width: '70%' }}>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <select onChange={(e) => setOwner(e.target.value)} className="form-select" id="floatingSelect" aria-label="Dono">
                        <option defaultValue={0}>Selecione o dono do Pet</option>
                        {clientes.map(cliente => (
                            <option key={cliente.sequenceIdCustomer} value={cliente.sequenceIdCustomer}>
                                {cliente.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="input-group mb-3">
                    <input onChange={(e) => setName(e.target.value)} type="text" className="form-control" placeholder="Nome" aria-label="Nome" aria-describedby="basic-addon1" />
                </div>
                <div className="input-group mb-3">
                    <input onChange={(e) => setBreed(e.target.value)} type="text" className="form-control" placeholder="Raça" aria-label="Raça" aria-describedby="basic-addon1" />
                </div>
                <div className="input-group mb-3">
                    <select onChange={(e) => setGender(e.target.value)} className="form-select" id="floatingSelect" aria-label="Dono">
                        <option defaultValue={0}>Selecione o gênero do pet</option>
                        <option key={"Macho"} value={"Macho"}>Macho</option>
                        <option key={"Fêmea"} value={"Fêmea"}>Fêmea</option>
                        <option key={"Outro"} value={"Outro"}>Outro</option>
                    </select>
                </div>
                <div className="input-group mb-3">
                    <input onChange={(e) => setPetType(e.target.value)} type="text" className="form-control" placeholder="Tipo" aria-label="Tipo" aria-describedby="basic-addon1" />
                </div>
                <div className="input-group mb-3">
                    <button type="submit" className="btn btn-outline-secondary" style={{ background: tema, color: "white" }}>Cadastrar</button>
                </div>
            </form>
        </div>
    )
}