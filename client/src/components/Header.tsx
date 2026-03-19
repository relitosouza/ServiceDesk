const Header = () => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 lg:px-10 py-3 sticky top-0 z-50">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3 text-primary">
          <span className="material-symbols-outlined text-3xl font-bold">support_agent</span>
          <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Service Desk</h2>
        </div>
        <nav className="hidden md:flex items-center gap-9">
          <a className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors" href="#">Dashboard</a>
          <a className="text-primary text-sm font-bold border-b-2 border-primary py-1" href="#">Tickets</a>
          <a className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors" href="#">Clientes</a>
          <a className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors" href="#">Relatórios</a>
        </nav>
      </div>
      <div className="flex flex-1 justify-end gap-4">
        <div className="hidden sm:block">
          <label className="relative flex items-center min-w-40 max-w-64 h-10">
            <span className="material-symbols-outlined absolute left-3 text-slate-400">search</span>
            <input 
              className="form-input w-full pl-10 pr-4 rounded-lg text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 focus:ring-primary focus:border-primary text-sm transition-all" 
              placeholder="Buscar globalmente..." 
            />
          </label>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors overflow-hidden border border-slate-200 dark:border-slate-700">
            <img className="w-full h-full object-cover" alt="User avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsTkfeMHf1UXHx9n_H8sNIBQRIFRSjo8ifmS95JTFPkBgQ2if9cuNsb4wh-cYf6k9ObChxrL3Hld0nDm7TNKOCdNu_cpjvxcU4fu9Dv8khTqmlx3DcPSiulcEpjMBjf3d6_SX7je-rjU5KZOWXaG2VMBw8H6ez9xAKCVlas2XKYi9KeN5X_xLbDk0k_UrZQFsothdkitYzPDTc5tHsD-0ptxnjmlgR6HDQ5scN2_hBqAy1vuNwG1htE_2qydoF0b3TFCXHVTfqD-8" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
