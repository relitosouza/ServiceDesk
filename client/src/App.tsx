import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import TicketsPage from './pages/TicketsPage';

const DashboardPlaceholder = () => (
  <main className="flex flex-col flex-1 px-4 lg:px-10 py-8 max-w-[1280px] mx-auto w-full">
    <h1 className="text-3xl font-black">Dashboard (Em breve...)</h1>
  </main>
);

function App() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased">
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        <Routes>
          <Route path="/" element={<DashboardPlaceholder />} />
          <Route path="/tickets" element={<TicketsPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
