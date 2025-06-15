const tableBody = document.getElementById('tableBody');
const first = document.getElementById('first');
const second = document.getElementById('second');
const third = document.getElementById('third');
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
  ws.onopen = () => {
    console.log('WebSocket conectado');
  };
  ws.onerror = (error) => {
    console.error('Erro no WebSocket:', error);
  };
  ws.onclose = () => {
    console.log('WebSocket desconectado, tentando reconectar...');
    setTimeout(connectWebSocket, 1000);
  };
  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      console.log('Dados recebidos:', data);
      updateDisplay(data);
    } catch (error) {
      console.error('Erro ao processar mensagem WebSocket:', error);
    }
  };
}

connectWebSocket();

// Atualizar exibição da tabela
function updateDisplay(data) {
  // Limpar pódio
  first.querySelector('.name').textContent = '';
  first.querySelector('.score').textContent = '';
  second.querySelector('.name').textContent = '';
  second.querySelector('.score').textContent = '';
  third.querySelector('.name').textContent = '';
  third.querySelector('.score').textContent = '';

  // Atualizar pódio
  if (data.length > 0 && data[0].Atleta) {
    first.querySelector('.name').textContent = data[0].Atleta;
    first.querySelector('.score').textContent = `Score: ${data[0].Score || ''}`;
  }
  if (data.length > 1 && data[1].Atleta) {
    second.querySelector('.name').textContent = data[1].Atleta;
    second.querySelector('.score').textContent = `Score: ${data[1].Score || ''}`;
  }
  if (data.length > 2 && data[2].Atleta) {
    third.querySelector('.name').textContent = data[2].Atleta;
    third.querySelector('.score').textContent = `Score: ${data[2].Score || ''}`;
  }

  // Atualizar tabela
  tableBody.innerHTML = '';
  data.forEach(row => {
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-gray-700 transition-colors';
    tr.innerHTML = `
      <td class="py-4 px-6">${row.Posição || ''}</td>
      <td class="py-4 px-6">${row.Atleta || ''}</td>
      <td class="py-4 px-6">${row.Score || ''}</td>
      <td class="py-4 px-6">${row.Categoria || ''}</td>
      <td class="py-4 px-6">${row.WOD_1 || ''}</td>
      <td class="py-4 px-6">${row.WOD_2 || ''}</td>
      <td class="py-4 px-6">${row.WOD_3 || ''}</td>
    `;
    tableBody.appendChild(tr);
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
    playPauseBtn.classList.remove('bg-blue-500', 'hover:bg-blue-600');
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
        playPauseBtn.classList.add('bg-blue-500', 'hover:bg-blue-600');
      }
    }, 1000);
  } else {
    clearInterval(timerInterval);
    isRunning = false;
    playPauseBtn.textContent = 'Play';
    playPauseBtn.classList.remove('bg-red-500', 'hover:bg-red-600');
    playPauseBtn.classList.add('bg-blue-500', 'hover:bg-blue-600');
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
  playPauseBtn.classList.add('bg-blue-500', 'hover:bg-blue-600');
});