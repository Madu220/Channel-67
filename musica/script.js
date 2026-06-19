var artistas = {
  "Billie Eilish": {
    emoji: "🥑",
    foto: "images/billie.jpg",
    musicas: ["billie eilish bad guy","billie eilish lovely","billie eilish birds of a feather","billie eilish happier than ever","billie eilish what was i made for","billie eilish ocean eyes","billie eilish everything i wanted","billie eilish lunch","billie eilish chihiro","billie eilish bury a friend"]
  },
  "Rihanna": {
    emoji: "💎",
    foto: "images/rihanna.jpg",
    musicas: ["rihanna umbrella","rihanna diamonds","rihanna we found love","rihanna work","rihanna stay","rihanna dont stop the music","rihanna only girl","rihanna rude boy","rihanna love on the brain","rihanna needed me"]
  },
  "Beyoncé": {
    emoji: "🐝",
    foto: "images/beyonce.jpg",
    musicas: ["beyonce halo","beyonce single ladies","beyonce run the world girls","beyonce irreplaceable","beyonce drunk in love","beyonce love on top","beyonce formation","beyonce countdown","beyonce texas hold em","beyonce crazy in love"]
  },
  "Ariana Grande": {
    emoji: "☁️",
    foto: "images/ariana.jpg",
    musicas: ["ariana grande 7 rings","ariana grande thank u next","ariana grande problem","ariana grande no tears left to cry","ariana grande one last time","ariana grande break free","ariana grande into you","ariana grande positions","ariana grande breathin","ariana grande god is a woman"]
  },
  "Olivia Rodrigo": {
    emoji: "💔",
    foto: "images/olivia.jpg",
    musicas: ["olivia rodrigo drivers license","olivia rodrigo deja vu","olivia rodrigo my way","olivia rodrigo traitor","olivia rodrigo vampire","olivia rodrigo get him back","olivia rodrigo bad idea right","olivia rodrigo obsessed","olivia rodrigo expectations","olivia rodrigo stupid song"]
  },
  "Taylor Swift": {
    emoji: "🌟",
    foto: "images/taylor.jpg",
    musicas: ["taylor swift shake it off","taylor swift blank space","taylor swift love story","taylor swift anti hero","taylor swift cruel summer","taylor swift you belong with me","taylor swift wildest dreams","taylor swift style","taylor swift bad blood","taylor swift cardigan"]
  },
  "Michael Jackson": {
    emoji: "🕺",
    foto: "images/michael.jpg",
    musicas: ["michael jackson billie jean","michael jackson thriller","michael jackson beat it","michael jackson smooth criminal","michael jackson black or white","michael jackson bad","michael jackson man in the mirror","michael jackson rock with you","michael jackson earth song","michael jackson dont stop till you get enough"]
  },
  "Lana Del Rey": {
    emoji: "🌹",
    foto: "images/lana.jpg",
    musicas: ["lana del rey summertime sadness","lana del rey young and beautiful","lana del rey born to die","lana del rey video games","lana del rey blue jeans","lana del rey west coast","lana del rey doin time","lana del rey national anthem","lana del rey ride","lana del rey hope is a dangerous thing"]
  },
  "The Weeknd": {
    emoji: "🌙",
    foto: "images/thw.jpg",
    musicas: ["the weeknd blinding lights","the weeknd starboy","the weeknd save your tears","the weeknd the hills","the weeknd cant feel my face","the weeknd die for you","the weeknd often","the weeknd call out my name","the weeknd less than zero","the weeknd alone again"]
  },
  "Justin Bieber": {
    emoji: "🎤",
    foto: "images/justin.jpg",
    musicas: ["justin bieber baby","justin bieber sorry","justin bieber love yourself","justin bieber what do you mean","justin bieber peaches","justin bieber ghost","justin bieber boyfriend","justin bieber yummy","justin bieber intentions","justin bieber stay"]
  },
  "Luan Santana": {
    emoji: "🤠",
    foto: "images/luan.jpg",
    musicas: ["luan santana meteoro","luan santana te esperando","luan santana tudo que voce quiser","luan santana acordando o predio","luan santana eu voce o mar e ela","luan santana morena","luan santana erro planejado","luan santana clone","luan santana deja vu","luan santana eu sou sentimento"]
  },
  "PinkPantheress": {
    emoji: "🩷",
    foto: "images/pink.jpg",
    musicas: ["pinkpantheress pain","pinkpantheress just for me","pinkpantheress break it off","pinkpantheress boys a liar pt 2","pinkpantheress take me home","pinkpantheress nice to meet you","pinkpantheress turn it up","pinkpantheress tonight","pinkpantheress illegal","pinkpantheress stars"]
  },
  "Marina Sena": {
    emoji: "🌺",
    foto: "images/marina.jpg",
    musicas: ["marina sena por supuesto","marina sena me toca","marina sena voltei pra mim","marina sena tudo pra amar voce","marina sena dano sarrada","marina sena pelejei","marina sena vinho","marina sena omnira","marina sena coisas naturais","marina sena numa ilha"]
  },
  "Lady Gaga": {
    emoji: "🎤",
    foto: "images/lady.jpg",
    musicas: ["lady gaga bad romance","lady gaga poker face","lady gaga paparazzi","lady gaga just dance","lady gaga telephone","lady gaga born this way","lady gaga applause","lady gaga shallow","lady gaga die with a smile","lady gaga vanish into you"]
  },
  "Kali Uchis": {
    emoji: "🦋",
    foto: "images/kali.jpg",
    musicas: ["kali uchis telepatia","kali uchis moonlight","kali uchis after the storm","kali uchis fue mejor","kali uchis igual que un angel","kali uchis dead to me","kali uchis melting","kali uchis i wish you roses","kali uchis no hay ley","kali uchis never be yours"]
  }
};

// Estado do jogo
var jogo = {
  artista: '',
  tracks: [],
  rodada: 0,
  pontos: 0,
  respostas: [],
  audio: null,
  timer: null,
  esperando: false
};

// Funções auxiliares
function embaralhar(arr) {
  return arr.sort(function() { return Math.random() - 0.5; });
}

function $(id) {
  return document.getElementById(id);
}

function mostrarTela(id) {
  var telas = document.querySelectorAll('.tela');
  for (var i = 0; i < telas.length; i++) {
    if (telas[i].id === id) {
      telas[i].classList.add('ativa');
    } else {
      telas[i].classList.remove('ativa');
    }
  }
}

function feedback(msg, tipo) {
  var el = $('feedback');
  el.className = 'feedback ' + tipo;
  el.textContent = msg;
}

function pararAudio() {
  if (jogo.timer) {
    clearInterval(jogo.timer);
    jogo.timer = null;
  }
  if (jogo.audio) {
    try {
      jogo.audio.pause();
      jogo.audio.src = '';
    } catch(e) {}
    jogo.audio = null;
  }
}

// Busca no iTunes via JSONP
function buscarMusica(termo) {
  return new Promise(function(resolve) {
    var cb = 'cb_' + Math.random().toString(36).slice(2);
    var timeout = setTimeout(function() {
      delete window[cb];
      resolve(null);
    }, 8000);

    window[cb] = function(dados) {
      clearTimeout(timeout);
      delete window[cb];
      if (dados && dados.results && dados.results[0]) {
        var r = dados.results[0];
        resolve({
          titulo: r.trackName,
          preview: r.previewUrl || null,
          capa: r.artworkUrl100 ? r.artworkUrl100.replace('100x100', '300x300') : null
        });
      } else {
        resolve(null);
      }
    };

    var script = document.createElement('script');
    script.src = 'https://itunes.apple.com/search?term=' + encodeURIComponent(termo) + '&entity=song&limit=1&callback=' + cb;
    script.onerror = function() {
      clearTimeout(timeout);
      delete window[cb];
      resolve(null);
    };
    document.head.appendChild(script);
  });
}

function buscarTodas(nome) {
  var promessas = artistas[nome].musicas.map(function(termo) {
    return buscarMusica(termo);
  });
  return Promise.all(promessas).then(function(resultados) {
    return resultados.filter(function(r) { return r && r.preview; });
  });
}

// Montar grid de artistas
function iniciarGrid() {
  var grid = $('grid-artistas');
  var html = '';
  var nomes = Object.keys(artistas);
  for (var i = 0; i < nomes.length; i++) {
    var nome = nomes[i];
    var dados = artistas[nome];
    html += '<div class="card-artista" onclick="iniciarQuiz(\'' + nome + '\')">' +
      '<div class="foto-artista">' +
        '<img src="' + dados.foto + '" alt="' + nome + '" onerror="this.parentNode.innerHTML=\'<span>' + nome[0] + '</span>\'">' +
      '</div>' +
      '<div class="nome-artista">' + nome + '</div>' +
      '<div class="info-artista">' + dados.emoji + ' 10 rodadas</div>' +
    '</div>';
  }
  grid.innerHTML = html;
}

// Iniciar quiz
function iniciarQuiz(nome) {
  jogo = {
    artista: nome,
    tracks: [],
    rodada: 0,
    pontos: 0,
    respostas: [],
    audio: null,
    timer: null,
    esperando: false
  };

  pararAudio();
  mostrarTela('tela-quiz');
  $('nome-artista-quiz').textContent = nome;
  $('pontos').textContent = '0';
  $('alternativas').innerHTML = '';
  feedback('', 'escondido');
  $('player').innerHTML = '<div class="carregando"><span class="spinner"></span>Buscando músicas no iTunes...</div>';

  buscarTodas(nome).then(function(tracks) {
    if (tracks.length < 4) {
      $('player').innerHTML = '<div class="carregando">⚠ Não foi possível carregar as músicas.</div>';
      return;
    }
    jogo.tracks = embaralhar(tracks).slice(0, 10);
    carregarRodada();
  });
}

// Carregar rodada
function carregarRodada() {
  if (jogo.rodada >= jogo.tracks.length) {
    mostrarResultado();
    return;
  }

  pararAudio();
  feedback('', 'escondido');
  jogo.esperando = false;

  var total = jogo.tracks.length;
  $('tag-rodada').textContent = 'Rodada ' + (jogo.rodada + 1) + '/' + total;

  var correta = jogo.tracks[jogo.rodada];
  var capaEl = $('capa-album');

  if (correta.capa) {
    capaEl.innerHTML = '<img src="' + correta.capa + '" alt="capa">';
  } else {
    capaEl.innerHTML = '<span class="icone">🎧</span>';
  }

  var erradas = embaralhar(jogo.tracks.filter(function(t) { return t.titulo !== correta.titulo; })).slice(0, 3);
  var opcoes = embaralhar([correta].concat(erradas));

  var html = '';
  for (var i = 0; i < opcoes.length; i++) {
    var op = opcoes[i];
    html += '<button class="btn-alternativa" onclick="responder(this, \'' + op.titulo.replace(/'/g, "\\'") + '\', \'' + correta.titulo.replace(/'/g, "\\'") + '\')">' + op.titulo + '</button>';
  }
  $('alternativas').innerHTML = html;

  montarPlayer(correta.preview);
}

// Player de áudio
function montarPlayer(url) {
  if (!url) {
    $('player').innerHTML = '<div class="carregando">⚠ Sem preview disponível.</div>';
    jogo.esperando = true;
    return;
  }

  $('player').innerHTML = '<div class="linha-player">' +
    '<button class="btn-play" id="btn-play" onclick="tocarAudio(\'' + url + '\')">▶</button>' +
    '<span class="texto-player" id="texto-player">Clique para ouvir 7 segundos</span>' +
    '</div>' +
    '<div class="dica-player">Ouça o trecho e escolha o nome da música</div>';
}

function tocarAudio(url) {
  var btn = $('btn-play');
  if (btn.disabled) return;

  btn.classList.add('tocando');
  btn.textContent = '♫';
  btn.disabled = true;

  var audio = new Audio(url);
  jogo.audio = audio;
  var segundos = 0;
  var iniciado = false;

  audio.addEventListener('playing', function() {
    if (iniciado) return;
    iniciado = true;
    jogo.esperando = true;

    jogo.timer = setInterval(function() {
      segundos += 0.1;
      var restam = Math.ceil(7 - segundos);
      var textoEl = $('texto-player');

      if (textoEl) {
        textoEl.textContent = restam > 0 ? '⏱ ' + restam + 's restantes...' : '⏱ Fim!';
      }

      if (segundos >= 7) {
        pararAudio();
        btn.textContent = '✓';
        btn.classList.remove('tocando');
        feedback('Trecho finalizado! Escolha uma opção.', 'info');
      }
    }, 100);
  }, { once: true });

  audio.addEventListener('error', function() {
    btn.disabled = false;
    btn.classList.remove('tocando');
    btn.textContent = '▶';
    jogo.esperando = true;
  });

  audio.play().catch(function() {
    btn.disabled = false;
    btn.classList.remove('tocando');
    btn.textContent = '▶';
    jogo.esperando = true;
  });
}

// Processar resposta
function responder(btn, resposta, correta) {
  if (!jogo.esperando) return;
  jogo.esperando = false;
  pararAudio();

  var botoes = document.querySelectorAll('.btn-alternativa');
  for (var i = 0; i < botoes.length; i++) {
    botoes[i].disabled = true;
  }

  var acertou = resposta === correta;

  if (acertou) {
    jogo.pontos++;
    $('pontos').textContent = jogo.pontos;
    btn.classList.add('certa');
    feedback('✓ Correto! +1 ponto', 'ok');
  } else {
    btn.classList.add('errada');
    for (var i = 0; i < botoes.length; i++) {
      if (botoes[i].textContent === correta) botoes[i].classList.add('certa');
    }
    feedback('✗ Era "' + correta + '"', 'erro');
  }

  jogo.respostas.push({ titulo: correta, acertou: acertou });

  setTimeout(function() {
    jogo.rodada++;
    carregarRodada();
  }, 2000);
}

// Mostrar resultado
function mostrarResultado() {
  pararAudio();
  mostrarTela('tela-resultado');

  var pontos = jogo.pontos;
  var total = jogo.tracks.length;
  var pct = pontos / total;

  var emoji, titulo, msg;

  if (pct === 1) {
    emoji = '🏆';
    titulo = 'Perfeito!';
    msg = pontos + '/' + total + ' – Você é um verdadeiro expert! 🎉';
  } else if (pct >= 0.8) {
    emoji = '💫';
    titulo = 'Excelente!';
    msg = 'Incrível! Quase tudo certo!';
  } else if (pct >= 0.6) {
    emoji = '🎤';
    titulo = 'Muito bem!';
    msg = 'Você arrasou no quiz!';
  } else if (pct >= 0.4) {
    emoji = '🎵';
    titulo = 'Bom trabalho!';
    msg = 'Você conhece as músicas!';
  } else if (pct >= 0.2) {
    emoji = '😅';
    titulo = 'Continue tentando!';
    msg = 'Você está melhorando!';
  } else {
    emoji = '😢';
    titulo = 'Quase lá!';
    msg = 'Ouça mais e tente de novo!';
  }

  $('emoji-resultado').textContent = emoji;
  $('titulo-resultado').textContent = titulo;
  $('numero-resultado').textContent = pontos;
  $('de-resultado').textContent = 'de ' + total + ' acertos';
  $('msg-resultado').textContent = msg;

  var lista = $('lista-respostas');
  var html = '';
  for (var i = 0; i < jogo.respostas.length; i++) {
    var r = jogo.respostas[i];
    html += '<div class="item-resposta ' + (r.acertou ? 'ok' : 'erro') + '">' +
      '<span>' + (r.acertou ? '✓' : '✗') + '</span>' +
      '<span>' + r.titulo + '</span>' +
    '</div>';
  }
  lista.innerHTML = html;
}

// Navegação
function voltarInicio() {
  pararAudio();
  mostrarTela('tela-inicio');
}

function jogarNovamente() {
  iniciarQuiz(jogo.artista);
}

// Glitter no fundo
function criarGlitterBackground() {
  var container = document.getElementById('glitterBackground');
  if (!container) return;

  for (var i = 0; i < 45; i++) {
    var particula = document.createElement('div');
    particula.className = 'glitter-particle';
    var tamanho = Math.random() * 8 + 3;
    var left = Math.random() * 100;
    var duracao = Math.random() * 8 + 6;
    var delay = Math.random() * 10;
    var maxOpacity = Math.random() * 0.5 + 0.2;
    var drift = (Math.random() - 0.5) * 100;
    particula.style.cssText = 'width:' + tamanho + 'px;height:' + tamanho + 'px;left:' + left + '%;bottom:-20px;--duration:' + duracao + 's;--delay:' + delay + 's;--maxOpacity:' + maxOpacity + ';--drift:' + drift + 'px;';
    container.appendChild(particula);
  }

  var emojis = ['✨'];
  for (var j = 0; j < 22; j++) {
    var estrela = document.createElement('div');
    estrela.className = 'sparkle-star';
    estrela.textContent = emojis[0];
    var tamanho = Math.random() * 18 + 10;
    var left = Math.random() * 100;
    var top = Math.random() * 100;
    var duracao = Math.random() * 4 + 2;
    var delay = Math.random() * 6;
    var maxOpacity = Math.random() * 0.6 + 0.2;
    estrela.style.cssText = 'left:' + left + '%;top:' + top + '%;--size:' + tamanho + 'px;--duration:' + duracao + 's;--delay:' + delay + 's;--maxOpacity:' + maxOpacity + ';';
    container.appendChild(estrela);
  }
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
  criarGlitterBackground();
  iniciarGrid();
});