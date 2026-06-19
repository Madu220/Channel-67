// Função para criar glitter no fundo
function criarGlitterBackground() {
    const container = document.getElementById('glitterBackground');
    const numParticulas = 50;
    
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
    
    const estrelasEmojis = ['✨', '⭐', '🌟', '💫', '⚡', '💗', '💐', '🎀', '💖', '🌷'];
    
    for (let i = 0; i < 25; i++) {
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

/*
    ═══════════════════════════════════════════════════════════════
    CONFIGURAÇÃO DAS IMAGENS DE CORPO INTEIRO
    ═══════════════════════════════════════════════════════════════
    
    Para adicionar as imagens de corpo inteiro:
    
    1. Coloque as imagens na pasta "images"
    2. Nomeie como indicado abaixo (ou altere no HTML)
    3. Tamanho recomendado: 300x600 pixels (formato retrato/vertical)
    
    Exemplo de estrutura:
    /images/
    ├── billie.jpg (avatar redondo - já existente)
    ├── billie-full.jpg (corpo inteiro - NOVO)
    ├── pink.jpg
    ├── pink-full.jpg
    ├── ariana.jpg
    ├── ariana-full.jpg
    ├── kali.jpg
    ├── kali-full.jpg
    ├── lana.jpg
    └── lana-full.jpg
    
    ═══════════════════════════════════════════════════════════════
*/

function trocar(imagemCorpo, imagemAvatar, nome, completo, idade, nascimento, descricao) {
    // Atualiza a imagem de corpo inteiro
    document.getElementById("imgCorpo").src = imagemCorpo;
    
    // Atualiza o avatar no card
    document.getElementById("imgAvatar").src = imagemAvatar;
    
    // Atualiza o nome
    document.getElementById("nomePrincipal").innerHTML = nome;
    
    // Atualiza as informações
    document.getElementById("info").innerHTML =
    "<p><b>Nome completo:</b> " + completo + "</p>" +
    "<p><b>Idade:</b> " + idade + "</p>" +
    "<p><b>Nascimento:</b> " + nascimento + "</p>" +
    "<p><b>Descrição:</b> " + descricao + "</p>";
}

// Inicializar glitter ao carregar
document.addEventListener('DOMContentLoaded', function() {
    criarGlitterBackground();
});