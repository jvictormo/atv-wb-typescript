const clientes = [
    { id: 1, nome: "Maria Silva", nomeSocial: "Mariana", cpf: "123.456.789-00" },
    { id: 2, nome: "João Oliveira", nomeSocial: "João", cpf: "987.654.321-00" },
    { id: 3, nome: "Ana Santos", nomeSocial: "Ana", cpf: "456.789.123-00" },
    { id: 4, nome: "Carlos Pereira", nomeSocial: "Carlos", cpf: "321.654.987-00" },
    { id: 5, nome: "Luiz Almeida", nomeSocial: "Luiz", cpf: "789.123.456-00" },
    { id: 6, nome: "Fernanda Costa", nomeSocial: "Fê", cpf: "654.321.098-00" }
];

export default function FormularioCadastroPet(props) {
    let tema = props.tema
    return (
        <div className="container-fluid mt-5" style={{ width: '70%' }}>
            <form>
                <div className="mb-3">
                    <select className="form-select" id="floatingSelect" aria-label="Dono">
                        <option selected>Selecione o dono do Pet</option>
                        {clientes.map(cliente => (
                            <option key={cliente.id} value={cliente.id}>
                                {cliente.nome}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Nome" aria-label="Nome" aria-describedby="basic-addon1" />
                </div>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Raça" aria-label="Raça" aria-describedby="basic-addon1" />
                </div>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Genero" aria-label="Genero" aria-describedby="basic-addon1" />
                </div>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Tipo" aria-label="Tipo" aria-describedby="basic-addon1" />
                </div>
                <div className="input-group mb-3">
                    <button className="btn btn-outline-secondary" type="button" style={{ background: tema, color: "white" }}>Cadastrar</button>
                </div>
            </form>
        </div>
    )
}