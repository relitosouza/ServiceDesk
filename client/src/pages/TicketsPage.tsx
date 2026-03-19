import { useNavigate } from 'react-router-dom';
import RecentTickets from '../components/Dashboard/RecentTickets';

const TicketsPage = () => {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col flex-1 px-4 lg:px-10 py-8 max-w-[1280px] mx-auto w-full">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-slate-900 dark:text-white text-3xl font-black leading-tight tracking-tight">Gerenciamento de Tickets</h1>
          <p className="text-slate-500 dark:text-slate-400 text-base">Visualize, monitore e resolva as solicitações de suporte da sua equipe.</p>
        </div>
        <button 
          onClick={() => navigate('/tickets/new')}
          className="bg-primary text-white px-6 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          Novo Ticket
        </button>
      </div>

      {/* Ticket List with Filters */}
      <RecentTickets />
    </main>
  );
};

export default TicketsPage;
