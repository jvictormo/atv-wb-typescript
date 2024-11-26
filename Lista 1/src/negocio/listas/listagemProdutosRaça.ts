import Cliente from "../../modelo/cliente";
import Produto from "../../modelo/produto";
import Servico from "../../modelo/servico";
import Pet from "../../modelo/pet";
import Listagem from "../listagem";

export default function listarConsumoPorRacaETipo(clientes: Array<Cliente>) {
    return {
        listar(): void {
            const consumoPorRaca: { [raca: string]: { produtos: { [produto: string]: number }, servicos: { [servico: string]: number } } } = {};
            const consumoPorTipo: { [tipo: string]: { produtos: { [produto: string]: number }, servicos: { [servico: string]: number } } } = {};

            clientes.forEach(cliente => {
                const pets = cliente.getPets;
                pets.forEach(pet => {
                    const raca = pet.getRaca;
                    const tipo = pet.getTipo;
                    if (!consumoPorRaca[raca]) {
                        consumoPorRaca[raca] = { produtos: {}, servicos: {} };
                    }

                    if (!consumoPorTipo[tipo]) {
                        consumoPorTipo[tipo] = { produtos: {}, servicos: {} };
                    }

                    cliente.getProdutosConsumidos.forEach(produto => {
                        if (!consumoPorRaca[raca].produtos[produto.nome]) {
                            consumoPorRaca[raca].produtos[produto.nome] = 0;
                        }
                        consumoPorRaca[raca].produtos[produto.nome]++;

                        if (!consumoPorTipo[tipo].produtos[produto.nome]) {
                            consumoPorTipo[tipo].produtos[produto.nome] = 0;
                        }
                        consumoPorTipo[tipo].produtos[produto.nome]++;
                    });

                    cliente.getServicosConsumidos.forEach(servico => {
                        if (!consumoPorRaca[raca].servicos[servico.nome]) {
                            consumoPorRaca[raca].servicos[servico.nome] = 0;
                        }
                        consumoPorRaca[raca].servicos[servico.nome]++;

                        if (!consumoPorTipo[tipo].servicos[servico.nome]) {
                            consumoPorTipo[tipo].servicos[servico.nome] = 0;
                        }
                        consumoPorTipo[tipo].servicos[servico.nome]++;
                    });
                });
            });

            console.log("\nConsumo por Raça:");
            for (const raca in consumoPorRaca) {
                console.log(`Raça: ${raca}`);
                console.log("Produtos consumidos:");
                for (const produto in consumoPorRaca[raca].produtos) {
                    console.log(`  ${produto}: ${consumoPorRaca[raca].produtos[produto]} vezes`);
                }
                console.log("Serviços consumidos:");
                for (const servico in consumoPorRaca[raca].servicos) {
                    console.log(`  ${servico}: ${consumoPorRaca[raca].servicos[servico]} vezes`);
                }
            }

            console.log("\nConsumo por Tipo:");
            for (const tipo in consumoPorTipo) {
                console.log(`Tipo: ${tipo}`);
                console.log("Produtos consumidos:");
                for (const produto in consumoPorTipo[tipo].produtos) {
                    console.log(`  ${produto}: ${consumoPorTipo[tipo].produtos[produto]} vezes`);
                }
                console.log("Serviços consumidos:");
                for (const servico in consumoPorTipo[tipo].servicos) {
                    console.log(`  ${servico}: ${consumoPorTipo[tipo].servicos[servico]} vezes`);
                }
            }
        }
    }
}
