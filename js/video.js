// ================= VIDEO PLAYER (YOUTUBE) =================

const videoContainer = document.getElementById('video-container');
const videoThumbnail = document.getElementById('video-thumbnail');
const videoPlayBtn = document.getElementById('video-play-btn');
const videoOverlay = document.getElementById('video-overlay');
const videoIframeWrapper = document.getElementById('video-iframe-wrapper');
const videoIframe = document.getElementById('video-iframe');

// ID do vídeo do YouTube (pode trocar por qualquer vídeo)
// Exemplos de como extrair o ID:
// https://www.youtube.com/watch?v=VIDEO_ID
// https://youtu.be/VIDEO_ID
const YOUTUBE_VIDEO_ID = 'dQw4w9WgXcQ'; // Substitua pelo ID do vídeo desejado

// Função para extrair ID do YouTube de uma URL
function extractYouTubeId(url) {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/ // ID direto
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

// Função para carregar o vídeo
function loadVideo(videoId) {
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
  videoIframe.src = embedUrl;
  
  // Esconde thumbnail e botão, mostra iframe
  videoThumbnail.classList.add('hidden');
  videoPlayBtn.classList.add('hidden');
  videoOverlay.classList.add('hidden');
  videoIframeWrapper.classList.add('active');
}

// Clique no botão play
videoPlayBtn.addEventListener('click', () => {
  loadVideo(YOUTUBE_VIDEO_ID);
});

// Clique na thumbnail também inicia o vídeo
videoThumbnail.addEventListener('click', () => {
  loadVideo(YOUTUBE_VIDEO_ID);
});

// Função pública para trocar o vídeo (pode ser chamada externamente)
window.changeVideo = function(urlOrId) {
  const videoId = extractYouTubeId(urlOrId) || urlOrId;
  
  // Reset do player
  videoThumbnail.classList.remove('hidden');
  videoPlayBtn.classList.remove('hidden');
  videoOverlay.classList.remove('hidden');
  videoIframeWrapper.classList.remove('active');
  videoIframe.src = '';
  
  // Atualiza thumbnail com a do YouTube
  videoThumbnail.src = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  
  // Atualiza o ID para o próximo play
  window.currentVideoId = videoId;
};

// Permite trocar vídeo dinamicamente
window.currentVideoId = YOUTUBE_VIDEO_ID;

// Atualiza o listener para usar o ID atual
videoPlayBtn.addEventListener('click', () => {
  loadVideo(window.currentVideoId || YOUTUBE_VIDEO_ID);
});