import { Component } from "react";

export default class HomeFooter extends Component {
    render() {
        return (
            <>
                <footer className="bg-light py-4 footer-background">
                    <div className="container">
                        <div className="col-12 text-center text-md-center">
                            <p className="text-muted mb-1">© 2024 PetLovers. Todos os direitos reservados.</p>
                            <p className="text-muted">
                                Entre em contato: <a href="mailto:contato@petlovers.com" className="text-success">contato@petlovers.com</a>
                            </p>
                        </div>
                    </div>
                </footer>
                <style>{`
                .footer-background {
                    background-color: rgb(228, 231, 228) !important;
                }
             `}</style>
            </>
        );
    }
}
