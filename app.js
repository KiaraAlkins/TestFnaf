document.addEventListener('DOMContentLoaded', () => {
    // Coloque aqui todo o código que manipula o DOM


//Dado para números aleatórios 

const Dado = parseInt(Math.random() * 20);
//Dado % 2 === 0;

function dadobool(){
    const db = parseInt(Math.random() * 10);
    if(db % 2 === 0){
    return true
    } else {
    return false
    }
}


let i = 1;

const fileira = document.getElementById('fileira');
const quadrado1 = document.getElementById('quadrado1');
const quadrado2 = document.getElementById('quadrado2');
const quadrado3 = document.getElementById('quadrado3');
const quadrado4 = document.getElementById('quadrado4');
const quadrado5 = document.getElementById('quadrado5');
const SalaDoBoss = document.getElementById('SalaDoBoss');
const botaoTrancar = document.getElementById('botaoTrancar');
SalaDoBoss.appendChild(botaoTrancar);
const trancaDaSala = document.getElementById('trancaDaSala')
botaoTrancar.appendChild(trancaDaSala);
trancaDaSala.src = './assets/151537.svg';
trancaDaSala.classList.add('trancaDaSala')

const animatronicElement = document.getElementById('SpringTrap');

const SalasPossíveis = [quadrado1, quadrado2, quadrado3, quadrado4, quadrado5, SalaDoBoss];

let portasAbertas = true;

function trancarPortas() {

    if (!botaoTrancar.contains(trancaDaSala) && portasAbertas) {
        botaoTrancar.appendChild(trancaDaSala);
        portasAbertas = false;
    } else {
        botaoTrancar.removeChild(trancaDaSala);
        portasAbertas = true;
    }

    console.log(portasAbertas);
    
}

botaoTrancar.addEventListener('click', trancarPortas());

const animatronic = {
    nome: 'Springtrap',
    dificuldade: 5,
    elemento: animatronicElement,
    posicao: quadrado1,
    
    moverParaSala(sala) {
        this.posicao = sala;
        sala.appendChild(animatronicElement);
        animatronicElement.style.left = `${sala * 20}%`; // este código será realizado após o animatronico se mexer, irá leva-lo para a esquerda
    }
};

//A cada 5 segundos o animatrônic deve se mover para uma sala

let gameOver = false;

const IdIntervalo = setInterval(() => {

        if (dadobool() == true) {
            i++;
            animatronic.moverParaSala(SalasPossíveis[i]);
        } else {
            if (i === 0) {
                i + 1;
            } else {
                i--;
                animatronic.moverParaSala(SalasPossíveis[i]);
            }
        }

        if (animatronic.posicao == SalaDoBoss) {
            gameOver = true;
            if (gameOver) {
                clearInterval(IdIntervalo);
                console.log('Game Over');
                return
            }
            console.log('Game Over');
        }

    }, 1000); // 5000 milissegundos = 5 segundos
    

    botaoTrancar.onclick = trancarPortas;

});

