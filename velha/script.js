// Estado do jogo
let tabuleiro = ['', '', '', '', '', '', '', '', ''];
let jogadorAtual = 'X';
let jogoAtivo = true;
let pontosX = 0;
let pontosO = 0;

// Combinações vencedoras
const vitorias = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

// Elementos
const celulas = document.querySelectorAll('.celula');
const vezSpan = document.getElementById('vez');
const pontosXSpan = document.getElementById('pontosX');
const pontosOSpan = document.getElementById('pontosO');
const btnReiniciar = document.getElementById('reiniciar');
const btnZerar = document.getElementById('zerar');

// Mostrar mensagem animada
function mostrarMensagem(texto, cor) {
    // Remove mensagem anterior se existir
    const anterior = document.querySelector('.mensagem-animada');
    if (anterior) anterior.remove();

    const div = document.createElement('div');
    div.className = 'mensagem-animada';
    div.textContent = texto;
    div.style.backgroundColor = cor;
    document.body.appendChild(div);

    // Força um reflow para a animação iniciar
    div.offsetHeight;
    div.classList.add('mostrar');

    setTimeout(() => {
        div.classList.remove('mostrar');
        setTimeout(() => div.remove(), 400);
    }, 1500);
}

// Atualizar placar na tela
function atualizarPlacar() {
    pontosXSpan.textContent = pontosX;
    pontosOSpan.textContent = pontosO;
}

// Atualizar status do jogo
function atualizarStatus() {
    vezSpan.textContent = jogadorAtual;
}

// Verificar vencedor
function verificarVencedor() {
    for (let combo of vitorias) {
        const [a, b, c] = combo;
        if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
            return tabuleiro[a];
        }
    }
    return null;
}

// Verificar empate
function verificarEmpate() {
    return tabuleiro.every(celula => celula !== '');
}

// Finalizar jogo
function finalizarJogo(vencedor) {
    jogoAtivo = false;
    
    if (vencedor) {
        if (vencedor === 'X') {
            pontosX++;
            mostrarMensagem('❌ Jogador X venceu!', '#ff4488');
        } else {
            pontosO++;
            mostrarMensagem('⭕ Jogador O venceu!', '#ff8844');
        }
        atualizarPlacar();
    } else {
        mostrarMensagem('🤝 Empate!', '#b3486a');
    }
    
    setTimeout(() => {
        reiniciarPartida();
    }, 1600);
}

// Fazer jogada
function fazerJogada(index) {
    if (!jogoAtivo) return;
    if (tabuleiro[index] !== '') return;
    
    // Marcar jogada
    tabuleiro[index] = jogadorAtual;
    const celula = celulas[index];
    celula.textContent = jogadorAtual;
    celula.classList.add(jogadorAtual, 'preenchida');
    
    // Verificar fim de jogo
    const vencedor = verificarVencedor();
    if (vencedor) {
        finalizarJogo(vencedor);
        return;
    }
    
    if (verificarEmpate()) {
        finalizarJogo(null);
        return;
    }
    
    // Trocar jogador
    jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X';
    atualizarStatus();
}

// Reiniciar partida (mantém pontos)
function reiniciarPartida() {
    tabuleiro = ['', '', '', '', '', '', '', '', ''];
    jogadorAtual = 'X';
    jogoAtivo = true;
    atualizarStatus();
    
    celulas.forEach(celula => {
        celula.textContent = '';
        celula.classList.remove('X', 'O', 'preenchida');
    });
}

// Zerar placar e reiniciar
function zerarPlacar() {
    pontosX = 0;
    pontosO = 0;
    atualizarPlacar();
    reiniciarPartida();
}

// Adicionar eventos
function adicionarEventos() {
    celulas.forEach(celula => {
        celula.addEventListener('click', () => {
            const index = parseInt(celula.getAttribute('data-index'));
            fazerJogada(index);
        });
    });
    
    btnReiniciar.addEventListener('click', reiniciarPartida);
    btnZerar.addEventListener('click', zerarPlacar);
}

// Criar glitter no fundo
function criarGlitterBackground() {
    const container = document.getElementById('glitterBackground');
    if (!container) return;
    
    const numParticulas = 40;
    
    for (let i = 0; i < numParticulas; i++) {
        const particula = document.createElement('div');
        particula.className = 'glitter-particle';
        
        const tamanho = Math.random() * 8 + 3;
        const left = Math.random() * 100;
        const duracao = Math.random() * 8 + 6;
        const delay = Math.random() * 10;
        const maxOpacity = Math.random() * 0.5 + 0.2;
        const drift = (Math.random() - 0.5) * 100;
        
        particula.style.cssText = `
            width: ${tamanho}px;
            height: ${tamanho}px;
            left: ${left}%;
            bottom: -20px;
            --duration: ${duracao}s;
            --delay: ${delay}s;
            --maxOpacity: ${maxOpacity};
            --drift: ${drift}px;
        `;
        
        container.appendChild(particula);
    }
    
    const estrelasEmojis = ['✨', '⭐', '🌟', '💫', '⚡', '💗', '💐', '🎀', '💖'];
    
    for (let i = 0; i < 20; i++) {
        const estrela = document.createElement('div');
        estrela.className = 'sparkle-star';
        estrela.textContent = estrelasEmojis[Math.floor(Math.random() * estrelasEmojis.length)];
        
        const tamanho = Math.random() * 18 + 10;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duracao = Math.random() * 4 + 2;
        const delay = Math.random() * 6;
        const maxOpacity = Math.random() * 0.6 + 0.2;
        
        estrela.style.cssText = `
            left: ${left}%;
            top: ${top}%;
            --size: ${tamanho}px;
            --duration: ${duracao}s;
            --delay: ${delay}s;
            --maxOpacity: ${maxOpacity};
        `;
        
        container.appendChild(estrela);
    }
}

// Inicializar
function init() {
    criarGlitterBackground();
    adicionarEventos();
    reiniciarPartida();
}

init();