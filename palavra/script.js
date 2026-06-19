// Variáveis do jogo
var palavra = "";
var escondida = "";
var tentativas = 5;
var letrasChutadas = [];

function iniciar() {
    palavra = document.getElementById("palavra").value.toLowerCase().trim();
    var dica = document.getElementById("dica").value.trim();
    
    // Validação
    if (palavra === "") {
        Swal.fire({
            title: "⚠️ Erro!",
            text: "Digite uma palavra secreta!",
            icon: "error",
            confirmButtonText: "OK",
            background: "#2a0a1f",
            color: "#e091bc"
        });
        return;
    }
    
    if (dica === "") {
        Swal.fire({
            title: "⚠️ Erro!",
            text: "Digite uma dica para ajudar!",
            icon: "error",
            confirmButtonText: "OK",
            background: "#2a0a1f",
            color: "#e091bc"
        });
        return;
    }
    
    if (palavra.length < 3) {
        Swal.fire({
            title: "⚠️ Palavra muito curta!",
            text: "Digite uma palavra com pelo menos 3 letras",
            icon: "warning",
            confirmButtonText: "OK",
            background: "#2a0a1f",
            color: "#e091bc"
        });
        return;
    }
    
    // Criar palavra escondida
    escondida = "";
    for (var i = 0; i < palavra.length; i++) {
        escondida += "_ ";
    }
    escondida = escondida.trim();
    
    // Mostrar na tela
    document.getElementById("dicaTela").innerHTML = dica;
    document.getElementById("palavraTela").innerHTML = escondida;
    document.getElementById("tentativasTela").innerHTML = tentativas;
    
    // Limpar letras chutadas
    letrasChutadas = [];
    document.getElementById("chutadasTela").innerHTML = "";
    
    document.querySelector(".criar-palavra").style.display = "none";
    document.getElementById("jogoArea").style.display = "block";
    
    Swal.fire({
        title: "🎮 JOGO INICIADO!",
        text: "Jogador 2, agora é sua vez de adivinhar!",
        icon: "success",
        confirmButtonText: "Começar!",
        background: "#2a0a1f",
        color: "#e091bc",
        confirmButtonColor: "#ff69b0"
    });
}

function chutar() {
    if (tentativas <= 0) {
        Swal.fire({
            title: "💀 VOCÊ PERDEU!",
            text: "Suas tentativas acabaram!",
            icon: "error",
            confirmButtonText: "Reiniciar",
            background: "#2a0a1f",
            color: "#e091bc",
            confirmButtonColor: "#ff69b0"
        }).then(() => {
            reiniciarJogo();
        });
        return;
    }
    
    Swal.fire({
        title: "🔍 DIGITE UMA LETRA",
        input: "text",
        inputAttributes: {
            maxlength: 1,
            autocapitalize: "off",
            style: "text-transform: uppercase"
        },
        showCancelButton: true,
        confirmButtonText: "Enviar",
        cancelButtonText: "Cancelar",
        background: "#2a0a1f",
        color: "#e091bc",
        confirmButtonColor: "#ff69b0",
        cancelButtonColor: "#5c1a44",
        preConfirm: (letra) => {
            if (!letra || letra.length === 0) {
                Swal.showValidationMessage("Digite uma letra!");
            } else if (!/^[a-zA-Z]$/.test(letra)) {
                Swal.showValidationMessage("Digite apenas letras!");
            }
            return letra;
        }
    }).then((result) => {
        if (!result.value) return;
        
        var letra = result.value.toLowerCase();
        
        // Verifica letra repetida
        if (letrasChutadas.includes(letra)) {
            Swal.fire({
                title: "⚠️ Letra repetida!",
                text: "Você já tentou a letra '" + letra.toUpperCase() + "'.",
                icon: "warning",
                confirmButtonText: "OK",
                background: "#2a0a1f",
                color: "#e091bc"
            });
            return;
        }
        
        // Adiciona à lista e atualiza tela
        letrasChutadas.push(letra);
        document.getElementById("chutadasTela").innerHTML = letrasChutadas.join(" ").toUpperCase();
        
        if (!palavra.includes(letra)) {
            tentativas--;
            document.getElementById("tentativasTela").innerHTML = tentativas;
            
            if (tentativas > 0) {
                Swal.fire({
                    title: "❌ ERROU!",
                    text: "A letra '" + letra + "' não está na palavra!\nTentativas restantes: " + tentativas,
                    icon: "error",
                    confirmButtonText: "Continuar",
                    background: "#2a0a1f",
                    color: "#e091bc",
                    confirmButtonColor: "#ff69b0"
                });
            } else {
                Swal.fire({
                    title: "💀 VOCÊ PERDEU!",
                    text: "A palavra era: " + palavra.toUpperCase(),
                    icon: "error",
                    confirmButtonText: "Reiniciar",
                    background: "#2a0a1f",
                    color: "#e091bc",
                    confirmButtonColor: "#ff69b0"
                }).then(() => {
                    reiniciarJogo();
                });
            }
            return;
        }
        
        // Acertou a letra
        var nova = "";
        for (var i = 0; i < palavra.length; i++) {
            if (palavra[i] == letra) {
                nova += letra.toUpperCase() + " ";
            } else {
                nova += escondida[i * 2] + " ";
            }
        }
        
        escondida = nova.trim();
        document.getElementById("palavraTela").innerHTML = escondida;
        
        Swal.fire({
            title: "✅ ACERTOU!",
            text: "A letra '" + letra.toUpperCase() + "' está na palavra!",
            icon: "success",
            confirmButtonText: "Continuar",
            background: "#2a0a1f",
            color: "#e091bc",
            confirmButtonColor: "#ff69b0",
            timer: 1500,
            showConfirmButton: false
        });
        
        // Verificar vitória
        if (!escondida.includes("_")) {
            Swal.fire({
                title: "🏆 VOCÊ VENCEU! 🏆",
                text: "Parabéns! Você descobriu a palavra " + palavra.toUpperCase(),
                icon: "success",
                confirmButtonText: "Jogar Novamente",
                background: "#2a0a1f",
                color: "#e091bc",
                confirmButtonColor: "#ff69b0"
            }).then(() => {
                reiniciarJogo();
            });
        }
    });
}

function reiniciarJogo() {
    palavra = "";
    escondida = "";
    tentativas = 5;
    letrasChutadas = [];
    
    document.getElementById("palavra").value = "";
    document.getElementById("dica").value = "";
    document.getElementById("dicaTela").innerHTML = "---";
    document.getElementById("palavraTela").innerHTML = "";
    document.getElementById("tentativasTela").innerHTML = "5";
    document.getElementById("chutadasTela").innerHTML = "";
    
    document.querySelector(".criar-palavra").style.display = "block";
    document.getElementById("jogoArea").style.display = "none";
}