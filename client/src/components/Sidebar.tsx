import React from 'react';
import { LayoutDashboard, Ticket, BarChart, Users, Settings, ConfirmationNumber } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hidden lg:flex flex-col">
      <div className="p-6 flex items-center gap-3">
        <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
          <Ticket size={20} />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">TicketManager</h2>
      </div>
      <nav className="flex-1 px-4 space-y-1 mt-4">
        <a className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary font-medium" href="#">
          <LayoutDashboard size={22} />
          <span>Painel</span>
        </a>
        <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" href="#">
          <Ticket size={22} />
          <span>Chamados</span>
        </a>
        <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" href="#">
          <BarChart size={22} />
          <span>Relatórios</span>
        </a>
        <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" href="#">
          <Users size={22} />
          <span>Equipe</span>
        </a>
      </nav>
      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" href="#">
          <Settings size={22} />
          <span>Configurações</span>
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
