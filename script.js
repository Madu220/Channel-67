const jogosLinks = {
    velha: "velha/index.html",                    
    personagem: "personagens/index.html",          
    forca: "forca/index.html",                    
    musica: "musica/index.html",                 
    palavra: "palavra/index.html"       
};

// Função para abrir o jogo
function abrirJogo(jogoId) {
    const link = jogosLinks[jogoId];
    
    if (link) {
        try {
            window.location.href = link;
        } catch (error) {
            console.error("Erro ao abrir o jogo:", error);
            mostrarErro(jogoId);
        }
    } else {
        alert("Link do jogo não configurado ainda!");
    }
}

// Função para mostrar erro caso o jogo não seja encontrado
function mostrarErro(jogoId) {
    const modal = document.getElementById('modal');
    modal.style.display = 'flex';
}

// Função para mostrar modal informativo (modo demonstração)
function mostrarModal(jogoId) {
    const modal = document.getElementById('modal');
    
    modal.style.display = 'flex';
    
    setTimeout(() => {
        fecharModal();
        window.location.href = jogosLinks[jogoId];
    }, 1000);
}

// Função para fechar modal
function fecharModal() {
    document.getElementById('modal').style.display = 'none';
}

/*
    ═══════════════════════════════════════════════════════════════
    CONFIGURAÇÃO DAS IMAGENS DOS JOGOS
    ═══════════════════════════════════════════════════════════════
    
    Para usar imagens personalizadas nos cards, siga estes passos:
    
    1. COLOQUE AS IMAGENS NA MESMA PASTA DO index.html
    
    2. NOMEIE AS IMAGENS EXATAMENTE COMO ABAIXO:
       - jogo-velha.jpg      (para o Jogo da Velha)
       - jogo-personagem.jpg (para Seleção de Personagem)
       - jogo-forca.jpg      (para Jogo da Forca)
       - jogo-musica.jpg     (para Adivinhe a Música)
       - jogo-palavra.jpg    (para Adivinhe a Palavra)
    
    3. FORMATOS ACEITOS: .jpg, .jpeg, .png, .webp, .gif
    
    4. TAMANHO RECOMENDADO: 400x250 pixels (formato retangular deitado)
       - Largura: entre 300px e 600px
       - Altura: entre 150px e 300px
       - Proporção ideal: 16:9 ou 4:3 (paisagem/deitado)
    
    5. EXEMPLO DE COMO FICARÁ SUA PASTA:
       /seu-projeto/
       ├── index.html
       ├── style.css
       ├── script.js
       ├── jogo-velha.jpg
       ├── jogo-personagem.jpg
       ├── jogo-forca.jpg
       ├── jogo-musica.jpg
       └── jogo-palavra.jpg
    
    6. SE QUISER USAR NOMES DIFERENTES:
       Altere o atributo "src" na tag <img> no arquivo index.html
       Exemplo: <img src="meu-nome-personalizado.png" alt="...">
    
    ═══════════════════════════════════════════════════════════════
*/

// Função para criar partículas de glitter no fundo
function criarGlitterBackground() {
    const container = document.getElementById('glitterBackground');
    const numParticulas = 60;
    
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
    
    // Adicionar estrelas brilhantes
    const estrelasEmojis = ['✨', '⭐', '🌟', '💫', '⚡', '💗', '💐', '🎀', '💖', '🌷'];
    
    for (let i = 0; i < 30; i++) {
        const estrela = document.createElement('div');
        estrela.className = 'sparkle-star';
        estrela.textContent = estrelasEmojis[Math.floor(Math.random() * estrelasEmojis.length)];
        
        const tamanho = Math.random() * 20 + 10;
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

// Função para criar decorações flutuantes dentro do container
function criarDecoracoesFlutuantes() {
    const container = document.querySelector('.hub-container');
    const decoracoes = ['✨', '💗', '🌟', '🎀', '💖', '⭐', '💫', '🌷'];
    
    for (let i = 0; i < 25; i++) {
        const decor = document.createElement('div');
        decor.className = 'floating-decoration';
        decor.textContent = decoracoes[Math.floor(Math.random() * decoracoes.length)];
        
        const tamanho = Math.random() * 18 + 10;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duracao = Math.random() * 6 + 4;
        const delay = Math.random() * 8;
        
        decor.style.cssText = `
            left: ${left}%;
            top: ${top}%;
            --size: ${tamanho}px;
            --duration: ${duracao}s;
            --delay: ${delay}s;
        `;
        
        container.appendChild(decor);
    }
}

// Adiciona eventos de clique aos cards
function adicionarEventos() {
    document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const jogo = card.getAttribute('data-game');
            abrirJogo(jogo);
        });
    });
}

// Animação de entrada dos cards
function animarCards() {
    const cards = document.querySelectorAll('.game-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 120);
    });
}

// Fechar modal clicando fora
function configurarModal() {
    const modal = document.getElementById('modal');
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            fecharModal();
        }
    });
    
    // Fechar modal com tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            fecharModal();
        }
    });
}

// Inicialização da página
function init() {
    criarGlitterBackground();
    criarDecoracoesFlutuantes();
    adicionarEventos();
    animarCards();
    configurarModal();
    
    console.log("🎮 CHANEL 67 - Hub de Jogos Inicializado!");
    console.log("📁 Estrutura de pastas esperada:");
    console.log("   /velha/index.html");
    console.log("   /personagens/index.html");
    console.log("   /forca/index.html");
    console.log("   /musica/index.html");
    console.log("   /palavra/index.html");
    console.log("");
    console.log("🖼️ Para adicionar imagens aos cards:");
    console.log("   1. Coloque as imagens na mesma pasta do index.html");
    console.log("   2. Nomeie como: jogo-velha.jpg, jogo-personagem.jpg, etc.");
    console.log("   3. Tamanho recomendado: 400x250 pixels (formato deitado)");
}

// Executar quando a página carregar
document.addEventListener('DOMContentLoaded', init);