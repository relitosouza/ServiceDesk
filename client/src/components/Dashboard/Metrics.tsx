const Metrics = () => {
  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Total de Tickets</p>
        <h3 className="text-2xl font-black text-slate-900 dark:text-white">1,284</h3>
        <div className="mt-2 flex items-center text-xs text-emerald-500 font-bold">
          <span className="material-symbols-outlined text-sm">trending_up</span>
          <span className="ml-1">+12% este mês</span>
        </div>
      </div>
      
      <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Tickets Abertos</p>
        <h3 className="text-2xl font-black text-amber-500">42</h3>
        <div className="mt-2 flex items-center text-xs text-amber-500 font-bold">
          <span className="material-symbols-outlined text-sm">priority_high</span>
          <span className="ml-1">5 críticos urgentes</span>
        </div>
      </div>
      
      <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Tempo Médio de Resolução</p>
        <h3 className="text-2xl font-black text-slate-900 dark:text-white">4.2h</h3>
        <div className="mt-2 flex items-center text-xs text-emerald-500 font-bold">
          <span className="material-symbols-outlined text-sm">trending_down</span>
          <span className="ml-1">-0.5h que ontem</span>
        </div>
      </div>
      
      <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Satisfação (CSAT)</p>
        <h3 className="text-2xl font-black text-emerald-500">98%</h3>
        <div className="mt-2 flex items-center text-xs text-slate-400 font-bold">
          <span className="material-symbols-outlined text-sm">grade</span>
          <span className="ml-1">Baseado em 450 avaliações</span>
        </div>
      </div>
    </div>
  );
};

export default Metrics;
