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
function readExcel() {
  try {
    if (!fs.existsSync('campeonato_crossfit.xlsx')) {
      console.error('Erro: Arquivo campeonato_crossfit.xlsx não encontrado');
      return [];
    }
    const workbook = XLSX.readFile('campeonato_crossfit.xlsx', { cellText: true, raw: true });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const json = XLSX.utils.sheet_to_json(sheet, { raw: true, defval: '' });
    console.log('Dados lidos da planilha:', json);
    return json;
  } catch (error) {
    console.error('Erro ao ler planilha:', error.message);
    return [];
  }
}

// Enviar dados para clientes
function broadcastData() {
  const data = readExcel();
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

// Monitorar alterações na planilha
fs.watchFile('campeonato_crossfit.xlsx', { interval: 1000 }, (curr, prev) => {
  console.log('Planilha atualizada');
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
const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});