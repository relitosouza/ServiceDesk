import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import TicketsPage from './pages/TicketsPage';
import DashboardPage from './pages/DashboardPage';
import CreateTicketPage from './pages/CreateTicketPage';

function App() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased">
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/tickets" element={<TicketsPage />} />
          <Route path="/tickets/new" element={<CreateTicketPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
