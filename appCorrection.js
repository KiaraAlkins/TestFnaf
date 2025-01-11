//criação do menu principal

const main = document.querySelector('main')
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
    fileira.classList.add('fileira1');
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
    trancaDaSala.src = ('./assets/151537.svg');
    trancaDaSala.classList.add('trancaDaSala');
    trancaDaSala.style.display = 'none';
    botaoTrancar.appendChild(trancaDaSala);

    //*************//

    //Tempo para a pizza ficar pronta

    const tempoPizza = document.createElement('div');
    tempoPizza.id = 'tempoPizza';
    tempoPizza.classList.add('tempoPizza');
    TheGame.appendChild(tempoPizza);
    const tempoPizzaTexto = document.createElement('p');
    tempoPizza.appendChild(tempoPizzaTexto);
    let relogio = 0;
    tempoPizzaTexto.innerText = relogio + ":00 AM";

    ////

    const animatronic = {
        nome: 'Springtrap',
        dificuldade: 5,
        elemento: animatronicElement,
        posicao: quadrado1,
        
        moverParaSala(sala) {
            if (SalasPossiveis.includes(sala)) {
                this.posicao = sala;
                sala.appendChild(animatronicElement);
            }
        }
    }

    let tempoDeGasto = 1000;
    let portasAbertas = true;

    function trancarPortas() {
        if (portasAbertas) {
            trancaDaSala.style.display = 'block';
            portasAbertas = false;
            const indice = SalasPossiveis.indexOf(SalaDoBoss);
            if (indice !== -1) {
                SalasPossiveis.splice(indice, 1);
            }
            console.log(SalasPossiveis);
        } else {
            trancaDaSala.style.display = 'none';
            if (!SalasPossiveis.includes(SalaDoBoss)) {
                SalasPossiveis.push(SalaDoBoss);
            }
            portasAbertas = true;
            console.log(SalasPossiveis);
        }
        if (portasAbertas) {
            return tempoDeGasto = 1000;
        } else {
            return tempoDeGasto = 50;
        }
    }

    let GameWin = false

    function UWinTheGame() {
        TheGame.remove();
        const GameWinSection = document.createElement('section');
        GameWinSection.classList.add('YouWin');
        main.appendChild(GameWinSection);
        const GWDiv = document.createElement('div');
        GWDiv.classList.add('YouWinContent');
        const GWTitle = document.createElement('h1');
        GWTitle.innerText = 'You win!';
        const GWText = document.createElement('p');
        GWText.innerText = 'You did the perfect pizza! Congratulations!';
        const GWButton = document.createElement('button');
        GWButton.innerText = 'Restart Game';
        GWButton.classList.add('buttonRestart');
        GameWinSection.appendChild(GWDiv);
        GWDiv.appendChild(GWTitle);
        GWDiv.appendChild(GWText);
        GameWinSection.appendChild(GWButton);
        GWButton.addEventListener('click', () => {
            MenuPrincipal.classList.remove('sectionEscondida');
            MenuPrincipal.classList.add('MenuPrincipal');
            GameWinSection.remove();
        });
    }

    function dadobool(){
        const db = parseInt(2);
        if(db % 2 === 0){
        return true
        } else {
        return false
        }
    }

    let i = 0;
    const SalasPossiveis = [quadrado1, quadrado2, quadrado3, quadrado4, quadrado5, SalaDoBoss];

    botaoTrancar.addEventListener('click', trancarPortas);

    //*************//

    //Dados//

    let GameOver = false;


    
    //

    const relogioAndando = setInterval(() => {
        if (relogio < 6) { 
            relogio++;
        } else {
            clearInterval(relogioAndando);
            GameWin = true;
            if (GameWin) {
                clearInterval(IdIntervalo);
                console.log('You Win');
                UWinTheGame();
                return
            }
        }
        return tempoPizzaTexto.innerText = `${relogio}:00 AM`;
    }, 1500);

    const gastoDaBateria = setInterval(() => {
        if (numeroDaPorcentagem > 0) {
            numeroDaPorcentagem--; 
        } else {GameOver = true;
            clearInterval(gastoDaBateria);
            clearInterval(IdIntervalo);

            // Finalizar o jogo aqui
            console.log('Game Over - Bateria Zerada');
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
            });

            videoJumpscare.addEventListener('error', (e) => {
                console.error('Erro ao carregar o vídeo:', e);
            });
        }
        return porcentagemBateria.innerText = `${numeroDaPorcentagem}%`;
    }, tempoDeGasto);

    const IdIntervalo = setInterval(() => {
        
        const Dado = Math.floor(Math.random() * 10) + 1;
        console.log(Dado);

        if (5 <= animatronic.dificuldade) {
            if (dadobool()) {
                if (i < SalasPossiveis.length - 1) {
                    i++;
                    animatronic.moverParaSala(SalasPossiveis[i]);
                } 
            } else {
                if (i > 0) {
                    i--;
                    animatronic.moverParaSala(SalasPossiveis[i]);
                }
            }

            if (animatronic.posicao === SalaDoBoss) {
                GameOver = true;
                if (GameOver) {
                    clearInterval(IdIntervalo);
                    clearInterval(relogioAndando);
                    console.log('Game Over');
                    clearInterval(gastoDaBateria);
               
                    TheGame.remove();

                    const telaJumpscare = document.createElement('section');
                    telaJumpscare.classList.add('Jumpscare');

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
