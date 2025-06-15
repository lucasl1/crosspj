const tableBody = document.getElementById('tableBody');
const first = document.getElementById('first');
const second = document.getElementById('second');
const third = document.getElementById('third');
let ws;

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
      updateDisplay(data);
    } catch (error) {
      console.error('Erro ao processar mensagem WebSocket:', error);
    }
  };
}

connectWebSocket();

// Atualizar exibição
function updateDisplay(data) {
  first.querySelector('.name').textContent = '';
  first.querySelector('.score').textContent = '';
  second.querySelector('.name').textContent = '';
  second.querySelector('.score').textContent = '';
  third.querySelector('.name').textContent = '';
  third.querySelector('.score').textContent = '';

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