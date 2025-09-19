// wistia-player-clean.js
export function initWistiaPlayerClean() {
  const container = document.querySelector('.video-container');
  if (!container) return;

  const mediaId = 'zkvnpe7g8j';
  const aspectRatio = 0.5625;

  // Cria o player Wistia
  const player = document.createElement('wistia-player');
  player.setAttribute('media-id', mediaId);
  player.setAttribute('aspect', aspectRatio);
  player.setAttribute('autoplay', 'true');
  player.setAttribute('muted', 'false'); // tenta autoplay com áudio
  player.setAttribute('controls-visible-on-load', 'false'); // esconde controles padrão
  player.setAttribute('volume-control', 'false'); // esconde controle de volume
  player.setAttribute('fullscreen-button', 'false'); // esconde fullscreen
  player.setAttribute('rounded-player', '12');
  container.appendChild(player);

  container.style.position = 'relative';

  // Botão flutuante de mute/unmute
  const soundButton = document.createElement('button');
  soundButton.textContent = '🔇';
  Object.assign(soundButton.style, {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    zIndex: '10',
    background: 'rgba(0,0,0,0.5)',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    cursor: 'pointer',
    fontSize: '18px',
  });
  container.appendChild(soundButton);

  // Overlay para ativar som se autoplay for bloqueado
  const clickToUnmute = document.createElement('div');
  clickToUnmute.textContent = 'Clique para ativar o som';
  Object.assign(clickToUnmute.style, {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'rgba(0,0,0,0.7)',
    color: '#fff',
    padding: '12px 20px',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    zIndex: '15',
    display: 'none',
    textAlign: 'center',
  });
  container.appendChild(clickToUnmute);

  // Carrega scripts Wistia
  const scriptPlayer = document.createElement('script');
  scriptPlayer.src = 'https://fast.wistia.com/player.js';
  scriptPlayer.async = true;
  document.body.appendChild(scriptPlayer);

  const scriptEmbed = document.createElement('script');
  scriptEmbed.src = `https://fast.wistia.com/embed/${mediaId}.js`;
  scriptEmbed.type = 'module';
  scriptEmbed.async = true;
  document.body.appendChild(scriptEmbed);

  // Blur enquanto o player carrega
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

  // Toggle mute/unmute no botão externo
  soundButton.addEventListener('click', () => {
    if (player.muted) {
      player.muted = false;
      soundButton.textContent = '🔇';
    } else {
      player.muted = true;
      soundButton.textContent = '🔊';
    }
  });

  // Tenta autoplay com som
  window.addEventListener('load', async () => {
    try {
      await player.play();
      player.muted = false;
    } catch (e) {
      player.muted = true;
      clickToUnmute.style.display = 'block';
    }
  });

  // Clique no overlay para ativar som
  clickToUnmute.addEventListener('click', async () => {
    try {
      await player.play();
      player.muted = false;
      clickToUnmute.style.display = 'none';
    } catch (e) {
      console.error('Não foi possível ativar som:', e);
    }
  });
}
