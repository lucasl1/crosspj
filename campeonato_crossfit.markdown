# Modelo de Planilha Excel para Campeonato de CrossFit

Crie uma planilha com as seguintes colunas na primeira linha (cabeçalho):

| Posição | Atleta           | Score | Categoria | WOD_1   | WOD_2 | WOD_3   |
|---------|------------------|-------|-----------|---------|-------|---------|
| 1       | João Silva       | 320   | Elite     | 150 reps| 7:45  | 90 reps |
| 2       | Maria Santos     | 305   | Elite     | 145 reps| 8:00  | 88 reps |
| 3       | Pedro Costa      | 290   | RX        | 140 reps| 8:15  | 85 reps |
| 4       | Ana Oliveira     | 280   | RX        | 135 reps| 8:30  | 82 reps |
| 5       | Lucas Pereira    | 270   | Scaled    | 130 reps| 9:00  | 80 reps |
| 6       | Carla Mendes     | 260   | Scaled    | 125 reps| 9:15  | 78 reps |
| 7       | Rafael Almeida   | 250   | RX        | 120 reps| 9:30  | 75 reps |
| 8       | Sofia Lima       | 240   | Scaled    | 115 reps| 9:45  | 72 reps |

**Instruções**:
- Salve como `campeonato_crossfit.xlsx` no mesmo diretório do `server.js`.
- **Formato dos tempos no WOD_2**: Insira os tempos como texto no Excel (ex.: "7:45", "8:00") ou use a formatação personalizada "mm:ss" para evitar conversões automáticas.
- **Explicação dos Exemplos**:
  - **João Silva**: Líder na categoria Elite, com alto desempenho em todos os WODs.
  - **Maria Santos**: Elite, forte em WOD 1, mas ligeiramente atrás no WOD 3.
  - **Pedro Costa**: RX, consistente, garantindo o 3º lugar.
  - **Ana Oliveira**: RX, bom desempenho geral, mas perdeu pontos no WOD 3.
  - **Lucas Pereira**: Scaled, adequado para iniciantes, com tempos mais lentos.
  - **Carla Mendes**: Scaled, competitiva na categoria, com menos repetições.
  - **Rafael Almeida**: RX, desempenho médio, com potencial de melhora.
  - **Sofia Lima**: Scaled, nova no CrossFit, com scores mais baixos.
  - **WODs**:
    - **WOD_1**: Contagem de repetições (ex.: AMRAP em 10 minutos).
    - **WOD_2**: Tempo para completar (ex.: minutos e segundos, MM:SS).
    - **WOD_3**: Contagem de repetições (ex.: carga ou reps).