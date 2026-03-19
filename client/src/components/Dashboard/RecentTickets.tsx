import { useEffect, useState } from 'react';
import axios from 'axios';

interface Ticket {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  requester: string;
  requesterInitials: string;
  date: string;
}

const RecentTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get('/api/tickets');
        // Transform sheets data to our interface based on the new layout
        const formattedTickets = response.data.slice(1).map((row: any) => {
          const name = row[2] || 'Anônimo';
          const initials = name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase();
          
          return {
            id: row[0],
            date: row[1],
            requester: name,
            requesterInitials: initials,
            title: row[3],
            description: row[4], // Category as description/subtitle
            priority: row[5],
            status: row[7],
          };
        });
        setTickets(formattedTickets);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center p-20">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1">
          <label className="relative flex items-center h-12 w-full">
            <span className="material-symbols-outlined absolute left-4 text-slate-400">search</span>
            <input 
              className="form-input w-full pl-12 pr-4 rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-primary focus:border-primary text-base shadow-sm" 
              placeholder="Pesquisar por ID, assunto ou solicitante..." 
            />
          </label>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-1">
          <div className="relative group">
            <button className="flex h-12 items-center justify-between gap-x-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 min-w-[160px] hover:border-primary/50 transition-colors">
              <span className="text-slate-600 dark:text-slate-400 text-sm font-medium">Status: <span className="text-slate-900 dark:text-white">Todos</span></span>
              <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">expand_more</span>
            </button>
          </div>
          <div className="relative group">
            <button className="flex h-12 items-center justify-between gap-x-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 min-w-[160px] hover:border-primary/50 transition-colors">
              <span className="text-slate-600 dark:text-slate-400 text-sm font-medium">Prioridade: <span className="text-slate-900 dark:text-white">Todas</span></span>
              <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">expand_more</span>
            </button>
          </div>
          <button className="flex h-12 w-12 items-center justify-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined">filter_list</span>
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-24">ID</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Assunto</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Solicitante</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Prioridade</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Data</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                  <td className="px-6 py-4 text-sm font-semibold text-primary">{ticket.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{ticket.title}</span>
                      <span className="text-xs text-slate-500">{ticket.description}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                        {ticket.requesterInitials}
                      </div>
                      <span className="text-sm text-slate-700 dark:text-slate-300">{ticket.requester}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                      ticket.priority === 'Alta' || ticket.priority === 'Crítica'
                        ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800'
                        : ticket.priority === 'Média'
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800'
                        : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                    }`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border ${
                      ticket.status === 'Aberto'
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800'
                        : ticket.status === 'Em Andamento'
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800'
                        : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                    }`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{ticket.date}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">more_horiz</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <span className="text-sm text-slate-500 dark:text-slate-400">Mostrando {tickets.length} tickets</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm disabled:opacity-50" disabled>Anterior</button>
            <button className="px-3 py-1 rounded bg-primary text-white text-sm">1</button>
            <button className="px-3 py-1 rounded border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm">Próximo</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentTickets;
