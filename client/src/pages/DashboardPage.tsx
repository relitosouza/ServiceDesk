import { useEffect, useState } from 'react';
import axios from 'axios';
import { TicketBarChart, TicketPieChart } from '../components/Dashboard/Charts';

interface DashboardStats {
  total: number;
  open: number;
  inProgress: number;
  resolved: number;
  weeklyData: { name: string; count: number }[];
  statusDistribution: { name: string; value: number }[];
}

const DashboardPage = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/api/tickets/stats');
        setStats(response.data);
      } catch (err: any) {
        console.error('Error fetching dashboard stats:', err);
        setError(err.response?.data?.error || err.message || 'Falha ao conectar com o servidor');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center p-20">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center p-20 text-center">
      <div className="bg-red-50 dark:bg-red-900/20 p-8 rounded-2xl border border-red-100 dark:border-red-800 max-w-md">
        <span className="material-symbols-outlined text-red-500 text-5xl mb-4">error</span>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Erro ao Carregar Dashboard</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-primary text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-primary/90 transition-all"
        >
          Tentar Novamente
        </button>
      </div>
    </div>
  );

  return (
    <main className="pt-8 pb-12 px-6 lg:px-10 max-w-[1440px] mx-auto w-full min-h-screen">
      <header className="mb-8">
        <h1 className="text-[32px] font-black tracking-tight text-slate-900 dark:text-white leading-tight">Visão Geral</h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">Bem-vindo de volta ao centro de operações da Support Ops.</p>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 transition-all hover:shadow-md">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <span className="material-symbols-outlined text-primary fill-1">confirmation_number</span>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+12%</span>
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Total de Tickets</p>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">{stats.total}</h3>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 transition-all hover:shadow-md">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-amber-100 rounded-lg">
              <span className="material-symbols-outlined text-amber-600 fill-1">pending</span>
            </div>
            <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-full">+5%</span>
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Abertos</p>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">{stats.open}</h3>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 transition-all hover:shadow-md">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <span className="material-symbols-outlined text-blue-600 fill-1">engineering</span>
            </div>
            <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-full">Estável</span>
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Em Progresso</p>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">{stats.inProgress}</h3>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 transition-all hover:shadow-md">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <span className="material-symbols-outlined text-emerald-600 fill-1">check_circle</span>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">94% taxa</span>
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Resolvidos</p>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">{stats.resolved}</h3>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Volume de Tickets (7 dias)</h2>
          </div>
          <TicketBarChart data={stats.weeklyData} />
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-8">Distribuição de Status</h2>
          <TicketPieChart data={stats.statusDistribution} />
          <div className="space-y-3 mt-4">
            {stats.statusDistribution.map((item, idx) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${['bg-amber-500', 'bg-primary', 'bg-emerald-500'][idx]}`}></span>
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{item.name}</span>
                </div>
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {Math.round((item.value / stats.total) * 100) || 0}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
