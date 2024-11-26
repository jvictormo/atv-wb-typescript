/* eslint-disable jsx-a11y/anchor-is-valid */
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

export default function SubNavBar (props) {
    const gerarListaBotoes = () => {
        if (props.botoes.length <= 0) {
            return <></>;
        } else {
            let lista = props.botoes.map(valor =>
                <li key={valor} className="nav-item">
                    <a
                        className={`nav-link-sub ${props.botãoSelecionado === valor ? 'active' : ''}`}
                        href="#"
                        onClick={(e) => props.seletorView(valor, e)}
                    >
                        {valor}
                    </a>
                </li>
            );
            return lista;
        }
    }

        let tema = props.tema
        return (
            <>
                <nav className="navbar navbar-expand-lg" data-bs-theme="light" style={{ backgroundColor: tema, overflow: 'hidden', paddingBottom: 25, paddingTop: 20 }}>
                    <div className="container-fluid">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavSub" aria-controls="navbarNavSub" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-center custom-nav" id="navbarNavSub" style={{ widows: '100vw' }}>
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

                    .nav-link-sub {
                        transition: background-color 0.3s;
                        width: 100%;
                        display: flex;
                        justify-content: center;
                        text-decoration: none;
                        color: black;
                    }

                    .nav-link-sub.active,
                    .nav-link-sub:hover {
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