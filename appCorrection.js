//criação do menu principal

const main = document.querySelector('main')
const MenuPrincipal = document.getElementById('MenuPrincipal');
const buttonStart = document.getElementById('buttonStartGame');
const buttonMensage = document.getElementById('buttonExtra');

const numeracao = document.createElement('input')
numeracao.type = 'number';
numeracao.min = '1';
numeracao.max = '20';
let numeroDaDificuldade = 5;

let jogoEmExecução = false;

function iniciarOJogo() {
    if (jogoEmExecução) {
        return
    }
    jogoEmExecução = true;

    const jogoExistente = document.getElementById('JogoPrincipal');
    if (jogoExistente) jogoExistente.remove();

    MenuPrincipal.classList.remove('MenuPrincipal');
    MenuPrincipal.classList.add('sectionEscondida');

    const TheGame = document.createElement('section')
    TheGame.id = 'JogoPrincipal';
    TheGame.classList.add('SensorDeMovimento');
    document.body.appendChild(TheGame);

    InicializacaoDoJogo(TheGame);
}


buttonStart.addEventListener('click', iniciarOJogo);

function extraMenu(params) {
    MenuPrincipal.classList.remove('MenuPrincipal');
    MenuPrincipal.classList.add('sectionEscondida');
    const MenuDosExtras = document.createElement('section');
    MenuDosExtras.classList.add('MenuExtra');
    document.body.appendChild(MenuDosExtras);
    const DivInputsExtras = document.createElement('div');
    MenuDosExtras.appendChild(DivInputsExtras);
    DivInputsExtras.classList.add('DivButtonsExtras');
    
    const buttonBack = document.createElement('button');
    buttonBack.classList.add('buttonsOfTheMenu');
    DivInputsExtras.appendChild(buttonBack);
    buttonBack.innerText = 'Voltar'

    numeracao.classList.add('inputDificuldade')
    DivInputsExtras.appendChild(numeracao)


    buttonBack.addEventListener('click', () => {
        numeroDaDificuldade = numeracao.value
        MenuDosExtras.remove();
        DivInputsExtras.removeChild(numeracao);
        MenuPrincipal.classList.remove('sectionEscondida');
        MenuPrincipal.classList.add('MenuPrincipal');
        return numeroDaDificuldade
    })

    
}

buttonMensage.addEventListener('click', extraMenu)

function InicializacaoDoJogo(TheGame) {


    if (numeroDaDificuldade == '') {
        numeroDaDificuldade = parseInt((Math.random() * 5) + 5);
    }
    
    console.log(numeroDaDificuldade);
    
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
        dificuldade: numeroDaDificuldade,
        elemento: animatronicElement,
        posicao: quadrado1,
        
        moverParaSala(sala) {
            if (SalasPossiveis.includes(sala)) {
                this.posicao = sala;
                sala.appendChild(animatronicElement);
            }
        }
    }


    let tempoDeGasto = 2000;
    let portasAbertas = true;

    function trancarPortas() {

        trancaDaSala.style.display = !portasAbertas ? 'none' : 'block';

        if (portasAbertas) {
            portasAbertas = false;
            const indice = SalasPossiveis.indexOf(SalaDoBoss);
            if (indice !== -1) {
                SalasPossiveis.splice(indice, 1);
            }
            console.log
            tempoDeGasto = parseInt(200);
        } else {
            if (!SalasPossiveis.includes(SalaDoBoss)) {
                SalasPossiveis.push(SalaDoBoss);
            }
            portasAbertas = true;
            tempoDeGasto = parseInt(2000);
        }
        
        clearTimeout(bateriaTimeout);
        bateriaTimeout = setTimeout(gastoDaBateria, tempoDeGasto);
    }

    let GameWin = false

    function dadobool(){
        const db = parseInt(Math.random() * 10);
        if(db > 3){
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

    function UWinTheGame() {
        TheGame.remove();
        clearInterval(relogioAndando);
        
        clearTimeout(bateriaTimeout);
        clearTimeout(bateriaTimeout);
        clearInterval(IdIntervalo);
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

    const relogioAndando = setInterval(() => {
        if (relogio < 5) { 
            relogio++;
        } else {
            clearInterval(relogioAndando);
            GameWin = true;
            if (GameWin) {
                clearInterval(IdIntervalo);
                UWinTheGame();
                return
            }
        }
        return tempoPizzaTexto.innerText = `${relogio}:00 AM`;
    }, 10000);

    function gastoDaBateria() {
        if (numeroDaPorcentagem > 0) {
            numeroDaPorcentagem--; 
            porcentagemBateria.innerText = `${numeroDaPorcentagem}%`;
        } else {
            GameOver = true;
            clearTimeout(bateriaTimeout);
            clearInterval(relogioAndando);
            clearInterval(IdIntervalo);
            // Finalizar o jogo aqui
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
            return
        }
        bateriaTimeout = setTimeout(gastoDaBateria, tempoDeGasto)
    };

    let bateriaTimeout = setTimeout(gastoDaBateria, tempoDeGasto);

    const IdIntervalo = setInterval(() => {
        
        const Dado = Math.floor(Math.random() * 10) + 1;

        if (Dado <= animatronic.dificuldade) {
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
                    clearTimeout(bateriaTimeout);
               
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
