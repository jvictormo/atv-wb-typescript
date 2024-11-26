import Entrada from "../io/entrada";
import Servico from "../modelo/servico";
import Cadastro from "./cadastro";

export default function createCadastoServicos(servicos: Array<Servico>) {
    const entrada = new Entrada();

    return {
        cadastrar(): void {
            console.log(`\nInício do cadastro do servico`);


            let nome = entrada.receberTexto(`Por favor infome o nome do servico: `);

            let valor: number;
            while (true) {
                valor = entrada.receberNumero(`Por favor informe o valor do produto: `);
                if (isNaN(valor) || valor <= 0) {
                    console.log("Valor inválido! Por favor, insira um número válido maior que zero.");
                } else {
                    break;
                }
            }

            let servico = new Servico(nome, valor);

            servicos.push(servico);
            console.log(`\nCadastro concluído :)\n`);
        }
    }
}