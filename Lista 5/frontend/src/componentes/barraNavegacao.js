/* eslint-disable jsx-a11y/anchor-is-valid */
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import PawIcon from './PawIcon';

export default function BarraNavegacao(props) {
    const gerarListaBotoes = () => {
        if (props.botoes.length <= 0) {
            return <></>
        } else {
            let lista = props.botoes.map(valor =>
                <li key={valor} className="nav-item">
                    <a
                        className={`nav-link ${props.botãoSelecionado === valor ? 'active' : ''}`}
                        href="#"
                        onClick={(e) => props.seletorView(valor, e)}
                    >
                        {valor}
                    </a>
                </li>
            )
            return lista
        }
    }

    let tema = props.tema
    return (
        <>
            <nav className="navbar navbar-expand-lg" data-bs-theme="light" style={{ backgroundColor: tema, overflow: 'hidden', paddingLeft: 15, paddingRight: 15, paddingBottom: 15, paddingTop: 20 }}>
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1 d-flex align-items-baseline" style={{ gap: "1vw" }}><PawIcon />                             <h1 className="poppins-medium" style={{ fontSize: '1.5rem', color: "#213C21" }}>PetLovers</h1>                        </span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-center custom-nav" id="navbarNav" style={{ widows: '100vw' }}>
                        <ul className="navbar-nav" style={{ gap: "3%" }}>
                            {gerarListaBotoes()}
                        </ul>
                    </div>
                </div>
            </nav>
            <style>{`
                .custom-nav {
                    width: 100vw;
                }

                .nav-item {
                min-width: 100px;
                }

                .nav-link {
                    transition: background-color 0.3s;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                }

                .nav-link.active,
                .nav-link:hover {
                    background-color: #0c7f041f;
                    color: #213c21 !important;
                    border-radius:3px;
                    width: 100%
                }

                @media (max-width: 1000px) {
                    .custom-nav {
                        position: relative; /* Alterar para relative em telas menores */
                    }
                }

                @media (min-width: 1001px) {
                    .custom-nav {
                        position: absolute; /* Alterar para absolute em telas maiores */
                    }
                }
            `}</style>
        </>
    )
}