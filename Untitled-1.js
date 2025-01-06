//Dado para números aleatórios 

const Dado = parseInt(Math.random() * 20);
//Dado % 2 === 0;


//Dado booleano para saber se o número é par ou ímpar

const DDBOOL = parseInt(Math.random() * 5);

let Sign

function subtrairValores(i) {
    return i - 1;
}

function somarValores(i) {
    return i + 1;
}

if (DDBOOL % 2 === 0) {
    Sign = '+';
} else {
    Sign = '-';
    }

let i = 1

console.log(Dado)

//Número de câmeras possíveis onde o animatrônico poderá se mexer 

const SalasPossíveis = {
    a:[0, 1, 2, 3, 4],
    b:[0, 1, 3, 4],
    c:[0, 1, 2, 3, 4]
}
const SalaDoBoss = SalasPossíveis.a[4];

console.log(SalaDoBoss)

// Animatrônico 1 - Mecânica Simples de andar até a sala 

const animatronic = {
    nome: 'Bonnie',
    dificuldade: 7,
    salaAtual: SalasPossíveis.a[1]
}

console.log(animatronic.salaAtual)

function moverAnimatronico() {
    if (Dado <= animatronic.dificuldade) {

        animatronic.salaAtual.SalasPossíveis.a[i [${Sign}] 1];
    }
}