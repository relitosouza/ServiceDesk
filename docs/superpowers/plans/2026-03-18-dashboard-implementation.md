# Dashboard Implementation Plan (Phase 1)

> **For agentic workers:** REQUIRED: Use superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a functional dashboard as the home page (`/`) featuring real-time KPIs and interactive charts powered by Google Sheets data.

**Architecture:** Use `react-router-dom` for navigation, `recharts` for data visualization, and a new backend endpoint `/api/stats` to aggregate spreadsheet data.

**Tech Stack:** React, TypeScript, Tailwind CSS, Recharts, Express, Google Sheets API.

---

## Chunk 1: Infrastructure & Backend

### Task 1: Install Dependencies
**Files:**
- Modify: `package.json` (root)
- Modify: `client/package.json`

- [ ] **Step 1: Add Recharts and React Router to client**
Run: `cd client && npm install recharts react-router-dom`

- [ ] **Step 2: Add React Router types to client devDependencies**
Run: `cd client && npm install -D @types/react-router-dom`

- [ ] **Step 3: Commit dependencies**
```bash
git add package.json client/package.json client/package-lock.json
git commit -m "chore: add recharts and react-router-dom dependencies"
```

### Task 2: Backend Statistics API
**Files:**
- Modify: `server/src/routes/tickets.ts`
- Modify: `server/src/index.ts`

- [ ] **Step 1: Add `/api/stats` route logic in `server/src/routes/tickets.ts`**
Add a new router for stats or add the endpoint to the existing one. Let's add it to `tickets.ts` for simplicity since it already handles sheet access.

```typescript
// server/src/routes/tickets.ts - Add at the end
router.get('/stats', async (req, res) => {
  try {
    const rows = await getRows('Tickets!A:J');
    if (!rows) return res.json({ total: 0, open: 0, inProgress: 0, resolved: 0, weeklyData: [], statusDistribution: [] });

    const data = rows.slice(1); // Remove header
    const stats = {
      total: data.length,
      open: data.filter(r => r[7] === 'Aberto').length,
      inProgress: data.filter(r => r[7] === 'Em Andamento').length,
      resolved: data.filter(r => r[7] === 'Resolvido').length,
      // Simplified weekly data (last 7 days based on current data)
      weeklyData: [
        { name: 'Seg', count: 0 }, { name: 'Ter', count: 0 }, { name: 'Qua', count: 0 },
        { name: 'Qui', count: 0 }, { name: 'Sex', count: 0 }, { name: 'Sáb', count: 0 }, { name: 'Dom', count: 0 }
      ],
      statusDistribution: [
        { name: 'Abertos', value: 0 },
        { name: 'Em Andamento', value: 0 },
        { name: 'Resolvidos', value: 0 }
      ]
    };
    
    // Fill status distribution
    stats.statusDistribution[0].value = stats.open;
    stats.statusDistribution[1].value = stats.inProgress;
    stats.statusDistribution[2].value = stats.resolved;

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});
```

- [ ] **Step 2: Test API endpoint with curl**
Run: `curl http://localhost:3001/api/tickets/stats`
Expected: JSON object with total, open, inProgress, resolved counts.

- [ ] **Step 3: Commit backend changes**
```bash
git add server/src/routes/tickets.ts
git commit -m "feat: add /api/tickets/stats endpoint"
```

---

## Chunk 2: Frontend Routing & Dashboard

### Task 3: Setup React Router
**Files:**
- Modify: `client/src/main.tsx`
- Modify: `client/src/App.tsx`

- [ ] **Step 1: Wrap App with BrowserRouter in `client/src/main.tsx`**
- [ ] **Step 2: Define Routes in `client/src/App.tsx`**
Move current Dashboard content to a new `client/src/pages/TicketsPage.tsx` and set up `/` and `/tickets` routes.

- [ ] **Step 3: Commit routing setup**
```bash
git add client/src/main.tsx client/src/App.tsx
git commit -m "feat: setup react-router-dom for navigation"
```

### Task 4: Implement Dashboard Page
**Files:**
- Create: `client/src/pages/DashboardPage.tsx`
- Create: `client/src/components/Dashboard/Charts.tsx`

- [ ] **Step 1: Create Charts components using Recharts**
- [ ] **Step 2: Implement DashboardPage with KPI cards and Charts**
- [ ] **Step 3: Fetch real data from `/api/tickets/stats`**

- [ ] **Step 4: Commit Dashboard implementation**
```bash
git add client/src/pages/DashboardPage.tsx client/src/components/Dashboard/Charts.tsx
git commit -m "feat: implement dashboard with real-time charts"
```

### Task 5: Update Header Navigation
**Files:**
- Modify: `client/src/components/Header.tsx`

- [ ] **Step 1: Update Nav links to use `Link` from `react-router-dom`**
- [ ] **Step 2: Add active state styling**

- [ ] **Step 3: Commit Header updates**
```bash
git add client/src/components/Header.tsx
git commit -m "feat: update header navigation with router links"
```
