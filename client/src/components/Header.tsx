import { Search, Bell, HelpCircle } from 'lucide-react';

const Header = () => {
  return (
    <header className="flex items-center justify-between h-16 px-8 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-10">
      <div className="flex items-center gap-4 w-1/3">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none" 
            placeholder="Procurar chamados..." 
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
          <Bell size={20} />
        </button>
        <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
          <HelpCircle size={20} />
        </button>
        <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-700 mx-2"></div>
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-900 dark:text-white leading-none">Carlos Silva</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Admin</p>
          </div>
          <div className="size-9 rounded-full bg-primary/20 border-2 border-primary/10 flex items-center justify-center overflow-hidden">
             {/* Placeholder for user image */}
             <div className="w-full h-full bg-slate-300 flex items-center justify-center text-slate-600 text-xs font-bold">CS</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
