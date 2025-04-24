class Personagens {
    constructor(nome, codinome, armaPrincipal, armaSecundaria, velocidade, forca, resistencia) {
        this.nome = nome;
        this.codinome = codinome;
        this.armaPrincipal = armaPrincipal;
        this.armaSecundaria = armaSecundaria;
        this.velocidade = velocidade;
        this.forca = forca;
        this.resistencia = resistencia
    }

    descricao() {
        return "Nome do personagem: " + this.nome + "\n"
            + "Codinome do personagem: " + this.codinome + "\n"
            + "Arma principal: " + this.armaPrincipal + "\n"
            + "Arma secundaria: " + this.armaSecundaria + "\n"
            + "Nível de força: " + this.forca + "\n"
            + "Nível de velocidade: " + this.velocidade + "\n"
            + "Nível de resistencia: " + this.resistencia + "\n"
    }

    static compara(p1, p2) {
        console.log(p1.descricao());
        console.log('-'.repeat(50));
        console.log(p2.descricao());
        console.log('-'.repeat(50));

        const atributos = [
            { key: 'velocidade', label: 'velocidade' },
            { key: 'forca', label: 'força' },
            { key: 'resistencia', label: 'resistência' },
        ];

        for (const { key, label } of atributos) {
            const v1 = p1[key];
            const v2 = p2[key];

            if (v1 > v2) {
                console.log(
                    `${p1.codinome} (${p1.nome}) vence em ${label}: ` +
                    `${v1} x ${v2}`
                );
            }
            else if (v1 < v2) {
                console.log(
                    `${p2.codinome} (${p2.nome}) vence em ${label}: ` +
                    `${v2} x ${v1}`
                );
            }
            else {
                console.log(`Empate em ${label}: ${v1}`);
            }
        }

        console.log('\n');
    }
}

const personagens = [
    new Personagens("Tony Stark", "Homem de Ferro", "Traje blindado com Reator Arc", "", 65, 55, 75),

    new Personagens("Steve Rogers", "Capitão América", "Escudo de Vibranium", "", 55, 70, 65),

    new Personagens("Thor Odinson", "Thor", "Mjölnir", "Tempestade de raios", 75, 90, 95),

    new Personagens("Bruce Banner", "Hulk", "Força bruta (Hulk)", "", 50, 100, 100),

    new Personagens("Natasha Romanoff", "Viúva Negra", "Bastões de combate", "Pistolas táticas", 80, 45, 55),

    new Personagens("Clint Barton", "Gavião Arqueiro", "Arco e flechas", "", 70, 50, 60),

    new Personagens("Thanos", "Titã Louco", "Manopla do Infinito", "Espada dourada", 60, 100, 100)
];

for (let i = 0; i < personagens.length; i++) {
    for (let j = i + 1; j < personagens.length; j++) {
        Personagens.compara(personagens[i], personagens[j]);
    }
}