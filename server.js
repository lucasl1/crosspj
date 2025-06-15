const express = require('express');
const WebSocket = require('ws');
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server });

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname)));

// Rota para servir o index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Ler planilha
function readExcel(fileName) {
  try {
    if (!fs.existsSync(fileName)) {
      console.error(`Erro: Arquivo ${fileName} não encontrado`);
      return [];
    }
    const workbook = XLSX.readFile(fileName, { cellText: true, raw: true });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const json = XLSX.utils.sheet_to_json(sheet, { raw: true, defval: '' });
    console.log(`Dados lidos de ${fileName}:`, json);
    return json;
  } catch (error) {
    console.error(`Erro ao ler ${fileName}:`, error.message);
    return [];
  }
}

// Enviar dados para clientes
function broadcastData() {
  const rankingData = readExcel('campeonato_crossfit.xlsx');
  const top5Data = readExcel('current_top5.xlsx');
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({
        ranking: rankingData,
        top5: top5Data
      }));
    }
  });
}

// Monitorar alterações nas planilhas
fs.watchFile('campeonato_crossfit.xlsx', { interval: 1000 }, () => {
  console.log('Planilha campeonato_crossfit.xlsx atualizada');
  broadcastData();
});
fs.watchFile('current_top5.xlsx', { interval: 1000 }, () => {
  console.log('Planilha current_top5.xlsx atualizada');
  broadcastData();
});

// Enviar dados iniciais
wss.on('connection', (ws) => {
  console.log('Cliente conectado');
  broadcastData();
  ws.on('error', (error) => {
    console.error('Erro no cliente WebSocket:', error);
  });
});

wss.on('error', (error) => {
  console.error('Erro no servidor WebSocket:', error);
});

// Iniciar o servidor
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});