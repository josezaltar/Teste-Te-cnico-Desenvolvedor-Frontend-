// ================= PODCAST PLAYER =================

const audio = document.getElementById('podcast-audio');
const playBtn = document.getElementById('podcast-play');
const playIcon = document.getElementById('podcast-play-icon');
const progressBar = document.getElementById('podcast-progress');
const progressFill = document.getElementById('podcast-progress-fill');
const progressThumb = document.getElementById('podcast-progress-thumb');
const timeDisplay = document.getElementById('podcast-time');
const volumeIcon = document.getElementById('podcast-volume-icon');
const volumeBar = document.getElementById('podcast-volume-bar');
const volumeFill = document.getElementById('podcast-volume-fill');
const volumeThumb = document.getElementById('podcast-volume-thumb');

// Formata tempo em mm:ss
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Play/Pause
playBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playIcon.classList.remove('fa-play');
    playIcon.classList.add('fa-pause');
  } else {
    audio.pause();
    playIcon.classList.remove('fa-pause');
    playIcon.classList.add('fa-play');
  }
});

// Atualiza progresso enquanto toca
audio.addEventListener('timeupdate', () => {
  const percent = (audio.currentTime / audio.duration) * 100 || 0;
  progressFill.style.width = `${percent}%`;
  progressThumb.style.left = `${percent}%`;
  timeDisplay.textContent = formatTime(audio.currentTime);
});

// Clique na barra de progresso
progressBar.addEventListener('click', (e) => {
  const rect = progressBar.getBoundingClientRect();
  const percent = (e.clientX - rect.left) / rect.width;
  audio.currentTime = percent * audio.duration;
});

// Drag na barra de progresso
let isDraggingProgress = false;

progressThumb.addEventListener('mousedown', () => {
  isDraggingProgress = true;
});

document.addEventListener('mousemove', (e) => {
  if (!isDraggingProgress) return;
  const rect = progressBar.getBoundingClientRect();
  let percent = (e.clientX - rect.left) / rect.width;
  percent = Math.max(0, Math.min(1, percent));
  audio.currentTime = percent * audio.duration;
});

document.addEventListener('mouseup', () => {
  isDraggingProgress = false;
});

// Controle de volume - clique
volumeBar.addEventListener('click', (e) => {
  const rect = volumeBar.getBoundingClientRect();
  const percent = (e.clientX - rect.left) / rect.width;
  audio.volume = Math.max(0, Math.min(1, percent));
  updateVolumeUI();
});

// Drag no volume
let isDraggingVolume = false;

volumeThumb.addEventListener('mousedown', () => {
  isDraggingVolume = true;
});

document.addEventListener('mousemove', (e) => {
  if (!isDraggingVolume) return;
  const rect = volumeBar.getBoundingClientRect();
  let percent = (e.clientX - rect.left) / rect.width;
  percent = Math.max(0, Math.min(1, percent));
  audio.volume = percent;
  updateVolumeUI();
});

document.addEventListener('mouseup', () => {
  isDraggingVolume = false;
});

// Atualiza UI do volume
function updateVolumeUI() {
  const percent = audio.volume * 100;
  volumeFill.style.width = `${percent}%`;
  volumeThumb.style.left = `${percent}%`;
  
  const icon = volumeIcon.querySelector('i');
  icon.classList.remove('fa-volume-high', 'fa-volume-low', 'fa-volume-xmark');
  
  if (audio.volume === 0) {
    icon.classList.add('fa-volume-xmark');
  } else if (audio.volume < 0.5) {
    icon.classList.add('fa-volume-low');
  } else {
    icon.classList.add('fa-volume-high');
  }
}

// Mute/Unmute
let previousVolume = 0.66;

volumeIcon.addEventListener('click', () => {
  if (audio.volume > 0) {
    previousVolume = audio.volume;
    audio.volume = 0;
  } else {
    audio.volume = previousVolume;
  }
  updateVolumeUI();
});

// Quando o áudio termina
audio.addEventListener('ended', () => {
  playIcon.classList.remove('fa-pause');
  playIcon.classList.add('fa-play');
  progressFill.style.width = '0%';
  progressThumb.style.left = '0%';
});

// Inicializa
audio.volume = 0.66;
updateVolumeUI();