//criação do menu principal

const MenuPrincipal = document.getElementById('MenuPrincipal');
const buttonStart = document.getElementById('buttonStartGame');

function iniciarOJogo() {
    MenuPrincipal.classList.remove('MenuPrincipal');
    MenuPrincipal.classList.add('sectionEscondida');

    const TheGame = document.createElement('section')
    TheGame.id = 'JogoPrincipal';
    TheGame.classList.add('SensorDeMovimento');
    document.body.appendChild(TheGame);

    InicializacaoDoJogo(TheGame);
}

buttonStart.addEventListener('click', iniciarOJogo);

function InicializacaoDoJogo(TheGame) {
    
    const animatronicElement = document.createElement('div');
    animatronicElement.id = 'SpringTrap';
    animatronicElement.classList.add('animatronico');


    //Bateria//

    const bateria = document.createElement('div');
    bateria.id = 'bateria';
    bateria.classList.add('bateria');
    TheGame.appendChild(bateria);

    let numeroDaPorcentagem = 100;
    
    const porcentagemBateria = document.createElement('p');
    porcentagemBateria.innerText = `${numeroDaPorcentagem}%`;
    bateria.appendChild(porcentagemBateria);

    //********//
 
    //Quadrados 

    const fileira = document.createElement('div');
    fileira.id = 'fileira';
    fileira.classList.add('fileira');
    TheGame.appendChild(fileira);
    
    const quadrado1 = document.createElement('div');
    quadrado1.classList.add('quadrado');
    fileira.appendChild(quadrado1);
    quadrado1.appendChild(animatronicElement);

    const quadrado2 = document.createElement('div');
    quadrado2.classList.add('quadrado');
    fileira.appendChild(quadrado2);

    const quadrado3 = document.createElement('div');
    quadrado3.classList.add('quadrado');
    fileira.appendChild(quadrado3);

    const quadrado4 = document.createElement('div');
    quadrado4.classList.add('quadrado');
    fileira.appendChild(quadrado4);

    const quadrado5 = document.createElement('div');
    quadrado5.classList.add('quadrado');
    fileira.appendChild(quadrado5);
    
    const SalaDoBoss = document.createElement('div');
    fileira.appendChild(SalaDoBoss);
    SalaDoBoss.classList.add('quadrado');
    SalaDoBoss.classList.add('Q6');

    //Botão de Trancar//
    const botaoTrancar = document.createElement('button');
    botaoTrancar.id = 'botaoTrancar';
    botaoTrancar.classList.add('botaoTrancar');
    botaoTrancar.classList.add('Q6');
    SalaDoBoss.appendChild(botaoTrancar);

    const trancaDaSala = document.createElement('img');
    trancaDaSala.id = 'trancaDaSala';
    trancaDaSala.src = ('./assets/151537.svg');
    trancaDaSala.classList.add('trancaDaSala');
    botaoTrancar.appendChild(trancaDaSala);

    const portasAbertas = true;

    function trancarPortas() {
        if (portasAbertas) {
            const trancaDaSala = document.createElement('img');
            trancaDaSala.src = ('./assets/151537.svg');
            trancaDaSala.classList.add('trancaDaSala');
            botaoTrancar.appendChild(trancaDaSala);
            portasAbertas = false;

            const indice = SalasPossíveis.indexOf(animatronic.posicao);

            if (indice !== -1) {
                SalasPossíveis.splice(indice, 1);
            }
        } else {
            trancaDaSala.remove();
            portasAbertas = true;
            if (!SalasPossíveis.includes(SalaDoBoss)) {
                SalasPossíveis.push(SalaDoBoss);
            }
        }
    }

    function dadobool(){
        const db = parseInt(2)
        if(db % 2 === 0){
        return true
        } else {
        return false
        }
    }

    let i = 0;
    const SalasPossíveis = [quadrado1, quadrado2, quadrado3, quadrado4, quadrado5, SalaDoBoss];

    //*************//

    //Dados//

    let GameOver = false;

    const animatronic = {
        nome: 'Springtrap',
        dificuldade: 5,
        elemento: animatronicElement,
        posicao: quadrado1,
        
        moverParaSala(sala) {
            if (SalasPossíveis.includes(sala)) {
                this.posicao = sala;
                sala.appendChild(animatronicElement);
            }
        }
    }
    
    //

    const gastoDaBateria = setInterval(() => {
        if (numeroDaPorcentagem > 0) {
            numeroDaPorcentagem--; 
        } else {
            clearInterval(IdIntervalo);
            GameOver = true;
        }
    }, 5000);

    const IdIntervalo = setInterval(() => {
        
        const Dado = Math.floor(Math.random() * 10) + 1;
        console.log(Dado);

        if (1 <= animatronic.dificuldade) {
            if (dadobool()) {
                if (i < SalasPossíveis.length - 1) {
                    i++;
                    animatronic.moverParaSala(SalasPossíveis[i]);
                } 
            } else {
                if (i > 0) {
                    i--;
                    animatronic.moverParaSala(SalasPossíveis[i]);
                }
            }

            if (animatronic.posicao === SalaDoBoss) {
                GameOver = true;
                if (GameOver) {
                    clearInterval(IdIntervalo);
                    console.log('Game Over');
                    clearInterval(gastoDaBateria);

                    TheGame.remove();

                    const telaJumpscare = document.createElement('section');
                    telaJumpscare.classList.add('Jumpscare');

                    const main = document.querySelector('main');
                    main.appendChild(telaJumpscare);

                    const videoJumpscare = document.createElement('video');
                    videoJumpscare.src = ('./assets/FNaF 4 Plushtrap Jumpscare.mp4');
                    telaJumpscare.appendChild(videoJumpscare);
                    const fonteVideo = document.createElement('source');
                    fonteVideo.src = ('./assets/FNaF 4 Plushtrap Jumpscare.mp4');
                    fonteVideo.type = 'video/mp4';
                    videoJumpscare.appendChild(fonteVideo);
                    

                    if (videoJumpscare.paused) {
                        videoJumpscare.play();
                    }

                    videoJumpscare.addEventListener('ended', function() {
                        telaJumpscare.remove();
                        MenuPrincipal.classList.remove('sectionEscondida');
                        MenuPrincipal.classList.add('MenuPrincipal');
                    })
                    videoJumpscare.addEventListener('error', (e) => {
                        console.error('Erro ao carregar o vídeo:', e);
                    });
                    return
                }
            }
        }
    }, 1000); // 1000ms = 1s
}
