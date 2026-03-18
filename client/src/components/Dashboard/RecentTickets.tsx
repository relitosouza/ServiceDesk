import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Eye, Filter, MoreVertical } from 'lucide-react';

interface Ticket {
  id: string;
  title: string;
  priority: string;
  status: string;
  responsible: string;
  date: string;
  category: string;
}

const RecentTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get('/api/tickets');
        // Transform sheets data to our interface
        const formattedTickets = response.data.slice(1).map((row: any) => ({
          id: row[0],
          date: row[1],
          title: row[3],
          category: row[4],
          priority: row[5],
          status: row[7],
          responsible: row[8] || 'Não atribuído'
        }));
        setTickets(formattedTickets);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) return <div className="p-8 text-center">Carregando chamados...</div>;

  return (
    <div className="mt-8 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Lista de Chamados Recentes</h2>
        <div className="flex gap-2 text-slate-400">
          <Filter size={20} className="hover:text-slate-600 cursor-pointer" />
          <MoreVertical size={20} className="hover:text-slate-600 cursor-pointer" />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Assunto</th>
              <th className="px-6 py-4">Prioridade</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Data</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {tickets.length > 0 ? (
              tickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-sm">
                  <td className="px-6 py-4 font-bold text-slate-400">{ticket.id}</td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-slate-900 dark:text-white">{ticket.title}</p>
                    <p className="text-xs text-slate-500">{ticket.category}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                      ticket.priority === 'Crítica' ? 'bg-red-100 text-red-700' :
                      ticket.priority === 'Alta' ? 'bg-orange-100 text-orange-700' :
                      ticket.priority === 'Média' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {ticket.priority.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`size-2 rounded-full ${
                        ticket.status === 'Resolvido' ? 'bg-green-500' :
                        ticket.status === 'Em Andamento' ? 'bg-blue-500' : 'bg-amber-500'
                      }`}></span>
                      <span className="font-medium text-slate-700 dark:text-slate-300">{ticket.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{ticket.date}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400">
                      <Eye size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-slate-500">Nenhum chamado encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentTickets;
