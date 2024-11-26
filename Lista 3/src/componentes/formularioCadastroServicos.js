export default function FormularioCadastroServicos(props) {
    let tema = props.tema
    return (
        <div className="container-fluid mt-5" style={{ width: '70%' }}>
            <form>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Nome" aria-label="Nome" aria-describedby="basic-addon1" />
                </div>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Valor" aria-label="Valor" aria-describedby="basic-addon1" />
                </div>
                <div className="input-group mb-3">
                    <button className="btn btn-outline-secondary" type="button" style={{ background: tema, color: "white" }}>Cadastrar</button>
                </div>
            </form>
        </div>
    )
}