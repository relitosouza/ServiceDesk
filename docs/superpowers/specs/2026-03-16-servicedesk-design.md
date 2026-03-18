# Especificação Técnica: ServiceDesk TicketManager

**Data:** 16 de Março de 2026
**Status:** Em Revisão
**Versão:** 1.0

## 1. Visão Geral
O TicketManager é um sistema de ServiceDesk completo focado na experiência do usuário final, integrando abertura de chamados com uma base de conhecimento proativa. O sistema utiliza o Google Sheets como banco de dados para facilitar a gestão visual dos dados e reduzir a complexidade da infraestrutura.

## 2. Arquitetura do Sistema
- **Frontend**: React (Vite) + TypeScript + Tailwind CSS + Lucide React (ícones).
- **Backend**: Node.js (Express) servindo a API para o frontend.
- **Banco de Dados**: Google Sheets API v4 (Autenticação via Service Account).
- **Autenticação**: Inicialmente baseada em e-mail simples (simulando login) com planos para integração OAuth futuramente.

## 3. Interface e Experiência do Usuário (UX)
Baseado no layout "TicketManager - Painel Corporativo", o sistema contará com:
- **Barra Lateral**: Navegação entre Painel, Chamados, Base de Conhecimento e Configurações.
- **Cabeçalho**: Busca global inteligente que consulta a aba `Base_Conhecimento` em tempo real.
- **Dashboard (Painel)**: 
    - Métricas rápidas (Abertos, Em Andamento, Resolvidos).
    - Lista resumida de atividades recentes.
- **Formulário de Ticket**: 
    - Campos: Título, Categoria, Urgência, Descrição.
    - Painel Lateral: "Artigos Sugeridos" que mudam conforme o usuário digita o título.
- **Lista de Chamados**: Tabela completa com filtros por status e busca por ID/Título.

## 4. Estrutura de Dados (Google Sheets)
A planilha conterá as seguintes abas:

### 4.1 Aba: Tickets
| Coluna | Descrição |
| --- | --- |
| ID | Identificador único (ex: #1001) |
| Data | Timestamp de criação |
| Usuario_Email | E-mail do solicitante |
| Titulo | Assunto do chamado |
| Categoria | TI, RH, Infraestrutura, etc. |
| Urgencia | Baixa, Média, Alta, Crítica |
| Descricao | Texto detalhado |
| Status | Aberto, Em Atendimento, Resolvido, Cancelado |
| Responsavel | Nome do técnico atribuído |
| Anexos | URL dos arquivos (Google Drive) |

### 4.2 Aba: Base_Conhecimento
| Coluna | Descrição |
| --- | --- |
| ID | Identificador do artigo |
| Titulo | Título do FAQ/Tutorial |
| Conteudo | Conteúdo HTML ou Markdown |
| Categoria | Categoria do artigo |
| Palavras_Chave | Termos para indexação de busca |

### 4.3 Aba: Usuarios
| Coluna | Descrição |
| --- | --- |
| Email | E-mail (Chave Primária) |
| Nome | Nome Completo |
| Cargo | Usuário ou Admin |
| Avatar | URL da imagem |

### 4.4 Aba: Comentarios
| Coluna | Descrição |
| --- | --- |
| Ticket_ID | ID do chamado associado |
| Usuario_Email | Quem enviou o comentário |
| Data | Timestamp da mensagem |
| Conteudo | Texto do comentário |

## 5. Requisitos Funcionais e Técnicos
- [ ] Listar chamados do usuário logado.
- [ ] Criar novo chamado com upload (via **Google Drive API** - Pasta 'Attachments').
- [ ] **Chat de Chamado**: Permitir que usuários e técnicos troquem mensagens na aba 'Comentarios'.
- [ ] Buscar na base de conhecimento em tempo real.
- [ ] Atualizar status do chamado (Fluxo de técnico/admin).
- [ ] Dashboard com indicadores de performance.
- [ ] **Configuração Técnica**: Uso de Google Service Account com escopos `https://www.googleapis.com/auth/spreadsheets` e `https://www.googleapis.com/auth/drive.file`.

## 6. Próximos Passos
1. Configuração do projeto (Vite + Node).
2. Configuração das credenciais do Google Cloud Console.
3. Implementação do Wrapper da Google Sheets API.
4. Desenvolvimento das telas (Dashboard -> Lista -> Formulário).
