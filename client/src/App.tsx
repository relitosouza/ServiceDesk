import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Metrics from './components/Dashboard/Metrics';
import RecentTickets from './components/Dashboard/RecentTickets';
import TicketForm from './components/Tickets/TicketForm';
import { Download, Plus } from 'lucide-react';

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleTicketSuccess = () => {
    setRefreshKey(prev => prev + 1); // Triggers re-fetch in RecentTickets
  };

  return (
    <div className="relative flex h-screen w-full flex-col overflow-x-hidden">
      <div className="flex h-full grow">
        <Sidebar />
        <main className="flex-1 flex flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased overflow-hidden">
          <Header />
          <div className="flex-1 overflow-y-auto p-8 max-w-7xl mx-auto w-full">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Painel</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Visão geral do sistema de chamados e performance da equipe.</p>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-all">
                  <Download size={18} /> Exportar
                </button>
                <button 
                  onClick={() => setIsFormOpen(true)}
                  className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg shadow-primary/20 hover:brightness-110 transition-all"
                >
                  <Plus size={18} /> Novo Chamado
                </button>
              </div>
            </div>

            {/* Dashboard Content */}
            <Metrics />
            <RecentTickets key={refreshKey} />

            {/* Modal Form */}
            {isFormOpen && (
              <TicketForm 
                onClose={() => setIsFormOpen(false)} 
                onSuccess={handleTicketSuccess}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
