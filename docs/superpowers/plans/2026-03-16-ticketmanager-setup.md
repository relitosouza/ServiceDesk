# TicketManager Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete ServiceDesk system using React, Node.js, and Google Sheets as a database.

**Architecture:** A monorepo-style structure with a `client` (React) and `server` (Node.js). The server acts as a proxy/wrapper for the Google Sheets and Drive APIs.

**Tech Stack:** React (Vite), TypeScript, Tailwind CSS, Express, Google APIs (googleapis).

---

## Prerequisite: Google Sheets Setup

- [ ] **Step 1: Create Google Sheet**
Create a new Google Sheet and add the following tabs/columns as per the specification:
  - `Tickets`: ID, Data, Usuario_Email, Titulo, Categoria, Urgencia, Descricao, Status, Responsavel, Anexos
  - `Base_Conhecimento`: ID, Titulo, Conteudo, Categoria, Palavras_Chave
  - `Usuarios`: Email, Nome, Cargo, Avatar
  - `Comentarios`: Ticket_ID, Usuario_Email, Data, Conteudo

---

## Chunk 1: Project Setup & Environment

### Task 1: Initialize Project Structure

**Files:**
- Create: `package.json` (root)
- Create: `server/package.json`
- Create: `client/package.json` (via Vite)

- [ ] **Step 1: Create root directory structure**
Run: `mkdir client, server` (Note: `docs` and subfolders already exist)

- [ ] **Step 2: Initialize root package.json**
Run: `npm init -y` in root.

- [ ] **Step 3: Initialize server with Express and TypeScript**
Run: `cd server && npm init -y && npm install express googleapis cors dotenv && npm install -D typescript @types/node @types/express @types/cors ts-node-dev`
Run: `npx tsc --init`
**Note:** Add `"dev": "ts-node-dev --respawn --transpile-only src/index.ts"` to `server/package.json` scripts.

- [ ] **Step 4: Initialize client with Vite, React, and TypeScript**
Run: `cd ../client && npm create vite@latest . -- --template react-ts && npm install && npm install -D tailwindcss postcss autoprefixer lucide-react axios`
Run: `npx tailwindcss init -p`

- [ ] **Step 5: Configure Tailwind CSS**
Modify `client/tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#135bec",
        "background-light": "#f6f6f8",
        "background-dark": "#101622",
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 6: Commit initial setup**
Run: `git add . && git commit -m "chore: initial project structure and dependencies"`

### Task 2: Google API Service Account Configuration

**Files:**
- Create: `server/.env`
- Create: `server/src/config/googleAuth.ts`

- [ ] **Step 1: Create .env file for server**
Create `server/.env` with placeholders:
```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your-google-sheet-id
PORT=3001
```

- [ ] **Step 2: Implement Google Auth Wrapper**
Create `server/src/config/googleAuth.ts`:
```typescript
import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const auth = new google.auth.JWT(
  process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  null,
  process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive.file']
);

export const sheets = google.sheets({ version: 'v4', auth });
export const drive = google.drive({ version: 'v3', auth });
```

- [ ] **Step 3: Commit Auth Configuration**
Run: `git add server/src/config/googleAuth.ts server/.env && git commit -m "feat: add google auth configuration"`

---

## Chunk 2: Backend API (Sheets Integration)

### Task 1: Sheet CRUD Wrapper Utility

**Files:**
- Create: `server/src/utils/sheetUtils.ts`

- [ ] **Step 1: Create a generic function to append rows and get data from Sheets**
Create `server/src/utils/sheetUtils.ts` with basic read/write logic.

```typescript
import { sheets } from '../config/googleAuth';

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;

export const appendRow = async (range: string, values: any[]) => {
  return await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [values] },
  });
};

export const getRows = async (range: string) => {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range,
  });
  return res.data.values;
};
```

- [ ] **Step 2: Commit Utility Utility**
Run: `git add server/src/utils/sheetUtils.ts && git commit -m "feat: add sheet crud utilities"`

### Task 2: Ticket and User API Endpoints

**Files:**
- Create: `server/src/routes/tickets.ts`
- Modify: `server/src/index.ts`

- [ ] **Step 1: Implement basic Ticket endpoints (List and Create)**
Create `server/src/routes/tickets.ts` with Express Router.

```typescript
import express from 'express';
import { getRows, appendRow } from '../utils/sheetUtils';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const rows = await getRows('Tickets!A:J');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { id, date, email, title, category, urgency, description } = req.body;
    await appendRow('Tickets!A:J', [id, date, email, title, category, urgency, description, 'Aberto', '', '']);
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create ticket' });
  }
});

export default router;
```

- [ ] **Step 2: Create Main Entry File**
Create `server/src/index.ts`:

```typescript
import express from 'express';
import cors from 'cors';
import ticketsRouter from './routes/tickets';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/tickets', ticketsRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

- [ ] **Step 3: Run and Test API to verify failure (without sheets setup)**
Run: `cd server && npm run dev`

- [ ] **Step 4: Commit Backend API**
Run: `git add server/src/index.ts server/src/routes/tickets.ts && git commit -m "feat: implement backend routes for tickets"`

---

## Chunk 3: Frontend Layout & UI Components

### Task 1: Core Layout Components

**Files:**
- Create: `client/src/components/Sidebar.tsx`
- Create: `client/src/components/Header.tsx`
- Modify: `client/src/App.tsx`

- [ ] **Step 1: Create Sidebar Component**
Create `client/src/components/Sidebar.tsx` using Tailwind and Lucide icons.

- [ ] **Step 2: Create Header Component with Search**
Create `client/src/components/Header.tsx` with user profile and search bar.

- [ ] **Step 3: Assemble Main Layout in App.tsx**
Wrap everything in a flex container with sidebar and main content area.

```tsx
import Sidebar from './components/Sidebar';
import Header from './components/Header';

function App() {
  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-8">
           {/* Content goes here */}
        </main>
      </div>
    </div>
  );
}
export default App;
```

- [ ] **Step 4: Commit Layout Components**
Run: `git add client/src/components client/src/App.tsx && git commit -m "feat: setup basic layout with sidebar and header"`

### Task 2: Dashboard Metrics & Ticket Table

**Files:**
- Create: `client/src/components/Dashboard/Metrics.tsx`
- Create: `client/src/components/Dashboard/RecentTickets.tsx`

- [ ] **Step 1: Create Metrics Cards**
Implement cards for "Abertos", "Em Andamento" and "Resolvidos".

- [ ] **Step 2: Create Recent Tickets Table**
Display a simplified table of tickets fetched from the backend.

- [ ] **Step 3: Fetch Data from Backend**
Use `axios` or `fetch` to get data from `http://localhost:3001/api/tickets`.

- [ ] **Step 4: Commit Dashboard Features**
Run: `git add client/src/components/Dashboard && git commit -m "feat: add dashboard metrics and recent tickets table"`

---

## Chunk 4: Ticket Creation & Knowledge Base

### Task 1: Ticket Creation Form

**Files:**
- Create: `client/src/components/Tickets/TicketForm.tsx`
- Create: `client/src/components/Tickets/KBSuggestions.tsx`

- [ ] **Step 1: Create Ticket Form with Validation**
Implement form fields: Title, Category, Urgency, Description.

- [ ] **Step 2: Implement Real-time Suggestions**
Create `KBSuggestions.tsx` that filters a mock list of KB articles based on the Title input.

- [ ] **Step 3: Handle Form Submission**
Send POST request to `http://localhost:3001/api/tickets`.

- [ ] **Step 4: Commit Ticket Form**
Run: `git add client/src/components/Tickets && git commit -m "feat: add ticket creation form with live suggestions"`

### Task 2: Knowledge Base Integration

**Files:**
- Create: `server/src/routes/knowledgeBase.ts`
- Modify: `server/src/index.ts`

- [ ] **Step 1: Implement Knowledge Base API**
Create endpoint to search articles in `Base_Conhecimento` sheet.

- [ ] **Step 2: Register KB Route in Server**
Add `app.use('/api/kb', kbRouter)` to `server/src/index.ts`.

- [ ] **Step 3: Commit KB Integration**
Run: `git add server/src/routes/knowledgeBase.ts server/src/index.ts && git commit -m "feat: implement knowledge base API endpoints"`
