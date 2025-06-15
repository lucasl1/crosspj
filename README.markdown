# Campeonato de CrossFit

Sistema web para gerenciar e exibir resultados de competições de CrossFit em tempo real, com suporte a rankings, pódio, tabela de participantes, timer para provas e integração com uma planilha Excel (`campeonato_crossfit.xlsx`). O frontend utiliza Tailwind CSS para estilização, JavaScript vanilla para a maioria das funcionalidades e React com Framer Motion para uma interface animada experimental. O backend combina Express (HTTP) e WebSocket para atualizações dinâmicas.

## Funcionalidades

- **Página Inicial**:
  - Título "Campeonato de CrossFit".
  - Botões para navegar para "Ranking Campeonato", "Current TOP 5" e "Qual função".
- **Ranking Campeonato**:
  - Pódio com os 3 primeiros colocados (nome e score).
  - Tabela com todos os participantes, incluindo Posição, Atleta, Score, Categoria, WOD_1, WOD_2, WOD_3.
  - Atualização em tempo real via WebSocket ao salvar a planilha.
- **Current TOP 5**:
  - Exibe os 5 atletas com maior pontuação (nome, score, categoria).
  - Timer regressivo com botões Play/Pause, Reset e input para tempo (MM:SS).
  - Atualização em tempo real via WebSocket.
- **Qual função**:
  - Interface experimental com React e Framer Motion.
  - Exibe um ranking animado com transições suaves (slide-in) para atualizações de dados.
  - Preparado para futuras expansões.
- **Backend**:
  - Servidor Express para arquivos estáticos e rotas HTTP.
  - WebSocket para envio de dados da planilha em tempo real.
  - Monitoramento de alterações na planilha com `fs.watchFile`.

## Tecnologias Utilizadas

- **Frontend**:
  - HTML, JavaScript (vanilla), React (com Framer Motion para animações).
  - Tailwind CSS para estilização.
  - Fontes: Poppins (Google Fonts).
- **Backend**:
  - Node.js com Express (servidor HTTP).
  - WebSocket (`ws`) para atualizações em tempo real.
  - `xlsx` para leitura de planilhas Excel.
- **Dependências**:
  - `express`, `ws`, `xlsx`.

## Estrutura do Projeto

```
campeonato-crossfit/
├── index.html          # Página inicial com botões de navegação
├── ranking.html        # Página do ranking com pódio e tabela
├── ranking.js          # Lógica JavaScript para ranking
├── top5.html           # Página do TOP 5 com timer
├── top5.js             # Lógica JavaScript para TOP 5
├── qual.html           # Página experimental com React e Framer Motion
├── server.js           # Servidor Node.js (Express + WebSocket)
├── package.json        # Configuração do projeto e dependências
├── campeonato_crossfit.xlsx # Planilha Excel com dados dos atletas
└── README.md           # Documentação do projeto
```

## Requisitos

- Node.js (v18 ou superior).
- Navegador moderno (Chrome, Firefox, etc.).
- Software para editar planilhas Excel (Microsoft Excel, LibreOffice, etc.).
- Conexão à internet para carregar CDNs (Tailwind, React, Framer Motion).

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

3. **Crie a planilha Excel**:
   - Crie um arquivo chamado `campeonato_crossfit.xlsx` no diretório raiz.
   - Siga o formato abaixo para a primeira linha (cabeçalho) e adicione os dados:

   | Posição | Atleta           | Score | Categoria | WOD_1   | WOD_2 | WOD_3   |
   |---------|------------------|-------|-----------|---------|-------|---------|
   | 1       | João Silva       | 320   | Elite     | 150 reps| 7:45  | 90 reps |
   | 2       | Maria Santos     | 305   | Elite     | 145 reps| 8:00  | 88 reps |
   | ...     | ...              | ...   | ...       | ...     | ...   | ...     |

   - **Nota**: Para a coluna `WOD_2`, use formatação de texto (ex.: "7:45") ou formatação personalizada "mm:ss" no Excel.

4. **Inicie o servidor**:
   ```bash
   npm start
   ```

5. **Acesse no navegador**:
   - Página inicial: `http://localhost:8080`
   - Ranking: `http://localhost:8080/ranking.html`
   - TOP 5: `http://localhost:8080/top5.html`
   - Qual função: `http://localhost:8080/qual.html`

6. **Configuração no OBS (opcional)**:
   - Adicione uma fonte de navegador no OBS com a URL `http://localhost:8080` ou a página desejada (ex.: `ranking.html`).

## Uso

- **Página Inicial**: Navegue entre as funcionalidades clicando nos botões.
- **Ranking Campeonato**:
  - Visualize o pódio com os 3 primeiros colocados.
  - Consulte a tabela com todos os atletas, ordenados por `Score`.
  - Edite a planilha e salve para atualizar os dados em tempo real.
- **Current TOP 5**:
  - Veja os 5 melhores atletas (nome, score, categoria).
  - Use o timer: insira um tempo (MM:SS), clique em Play/Pause ou Reset.
- **Qual função**:
  - Experimente o ranking animado com atualizações dinâmicas.
  - Dados aparecem com animações de slide-in.
- **Depuração**:
  - Verifique o terminal para logs do servidor (`server.js`).
  - Abra o console do navegador (F12 > Console) para logs do WebSocket.

## Histórico de Implementações

1. **Versão Inicial**:
   - Criado pódio e tabela para exibir dados de uma planilha Excel.
   - Suporte a WebSocket para atualizações em tempo real.
2. **Correção WebSocket**:
   - Resolvido erro `ReferenceError: WebSocket is not defined`.
3. **Adição do Timer**:
   - Timer regressivo com Play/Pause, Reset e input MM:SS.
4. **Correção de Exibição**:
   - Ajustado formato de tempos (`WOD_2`) e exibição de nomes.
5. **Servidor HTTP**:
   - Integrado Express para servir arquivos estáticos.
6. **Modularização**:
   - Criada página inicial com botões.
   - Separadas funcionalidades em `ranking.html` e `top5.html`.
7. **Correções e Framework**:
   - Corrigido pódio no Ranking (ordenação por `Score`).
   - Corrigida exibição de nomes no TOP 5.
   - Adicionada função experimental com React e Framer Motion.

## Demonstração Esperada

- **Ranking Campeonato**:
  - Pódio: João Silva (1º, 320), Maria Santos (2º, 305), Pedro Costa (3º, 290).
  - Tabela: Todos os atletas, ordenados por `Score`.
- **Current TOP 5**:
  - Lista: João Silva, Maria Santos, Pedro Costa, Ana Oliveira, Lucas Pereira.
  - Timer: Funciona com input MM:SS.
- **Qual função**:
  - Ranking animado com slide-in para cada atleta.

## Possíveis Melhorias Futuras

- **Filtros**: Adicionar filtros por categoria no Ranking.
- **Caching**: Otimizar leitura da planilha com cache no backend.
- **Animações**: Expandir animações em `ranking.html` e `top5.html` com GSAP.
- **Migração**: Avaliar Supabase + Next.js para maior escalabilidade.
- **Validação**: Melhorar tratamento de erros para planilhas malformatadas.

## Alternativas Sugeridas

1. **Supabase + Next.js**:
   - Banco de dados PostgreSQL gratuito com WebSocket.
   - Frontend moderno com animações fluidas.
   - Hospedagem gratuita no Vercel.
2. **Google Sheets + Apps Script**:
   - Planilha como backend, com API via Apps Script.
   - Frontend em React ou Vue, hospedado no Firebase.
3. **Airtable + Vue.js**:
   - Airtable como CMS, Vue.js para interface dinâmica.
   - Hospedagem no Netlify.
4. **Streamlit**:
   - Dashboard Python com leitura de planilha.
   - Hospedagem no Streamlit Cloud.

**Recomendação**: Supabase + Next.js para escalabilidade e estética moderna.

## Contribuição

1. Fork o repositório.
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`.
3. Faça commit das alterações: `git commit -m 'Adiciona nova funcionalidade'`.
4. Push para a branch: `git push origin feature/nova-funcionalidade`.
5. Abra um Pull Request.

## Licença

MIT License. Veja [LICENSE](LICENSE) para detalhes.

## Contato

Para dúvidas ou sugestões, abra uma issue no repositório.