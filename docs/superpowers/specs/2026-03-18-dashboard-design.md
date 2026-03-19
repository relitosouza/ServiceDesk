# Especificação Técnica: Dashboard ServiceDesk (Fase 1)

**Data:** 18 de Março de 2026
**Status:** Em Revisão
**Versão:** 1.0

## 1. Visão Geral
Esta especificação detalha a implementação da primeira fase do Dashboard do ServiceDesk, baseado no layout "Cobalt Precision". O objetivo é fornecer uma visão executiva do sistema de chamados, com indicadores de performance (KPIs) e gráficos de volume e distribuição, utilizando dados reais da planilha do Google.

## 2. Arquitetura de Navegação
O sistema será migrado para uma estrutura de rotas utilizando `react-router-dom`:
- **`/` (Raiz)**: Dashboard (Painel de Operações).
- **`/tickets`**: Gerenciamento de Tickets (Lista completa e filtros).

## 3. Componentes do Dashboard
A página `Dashboard.tsx` será composta pelas seguintes seções:

### 3.1 Cartões de KPI (Topo)
Quatro cartões informativos com ícones Material Symbols:
- **Total de Tickets**: Contagem total de linhas na aba `Tickets`.
- **Abertos**: Tickets com status "Aberto".
- **Em Progresso**: Tickets com status "Em Andamento".
- **Resolvidos**: Tickets com status "Resolvido".

### 3.2 Gráficos (Recharts)
- **Volume de Tickets (7 dias)**: Gráfico de barras mostrando a quantidade de chamados criados por dia na última semana.
- **Distribuição de Status**: Gráfico de pizza mostrando a porcentagem de chamados em cada status.

### 3.3 Tabela de Atividades Recentes
Exibição dos 5 chamados mais recentes, com ID, Assunto, Solicitante e Status.

## 4. Integração de Dados (Backend)
Será criado um novo endpoint no servidor: `GET /api/stats`.
- **Lógica**: O servidor lerá a aba `Tickets`, processará os dados e retornará um objeto JSON com as contagens necessárias para os KPIs e gráficos.
- **Exemplo de Resposta**:
  ```json
  {
    "total": 128,
    "open": 42,
    "inProgress": 15,
    "resolved": 71,
    "weeklyData": [
      { "name": "Seg", "count": 12 },
      { "name": "Ter", "count": 8 },
      ...
    ],
    "statusDistribution": [
      { "name": "Resolvidos", "value": 71 },
      { "name": "Em Progresso", "value": 15 },
      { "name": "Abertos", "value": 42 }
    ]
  }
  ```

## 5. Requisitos Técnicos
- Instalação de `react-router-dom` e `recharts` no frontend.
- Implementação da lógica de agregação de dados no backend (Node.js).
- Uso extensivo de Material Symbols para consistência visual com a página de tickets.

## 6. Próximos Passos
1. Instalar dependências (`react-router-dom`, `recharts`).
2. Implementar o endpoint `/api/stats` no backend.
3. Criar a estrutura de rotas no `App.tsx`.
4. Desenvolver o componente `Dashboard.tsx` e seus sub-componentes.
