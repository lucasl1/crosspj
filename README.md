# Campeonato de CrossFit

Sistema web para gerenciar e exibir resultados de competições de CrossFit em tempo real, com suporte a rankings, pódio, tabela de participantes, timer para provas e integração com planilhas Excel (`campeonato_crossfit.xlsx` e `current_top5.xlsx`). O frontend utiliza React com Framer Motion para interfaces dinâmicas e Tailwind CSS para estilização. O backend combina Express (HTTP) e WebSocket para atualizações em tempo real.

## Funcionalidades

- **Página Inicial**:
  - Título "Campeonato de CrossFit".
  - Botões para "Ranking Campeonato", "Current TOP 5" e "Qual função".
- **Ranking Campeonato**:
  - Pódio com os 3 primeiros colocados (1º, 2º, 3º) com nome e score.
  - Tabela com todos os atletas (Posição, Atleta, Score, Categoria, WOD_1, WOD_2, WOD_3).
  - Atualizações animadas via WebSocket (slide-in para tabela, fade para pódio).
- **Current TOP 5**:
  - Lista os 5 melhores atletas (Posição, Atleta, Score, Categoria) de uma planilha separada.
  - Timer regressivo com Play/Pause, Reset e input MM:SS, com animações.
  - Atualizações animadas via WebSocket.
- **Qual função**:
  - Interface experimental com ranking animado, mantida como placeholder para futuras expansões.
- **Backend**:
  - Servidor Express para arquivos estáticos.
  - WebSocket para envio de dados de duas planilhas.
  - Monitoramento de alterações nas planilhas.

## Tecnologias Utilizadas

- **Frontend**:
  - React (via CDN) com Framer Motion para animações.
  - Tailwind CSS para estilização.
  - Fontes: Poppins (Google Fonts).
- **Backend**:
  - Node.js com Express.
  - WebSocket (`ws`).
  - `xlsx` para leitura de planilhas.
- **Dependências**:
  - `express`, `ws`, `xlsx`.

## Estrutura do Projeto

```
campeonato-crossfit/
├── index.html          # Página inicial
├── ranking_react.html  # Ranking com React
├── top5_react.html     # TOP 5 com React
├── qual.html           # Função experimental
├── server.js           # Servidor Node.js
├── package.json        # Configuração do projeto
├── .gitignore          # Arquivos ignorados pelo Git
├── campeonato_crossfit.xlsx # Planilha para Ranking
├── current_top5.xlsx   # Planilha para TOP 5
└── README.md           # Documentação
```

## Requisitos

- Node.js (v18 ou superior).
- Navegador moderno (Chrome, Firefox, etc.).
- Software para editar planilhas Excel (Microsoft Excel, LibreOffice, etc.).
- Internet para carregar CDNs (Tailwind, React, Framer Motion).

## Instalação

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/campeonato-crossfit.git
   cd campeonato-crossfit
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Crie as planilhas Excel**:
   - **campeonato_crossfit.xlsx** (para Ranking):
     | Posição | Atleta           | Score | Categoria | WOD_1   | WOD_2 | WOD_3   |
     |---------|------------------|-------|-----------|---------|-------|---------|
     | 1       | João Silva       | 320   | Elite     | 150 reps| 7:45  | 90 reps |
     | 2       | Maria Santos     | 305   | Elite     | 145 reps| 8:00  | 88 reps |
     | ...     | ...              | ...   | ...       | ...     | ...   | ...     |
   - **current_top5.xlsx** (para TOP 5):
     | Posição | Atleta           | Score | Categoria |
     |---------|------------------|-------|-----------|
     | 1       | João Silva       | 320   | Elite     |
     | 2       | Maria Santos     | 305   | Elite     |
     | 3       | Pedro Costa      | 290   | RX        |
     | 4       | Ana Oliveira     | 280   | RX        |
     | 5       | Lucas Pereira    | 270   | Scaled    |
   - **Nota**: Use formatação de texto para `WOD_2` (ex.: "7:45") ou formatação "mm:ss".

4. **Inicie o servidor**:
   ```bash
   npm start
   ```

5. **Acesse no navegador**:
   - Página inicial: `http://localhost:8080`
   - Ranking: `http://localhost:8080/ranking_react.html`
   - TOP 5: `http://localhost:8080/top5_react.html`
   - Qual função: `http://localhost:8080/qual.html`

6. **OBS (opcional)**:
   - Adicione uma fonte de navegador no OBS com a URL desejada.

## Uso

- **Página Inicial**: Navegue entre as funcionalidades.
- **Ranking Campeonato**:
  - Pódio exibe os 3 primeiros com animações.
  - Tabela mostra todos os atletas, atualizada dinamicamente.
  - Edite `campeonato_crossfit.xlsx` para atualizações.
- **Current TOP 5**:
  - Lista os 5 melhores atletas de `current_top5.xlsx`.
  - Use o timer com input MM:SS.
  - Edite `current_top5.xlsx` para atualizações.
- **Qual função**:
  - Ranking animado experimental.
- **Depuração**:
  - Verifique logs no terminal (`server.js`).
  - Use o console do navegador (F12 > Console).

## Histórico de Implementações

1. **Versão Inicial**:
   - Pódio e tabela com dados de planilha.
   - WebSocket para atualizações.
2. **Correção WebSocket**:
   - Resolvido `ReferenceError: WebSocket is not defined`.
3. **Timer**:
   - Timer regressivo com Play/Pause, Reset.
4. **Correção de Exibição**:
   - Ajustado formato de tempos e nomes.
5. **Servidor HTTP**:
   - Integrado Express.
6. **Modularização**:
   - Página inicial e funções separadas.
7. **Correções e React**:
   - Corrigido pódio e nomes no Ranking/TOP 5.
   - Adicionada planilha `current_top5.xlsx`.
   - Migrado para React com Framer Motion.

## Demonstração Esperada

- **Ranking**:
  - Pódio: João Silva (1º), Maria Santos (2º), Pedro Costa (3º).
  - Tabela: Todos os atletas, ordenados por `Score`.
- **TOP 5**:
  - Lista: João Silva, Maria Santos, Pedro Costa, Ana Oliveira, Lucas Pereira.
  - Timer: Funciona com input MM:SS.
- **Qual função**:
  - Ranking animado.

## Possíveis Melhorias

- Filtros por categoria no Ranking.
- Caching no backend para otimizar leitura de planilhas.
- Mais animações (ex.: GSAP).
- Migração para Supabase + Next.js.

## Alternativas

- **Supabase + Next.js**: Banco de dados com WebSocket, frontend moderno.
- **Google Sheets + Apps Script**: Planilha como backend, hospedagem no Firebase.
- **Airtable + Vue.js**: CMS com interface dinâmica.
- **Streamlit**: Dashboard Python, hospedagem no Streamlit Cloud.

**Recomendação**: Supabase + Next.js para escalabilidade.

## Contribuição

1. Fork o repositório.
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`.
3. Commit: `git commit -m 'Adiciona nova funcionalidade'`.
4. Push: `git push origin feature/nova-funcionalidade`.
5. Abra um Pull Request.

## Licença

MIT License. Veja [LICENSE](LICENSE).

## Contato

Para dúvidas, abra uma issue no repositório.