// wistia-player-autoplay-direct.js

export function initWistiaPlayerAutoplayDirect() {
  const container = document.querySelector('.video-container');
  if (!container) return;

  const mediaId = 'zkvnpe7g8j';
  const aspectRatio = 0.5625; // 16:9

  // Cria o player Wistia
  const player = document.createElement('wistia-player');
  player.setAttribute('media-id', mediaId);
  player.setAttribute('aspect', aspectRatio);
  player.setAttribute('autoplay', 'true'); // Autoplay ativo
  player.setAttribute('muted', 'true');   // Inicia SEM som para garantir o autoplay
  player.setAttribute('controls-visible-on-load', 'false');
  player.setAttribute('rounded-player', '12');
  player.setAttribute('lazy-load', 'true');
  player.setAttribute('volume-control', 'false'); // Desativa o controle de volume padrão do Wistia
  container.appendChild(player);

  // Botão de mute/unmute
  const soundButton = document.createElement('button');
  soundButton.textContent = '🔊'; // Indica que o som está mudo
  soundButton.style.position = 'absolute';
  soundButton.style.bottom = '10px';
  soundButton.style.right = '10px';
  soundButton.style.zIndex = '10';
  soundButton.style.background = 'rgba(0,0,0,0.5)';
  soundButton.style.color = '#fff';
  soundButton.style.border = 'none';
  soundButton.style.borderRadius = '50%';
  soundButton.style.width = '40px';
  soundButton.style.height = '40px';
  soundButton.style.cursor = 'pointer';
  container.style.position = 'relative';
  container.appendChild(soundButton);

  // Carrega scripts do Wistia
  const scriptPlayer = document.createElement('script');
  scriptPlayer.src = 'https://fast.wistia.com/player.js';
  scriptPlayer.async = true;
  document.body.appendChild(scriptPlayer);

  const scriptEmbed = document.createElement('script');
  scriptEmbed.src = `https://fast.wistia.com/embed/${mediaId}.js`;
  scriptEmbed.type = 'module';
  scriptEmbed.async = true;
  document.body.appendChild(scriptEmbed);

  // Estilo de carregamento (blur enquanto carrega)
  const style = document.createElement('style');
  style.innerHTML = `
    wistia-player[media-id='${mediaId}']:not(:defined) {
      background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/${mediaId}/swatch');
      display: block;
      filter: blur(5px);
      padding-top: ${aspectRatio * 100}%;
    }
  `;
  document.head.appendChild(style);

  // Lógica para controle do botão
  let isMuted = true;
  soundButton.addEventListener('click', () => {
    isMuted = !isMuted;
    if (isMuted) {
      player.muted = true;
      soundButton.textContent = '🔊';
    } else {
      player.muted = false;
      soundButton.textContent = '🔇';
    }
  });

  // Garante que o vídeo está mutado e rodando ao carregar
  window.addEventListener('load', () => {
    player.autoplay = true;
    player.muted = true;
    soundButton.textContent = '🔊'; // Botão inicia no estado de mudo
  });
}