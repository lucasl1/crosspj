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
  // Ordenar por Score decrescente
  const sortedData = data.sort((a, b) => (b.Score || 0) - (a.Score || 0));

  // Limpar pódio
  first.querySelector('.name').textContent = '';
  first.querySelector('.score').textContent = '';
  second.querySelector('.name').textContent = '';
  second.querySelector('.score').textContent = '';
  third.querySelector('.name').textContent = '';
  third.querySelector('.score').textContent = '';

  // Atualizar pódio
  if (sortedData.length > 0 && sortedData[0].Atleta) {
    first.querySelector('.name').textContent = sortedData[0].Atleta;
    first.querySelector('.score').textContent = `Score: ${sortedData[0].Score || ''}`;
  }
  if (sortedData.length > 1 && sortedData[1].Atleta) {
    second.querySelector('.name').textContent = sortedData[1].Atleta;
    second.querySelector('.score').textContent = `Score: ${sortedData[1].Score || ''}`;
  }
  if (sortedData.length > 2 && sortedData[2].Atleta) {
    third.querySelector('.name').textContent = sortedData[2].Atleta;
    third.querySelector('.score').textContent = `Score: ${sortedData[2].Score || ''}`;
  }

  // Atualizar tabela
  tableBody.innerHTML = '';
  sortedData.forEach((row, index) => {
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-gray-700 transition-colors';
    tr.innerHTML = `
      <td class="py-4 px-6">${index + 1}</td>
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