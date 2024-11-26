import { Component } from "react";
import PetFoodIcon from "./PetFoodIcon";
import AnimalShelterIcon from "./AnimalShelterIcon";

export default class HomeInfo extends Component {
    render() {
        return (
            <>
                <div style={{ width: '100%', backgroundColor: "#DDE3DD", padding: "2rem 0" }}>
                    <div className="container">
                        <div className="row align-items-center text-center text-md-start">
                            <div className="col-md-8">
                                <h1 className="display-4 poppins-bold" style={{ color: "#213C21", fontWeight: 'bold' }}>
                                    Cuidando da gestão de seu Petshop<br />Como se fosse nosso
                                </h1>
                            </div>
                            <div className="col-md-4 d-flex justify-content-center">
                                <AnimalShelterIcon />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container my-5">
                    <div className="row align-items-center">
                        <div className="col-md-6 text-center text-md-start mb-4 mb-md-0">
                            <PetFoodIcon />
                        </div>

                        <div className="col-md-6">
                            <h3 className="poppins-bold text-success">Por que confiar seu pet shop à PetLovers?</h3>
                            <p style={{ lineHeight: '1.7', fontSize: '1.1rem' }}>
                                Na <strong>PetLovers</strong>, acreditamos que seu pet merece o melhor cuidado! Oferecemos uma solução completa de
                                gerenciamento que otimiza seu tempo, melhora o atendimento aos seus clientes e garante que cada
                                pet receba o carinho e atenção que merece. Nossa plataforma é fácil de usar, permitindo que você
                                controle agendamentos, estoque e o histórico de cada pet, enquanto se concentra no que mais importa:
                                proporcionar um atendimento excepcional e promover o bem-estar dos seus clientes de quatro patas.
                            </p>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
