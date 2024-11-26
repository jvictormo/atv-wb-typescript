import { useState } from "react"

export default function FormularioCadastroCliente(props) {
    const [nome, setNome] = useState("");
    const [nomeSocial, setNomeSocial] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");

    // Campos de endereço
    const [estado, setEstado] = useState("");
    const [cidade, setCidade] = useState("");
    const [bairro, setBairro] = useState("");
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [codigoPostal, setCodigoPostal] = useState("");
    const [informacoesAdicionais, setInformacoesAdicionais] = useState("");

    // Telefones
    const [telefones, setTelefones] = useState([{ ddd: "", numero: "" }]);

    const verificarCamposPreenchidos = () => {
        return nome && nomeSocial && cpf && email && estado && cidade && bairro && rua && numero && codigoPostal;
    };

    const adicionarTelefone = () => {
        setTelefones([...telefones, { ddd: "", numero: "" }]);
    };

    const removerTelefone = (index) => {
        setTelefones(telefones.filter((_, i) => i !== index));
    };

    const atualizarTelefone = (index, campo, valor) => {
        const novosTelefones = [...telefones];
        novosTelefones[index][campo] = valor;
        setTelefones(novosTelefones);
    };

    async function handleSubmit(e) {
        e.preventDefault();

        if (!verificarCamposPreenchidos()) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        const dadosCliente = {
            nome,
            nomeSocial,
            cpf,
            email,
            endereco: {
                estado,
                cidade,
                bairro,
                rua,
                numero,
                codigoPostal,
                informacoesAdicionais
            },
            telefones
        };

        try {
            const response = await fetch("http://localhost:32831/cliente/cadastrar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(dadosCliente)
            });

            if (response.ok) {
                alert("Cliente cadastrado com sucesso!");
                props.setTelaSub("Visualizar");
            } else {
                alert("Erro ao cadastrar cliente.");
            }

        } catch (error) {
            console.error(error);
        }
    }

    let tema = props.tema;
    return (
        <div className="container-fluid mt-5" style={{ width: "70%" }}>
            <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                    <input onChange={(e) => setNome(e.target.value)} type="text" className="form-control" placeholder="Nome" />
                </div>
                <div className="input-group mb-3">
                    <input onChange={(e) => setNomeSocial(e.target.value)} type="text" className="form-control" placeholder="Nome social" />
                </div>
                <div className="input-group mb-3">
                    <input onChange={(e) => setCpf(e.target.value)} type="text" className="form-control" placeholder="CPF" />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1" style={{ background: tema, color: "white" }}>@</span>
                    <input onChange={(e) => setEmail(e.target.value)} type="text" className="form-control" placeholder="E-mail" />
                </div>

                {/* Campos de Endereço */}
                <h5>Endereço</h5>
                <div className="input-group mb-3">
                    <input onChange={(e) => setEstado(e.target.value)} type="text" className="form-control" placeholder="Estado" />
                </div>
                <div className="input-group mb-3">
                    <input onChange={(e) => setCidade(e.target.value)} type="text" className="form-control" placeholder="Cidade" />
                </div>
                <div className="input-group mb-3">
                    <input onChange={(e) => setBairro(e.target.value)} type="text" className="form-control" placeholder="Bairro" />
                </div>
                <div className="input-group mb-3">
                    <input onChange={(e) => setRua(e.target.value)} type="text" className="form-control" placeholder="Rua" />
                </div>
                <div className="input-group mb-3">
                    <input onChange={(e) => setNumero(e.target.value)} type="text" className="form-control" placeholder="Número" />
                </div>
                <div className="input-group mb-3">
                    <input onChange={(e) => setCodigoPostal(e.target.value)} type="text" className="form-control" placeholder="Código Postal" />
                </div>
                <div className="input-group mb-3">
                    <textarea
                        onChange={(e) => setInformacoesAdicionais(e.target.value)}
                        className="form-control"
                        placeholder="Informações adicionais"
                    />
                </div>

                {/* Telefones */}
                <h5>Telefones</h5>
                {telefones.map((telefone, index) => (
                    <div className="input-group mb-3" key={index}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="DDD"
                            value={telefone.ddd}
                            onChange={(e) => atualizarTelefone(index, "ddd", e.target.value)}
                            style={{ maxWidth: "80px", marginRight: "10px" }}
                        />
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Número"
                            value={telefone.numero}
                            onChange={(e) => atualizarTelefone(index, "numero", e.target.value)}
                        />
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => removerTelefone(index)}
                            style={{ marginLeft: "10px" }}
                        >
                            Remover
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    className="btn btn-success mb-3"
                    onClick={adicionarTelefone}
                >
                    Adicionar Telefone
                </button>

                <div className="input-group mb-3">
                    <button type="submit" className="btn btn-outline-secondary" style={{ background: tema, color: "white" }}>
                        Cadastrar
                    </button>
                </div>
            </form>
        </div>
    );
}
