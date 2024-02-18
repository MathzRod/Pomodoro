const html = document.querySelector('html');

const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo')

const botoes = document.querySelectorAll('.app__card-button');

const banner = document.querySelector('.app__image');

const titulo = document.querySelector('.app__title');

const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const audioPlay = new Audio('/sons/play.wav');
const audioPausa = new Audio('/sons/pause.mp3');
const audioTempoFinalizado = new Audio('./sons/beep.mp3')

const startPauseBt = document.querySelector('#start-pause');
let intervaloId = null;

const iniciarOuPausarBt = document.querySelector('#start-pause span');
const iconePauseEStart = document.querySelector('.app__card-primary-butto-icon');

const tempoTela = document.querySelector('#timer');

let tempoDecorridoEmSegundos = 1500;



musica.loop = true;

musicaFocoInput.addEventListener('change', ()=>{
    if(musica.paused){
        musica.play();

    }else{
        musica.pause();
    }
})

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');

    // adicionará uma classe para inserir o estilo ao botao no qual cliquei
    focoBt.classList.add('active');
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
})

function alterarContexto(contexto){
    mostrarTempo();

    //assim que eu clicar em um botao ele removerá todos e inserirá apenas o que está ativo acima ^
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            // InnerHTML permite utilizar caracteristicas do html (Strong e etc)
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;

        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada? <strong class="app__title-strong"> Faça uma pausa curta! </strong>`
            break; 
            
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>`
            break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    // Aqui se encontra a condição e o som de quando o tempo for finalizado
    if(tempoDecorridoEmSegundos <= 0){
        audioTempoFinalizado.play();
        zerar();
        alert('Tempo finalizado!')
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar(){
    // Dentro do IF encontra-se o período de pause para o Botão
    if(intervaloId){
        audioPausa.play();
        zerar();
        return;
    }
    // Aqui se encontra o período de play para o botão
    audioPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBt.textContent = "Pausar";
    iconePauseEStart.setAttribute('src', '/imagens/pause.png')

}

function zerar(){
    clearInterval(intervaloId);
    iniciarOuPausarBt.textContent = "Começar";
    iconePauseEStart.setAttribute('src', '/imagens/play_arrow.png')
    intervaloId = null;
}

function mostrarTempo (){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'});

    tempoTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();
