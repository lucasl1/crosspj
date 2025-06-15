const top5Table = document.getElementById('top5Table');
const timerInput = document.getElementById('timerInput');
const playPauseBtn = document.getElementById('playPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const timerDisplay = document.getElementById('timerDisplay');
let ws;
let timerInterval;
let isRunning = false;
let totalSeconds = 0;

// Conectar ao WebSocket
function connectWebSocket() {
  ws = new WebSocket('ws://localhost:8080');
  ws.onopen = () => console.log('WebSocket conectado');
  ws.onerror = (error) => console.error('Erro no WebSocket:', error);
  ws.onclose = () => {
    console.log('WebSocket desconectado, tentando reconectar...');
    setTimeout(connectWebSocket, 1000);
  };
  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      console.log('Dados recebidos:', data);
      updateTop5(data);
    } catch (error) {
      console.error('Erro ao processar mensagem WebSocket:', error);
    }
  };
}

connectWebSocket();

// Atualizar exibição do TOP 5
function updateTop5(data) {
  top5Table.innerHTML = '';
  const top5 = data.slice(0, 5);
  top5.forEach((row, index) => {
    const div = document.createElement('div');
    div.className = 'bg-gray-700 p-4 rounded-lg shadow-md flex justify-between items-center';
    div.innerHTML = `
      <span class="text-lg font-semibold">${index + 1}º ${row.Atleta || ''}</span>
      <span class="text-sm">Score: ${row.Score || ''} | Categoria: ${row.Categoria || ''}</span>
    `;
    top5Table.appendChild(div);
  });
}

// Função para formatar o tempo (MM:SS)
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

// Validar e converter input de tempo para segundos
function parseTimeInput(input) {
  const regex = /^(\d+):(\d{2})$/;
  const match = input.match(regex);
  if (!match) return null;
  const minutes = parseInt(match[1]);
  const seconds = parseInt(match[2]);
  if (seconds > 59) return null;
  return minutes * 60 + seconds;
}

// Atualizar exibição do timer
function updateTimerDisplay() {
  timerDisplay.textContent = formatTime(totalSeconds);
}

// Iniciar ou pausar o timer
playPauseBtn.addEventListener('click', () => {
  if (!isRunning) {
    const inputTime = parseTimeInput(timerInput.value);
    if (inputTime === null && totalSeconds === 0) {
      alert('Por favor, insira um tempo válido no formato MM:SS');
      return;
    }
    if (totalSeconds === 0) totalSeconds = inputTime;
    playPauseBtn.textContent = 'Pause';
    playPauseBtn.classList.remove('bg-green-500', 'hover:bg-green-600');
    playPauseBtn.classList.add('bg-red-500', 'hover:bg-red-600');
    isRunning = true;
    timerInterval = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--;
        updateTimerDisplay();
      } else {
        clearInterval(timerInterval);
        isRunning = false;
        playPauseBtn.textContent = 'Play';
        playPauseBtn.classList.remove('bg-red-500', 'hover:bg-red-600');
        playPauseBtn.classList.add('bg-green-500', 'hover:bg-green-600');
      }
    }, 1000);
  } else {
    clearInterval(timerInterval);
    isRunning = false;
    playPauseBtn.textContent = 'Play';
    playPauseBtn.classList.remove('bg-red-500', 'hover:bg-red-600');
    playPauseBtn.classList.add('bg-green-500', 'hover:bg-green-600');
  }
});

// Resetar o timer
resetBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  isRunning = false;
  totalSeconds = parseTimeInput(timerInput.value) || 0;
  updateTimerDisplay();
  playPauseBtn.textContent = 'Play';
  playPauseBtn.classList.remove('bg-red-500', 'hover:bg-red-600');
  playPauseBtn.classList.add('bg-green-500', 'hover:bg-green-600');
});