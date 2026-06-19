// Lista de palavras e temas
var sPerguntas = [
    ["THE WALKING DEAD", "SERIE"],
    ["GAME OF THRONES", "SERIE"],
    ["STRANGER THINGS", "SERIE"],
    ["BREAKING BAD", "SERIE"],
    ["DARK", "SERIE"],

    ["A SUBSTANCIA", "FILME"],
    ["LALA LAND", "FILME"],
    ["CLUBE DA LUTA", "FILME"],
    ["TITANIC", "FILME"],
    ["CORRA", "FILME"],

    ["THE WEEKND", "CANTOR"],
    ["HARRY STYLES", "CANTOR"],
    ["BRUNO MARS", "CANTOR"],
    ["JUSTIN BIEBER", "CANTOR"],
    ["POST MALONE", "CANTOR"],

    ["MIA GOTH", "ATRIZ"],
    ["SCARLETT JOHANSSON", "ATRIZ"],
    ["ZENDAYA", "ATRIZ"],
    ["JENNA ORTEGA", "ATRIZ"],
    ["MARGOT ROBBIE", "ATRIZ"],

    ["JACOB ELORDI", "ATOR"],
    ["WILL SMITH", "ATOR"],
    ["BRAD PITT", "ATOR"],
    ["JOHNNY DEPP", "ATOR"],
    ["TIMOTHEE CHALAMET", "ATOR"],

    ["BLINDING LIGHTS", "MUSICA"],
    ["AS IT WAS", "MUSICA"],
    ["SAVE YOUR TEARS", "MUSICA"],
    ["BAD ROMANCE", "MUSICA"],
    ["BOHEMIAN RHAPSODY", "MUSICA"]
];

var iSorteados = [];
var iJogada = 0;
var sPalavraSorteada;
var iAcertos = 0;
var iErros = 0;
var iLetraClicada;

var sLetras = [
    'A','B','C','D','E','F','G','H','I','J',
    'K','L','M','N','O','P','Q','R','S','T',
    'U','V','W','X','Y','Z','-'
];

var iCertas = 0;
var iErradas = 0;

// Frases que aparecem embaixo da imagem
var legendasForca = [
    "Billie está bem, falando ao telefone... 🌞",
    "Ops! Billie notou uma goteira em sua mesa... 🌧️",
    "Billie escuta o barulho da agua aumentando e decide verificar!",
    "Ah não! A água está entrando muito forte 🌊",
    "Socorro! Billie está tentando sair da agua! 🆘",
    "Oh! Billie desmaiou 😰",
    "AFOGADO! Game Over! 💀"
];

// Atualiza o texto abaixo da imagem
function atualizarLegenda() {
    var legenda = document.getElementById('legenda-imagem');
    if (legenda) {
        legenda.textContent = legendasForca[iErros];
    }
}

// Mostra uma mensagem bonita na tela
function mostrarMensagem(emoji, titulo, texto, cor) {
    // Remove mensagem antiga se existir
    var msgAntiga = document.getElementById('mensagem-jogo');
    if (msgAntiga) {
        msgAntiga.remove();
    }
    
    // Cria o fundo escuro
    var fundo = document.createElement('div');
    fundo.id = 'mensagem-jogo';
    fundo.style.cssText = "position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 999; display: flex; justify-content: center; align-items: center;";
    
    // Cria a caixa da mensagem
    var caixa = document.createElement('div');
    caixa.style.cssText = "background: linear-gradient(160deg, #fff0f5, #ffe0ea); border: 3px solid " + cor + "; border-radius: 30px; padding: 30px; text-align: center; max-width: 400px; box-shadow: 0 20px 40px rgba(0,0,0,0.3);";
    
    // Monta o conteudo da mensagem
    caixa.innerHTML = "<div style='font-size: 4rem; margin-bottom: 10px;'>" + emoji + "</div>" +
        "<h2 style='font-family: Fredoka One; font-size: 1.8rem; color: " + cor + "; margin-bottom: 10px;'>" + titulo + "</h2>" +
        "<p style='font-size: 1rem; color: #5c1a44; margin-bottom: 20px;'>" + texto + "</p>" +
        "<button onclick='fecharMensagem()' style='background: " + cor + "; border: none; border-radius: 20px; padding: 12px 30px; font-family: Nunito; font-size: 1rem; font-weight: 800; color: white; cursor: pointer;'>OK</button>";
    
    fundo.appendChild(caixa);
    document.body.appendChild(fundo);
}

// Fecha a mensagem e vai pra proxima palavra
function fecharMensagem() {
    var msg = document.getElementById('mensagem-jogo');
    if (msg) {
        msg.remove();
    }
    prepararProximaPalavra();
}

// Pular a palavra atual
function pularPalavra() {
    iErradas = iErradas + 1;
    
    var resposta = sPerguntas[iSorteados[iJogada]][0];
    mostrarMensagem("⏭️", "Palavra Pulada!", "A resposta era: " + resposta, "#ff8844");
}

// Cria as estrelinhas e glitter no fundo
function criarGlitterBackground() {
    var container = document.getElementById('glitterBackground');
    var numParticulas = 50;
    
    for (var i = 0; i < numParticulas; i++) {
        var particula = document.createElement('div');
        particula.className = 'glitter-particle';
        
        var tamanho = Math.random() * 8 + 3;
        var left = Math.random() * 100;
        var duracao = Math.random() * 8 + 6;
        var delay = Math.random() * 10;
        var maxOpacity = Math.random() * 0.5 + 0.2;
        var drift = (Math.random() - 0.5) * 100;
        
        particula.style.cssText = "width: " + tamanho + "px; height: " + tamanho + "px; left: " + left + "%; bottom: -20px; --duration: " + duracao + "s; --delay: " + delay + "s; --maxOpacity: " + maxOpacity + "; --drift: " + drift + "px;";
        
        container.appendChild(particula);
    }
    
    var estrelasEmojis = ['✨', '⭐', '🌟', '💫', '⚡', '💗', '💐', '🎀', '💖', '🌷'];
    
    for (var i = 0; i < 25; i++) {
        var estrela = document.createElement('div');
        estrela.className = 'sparkle-star';
        
        var indiceAleatorio = Math.floor(Math.random() * estrelasEmojis.length);
        estrela.textContent = estrelasEmojis[indiceAleatorio];
        
        var tamanho = Math.random() * 20 + 10;
        var left = Math.random() * 100;
        var top = Math.random() * 100;
        var duracao = Math.random() * 4 + 2;
        var delay = Math.random() * 6;
        var maxOpacity = Math.random() * 0.6 + 0.2;
        
        estrela.style.cssText = "left: " + left + "%; top: " + top + "%; --size: " + tamanho + "px; --duration: " + duracao + "s; --delay: " + delay + "s; --maxOpacity: " + maxOpacity + ";";
        
        container.appendChild(estrela);
    }
}

// Cria os quadradinhos das letras da palavra
function criaLetras(sPalavra) {
    var formulario = document.getElementById("tenta");
    formulario.innerHTML = "";
    var j = 0;
    sPalavraSorteada = limpa(sPalavra);

    document.getElementById("tema").innerHTML = "TEMA: " + sPerguntas[iSorteados[iJogada]][1] + " - " + sPalavraSorteada.length + " letras";

    for (var i = 0; i < sPalavra.length; i++) {
        if (sPalavra[i] == " ") {
            var espaco = document.createElement("span");
            espaco.innerHTML = "&nbsp;&nbsp;&nbsp;";
            formulario.appendChild(espaco);
        } else {
            var letra = document.createElement("INPUT");
            letra.setAttribute("type", "text");
            letra.setAttribute("name", "tenta" + j);
            letra.setAttribute("id", "tenta" + j);
            letra.setAttribute("size", "1");
            letra.setAttribute("maxlength", "1");
            letra.setAttribute("disabled", true);
            formulario.appendChild(letra);
            j = j + 1;
        }
    }
}

// Sorteia a ordem das perguntas
function sorteia() {
    for (var i = 0; i < sPerguntas.length; i++) {
        iSorteados.push(i);
    }
    iSorteados = shuffleArray(iSorteados);
    criaLetras(sPerguntas[iSorteados[iJogada]][0]);
    atualizarLegenda();
}

// Quando clica numa letra
function Confere(letra) {
    iLetraClicada = letra;
    var bAchou = false;
    var contador = 0;

    for (var i = 0; i < sPerguntas[iSorteados[iJogada]][0].length; i++) {
        var letraAtual = sPerguntas[iSorteados[iJogada]][0][i];
        
        if (letraAtual != " ") {
            if (letra == limpa(letraAtual)) {
                document.getElementById("tenta" + contador).value = letra;
                iAcertos = iAcertos + 1;
                document.getElementById("acerto").innerHTML = "ACERTOS: " + iAcertos;
                bAchou = true;
            }
            contador = contador + 1;
        }
    }

    if (!bAchou) {
        iErros = iErros + 1;
        document.getElementById("imagem").src = "images/forca" + (iErros + 1) + ".png";
        atualizarLegenda();
    }

    document.getElementById(iLetraClicada).disabled = true;
    acabou();
}

// Verifica se acabou o jogo
function acabou() {
    // Ganhou
    if (iAcertos == sPalavraSorteada.length) {
        iCertas = iCertas + 1;
        mostrarMensagem("🎉", "PARABÉNS!", "Você acertou a palavra!", "#4caf50");
    } 
    // Perdeu
    else if (iErros == 6) {
        iErradas = iErradas + 1;
        
        // Mostra a ultima imagem (boneco morto)
        document.getElementById("imagem").src = "images/forca7.png";
        atualizarLegenda();
        
        var respostaCerta = sPerguntas[iSorteados[iJogada]][0];
        mostrarMensagem("💀", "VOCÊ MORREU!", "A resposta era: " + respostaCerta, "#7d0000");
    }
}

// Prepara tudo para a proxima palavra
function prepararProximaPalavra() {
    iJogada = iJogada + 1;
    
    document.getElementById("palcertas").innerHTML = "PALAVRAS CERTAS: " + iCertas + "<br>PALAVRAS ERRADAS: " + iErradas;

    iAcertos = 0;
    iErros = 0;

    document.getElementById("acerto").innerHTML = "ACERTOS: 0";
    document.getElementById("imagem").src = "images/forca1.png";
    atualizarLegenda();

    for (var i = 0; i < sLetras.length; i++) {
        document.getElementById(sLetras[i]).disabled = false;
    }

    criaLetras(sPerguntas[iSorteados[iJogada]][0]);
}

// Embaralha um array
function shuffleArray(d) {
    for (var c = d.length - 1; c > 0; c--) {
        var b = Math.floor(Math.random() * (c + 1));
        var a = d[c];
        d[c] = d[b];
        d[b] = a;
    }
    return d;
}

// Tira espaços e acentos
function limpa(sItem) {
    var sResultado = sItem;
    sResultado = sResultado.replaceAll(" ", "");
    sResultado = sResultado.normalize("NFD").replace(/[^\x00-\xFF]/g, "");
    return sResultado;
}

// Quando a pagina carrega
document.addEventListener('DOMContentLoaded', function() {
    criarGlitterBackground();
});
