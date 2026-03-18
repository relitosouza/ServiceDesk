import React from 'react';
import { BookOpen, ExternalLink } from 'lucide-react';

interface Suggestion {
  id: string;
  title: string;
}

interface KBSuggestionsProps {
  query: string;
}

const KBSuggestions = ({ query }: KBSuggestionsProps) => {
  // Mock suggestions for now - in a real app, this would be a filtered fetch from the backend
  const allSuggestions = [
    { id: '1', title: 'Como resetar sua senha do Windows' },
    { id: '2', title: 'Configurando a VPN no macOS' },
    { id: '3', title: 'Problemas comuns com impressoras de rede' },
    { id: '4', title: 'Acesso ao sistema de folha de pagamento' },
    { id: '5', title: 'Como solicitar um novo equipamento' },
  ];

  const filtered = query.length > 3 
    ? allSuggestions.filter(s => s.title.toLowerCase().includes(query.toLowerCase()))
    : [];

  if (filtered.length === 0) return null;

  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-4 mt-2">
      <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 mb-3">
        <BookOpen size={18} />
        <span className="text-sm font-bold uppercase tracking-wider">Artigos Sugeridos</span>
      </div>
      <ul className="space-y-2">
        {filtered.map(item => (
          <li key={item.id} className="flex items-center justify-between group cursor-pointer hover:bg-white dark:hover:bg-slate-800 p-2 rounded transition-all">
            <span className="text-sm text-slate-700 dark:text-slate-300">{item.title}</span>
            <ExternalLink size={14} className="text-slate-400 group-hover:text-primary" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KBSuggestions;
