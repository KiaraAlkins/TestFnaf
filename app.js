// Autora: Kiara Victória

const MenuPrincipal = document.getElementById('MenuPrincipal');
const buttonStart = document.getElementById('buttonStartGame');
const TheGame = document.getElementById('JogoPrincipal');
TheGame.classList.add('sectionEscondida');

function iniciarOJogo() {
    MenuPrincipal.classList.remove('MenuPrincipal');
    MenuPrincipal.classList.add('sectionEscondida');

    TheGame.classList.remove('sectionEscondida');
    TheGame.classList.add('SensorDeMovimento');

    InicializacaoDoJogo();
}

buttonStart.addEventListener('click', iniciarOJogo);

///////////////////////////////////////// 


function InicializacaoDoJogo() {

    const animatronicElement = document.getElementById('SpringTrap');00000

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
    trancaDaSala.src = ('./assets/151537.svg');
    trancaDaSala.classList.add('trancaDaSala')

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

    let portasAbertas = true;

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
    };

    function trancarPortas() {

        if (!botaoTrancar.contains(trancaDaSala) && portasAbertas) {
            botaoTrancar.appendChild(trancaDaSala);
            const indice = SalasPossíveis.indexOf(SalaDoBoss);
            if (indice !== -1) {
                SalasPossíveis.splice(indice, 1); // Remove a SalaDoBoss das salas possíveis
                console.log(SalasPossíveis);
                
            }
            portasAbertas = false;
        } else {
            botaoTrancar.removeChild(trancaDaSala);
            if (!SalasPossíveis.includes(SalaDoBoss)) {
                SalasPossíveis.push(SalaDoBoss); // Reinsere a SalaDoBoss nas salas possíveis
                console.log(SalasPossíveis);
            }
            portasAbertas = true;
        
    }}

    botaoTrancar.addEventListener('click', trancarPortas);

    //A cada 5 segundos o animatrônic deve se mover para uma sala

    let gameOver = false;

    const IdIntervalo = setInterval(() => {

        const Dado = parseInt(Math.random() * 20);
        console.log(Dado);
        
        if (animatronic.dificuldade >= Dado) {
            if (dadobool() == true) {
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

            if (animatronic.posicao == SalaDoBoss) {
                gameOver = true;
                if (gameOver) {
                    clearInterval(IdIntervalo);
                    console.log('Game Over');
                
                    TheGame.classList.remove('SensorDeMovimento');
                    TheGame.classList.add('sectionEscondida');

                    const telaJumpscare = document.getElementById('Jumpscare');
                    telaJumpscare.classList.remove('sectionEscondida');
                    telaJumpscare.classList.add('Jumpscare');
                    const videoJumpscare = document.getElementById('meuVideo');
                    if (videoJumpscare.paused) {
                        videoJumpscare.play();
                    }

                    videoJumpscare.addEventListener('ended', function() {
                        telaJumpscare.classList.remove('Jumpscare');
                        telaJumpscare.classList.add('sectionEscondida');
                        MenuPrincipal.classList.remove('sectionEscondida');
                        MenuPrincipal.classList.add('MenuPrincipal');

                    })
                    return
                }
                console.log('Game Over');
            }
        }
    }, 1000); // 5000 milissegundos = 5 segundos 

}



    // // Obtém o vídeo e o botão de play
    // const video = document.getElementById('meuVideo');
    // const botaoPlay = document.getElementById('botaoPlay');
    
    // // Função para dar play no vídeo
    // botaoPlay.addEventListener('click', function() {
    //     // Verifica se o vídeo está pausado
    //     if (video.paused) {
    //         video.play();  // Dá play no vídeo
    //         botaoPlay.textContent = "Pausar"; // Muda o texto do botão para "Pausar"
    //     } else {
    //         video.pause();  // Pausa o vídeo
    //         botaoPlay.textContent = "Dar Play"; // Muda o texto do botão para "Dar Play"
    //     }
    // });
    
    // // Evento para quando o vídeo terminar
    // video.addEventListener('ended', function() {
    //     botaoPlay.textContent = "Dar Play"; // Resetando o texto para "Dar Play" quando o vídeo terminar
    // });