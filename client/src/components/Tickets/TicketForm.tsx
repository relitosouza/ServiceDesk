import { useState } from 'react';
import axios from 'axios';
import KBSuggestions from './KBSuggestions';

interface TicketFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

const TicketForm = ({ onClose, onSuccess }: TicketFormProps) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [urgency, setUrgency] = useState('Baixa');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const newTicket = {
      id: `#${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleString('pt-BR'),
      email: 'carlos@example.com', // Mock logged-in user
      title,
      category,
      urgency,
      description,
    };

    try {
      await axios.post('/api/tickets', newTicket);
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error creating ticket:', error);
      alert('Falha ao criar chamado. Verifique a conexão com o servidor.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Abrir Novo Ticket</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide">Título do Assunto</label>
              <input 
                required
                className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 transition-all outline-none text-slate-900 dark:text-white"
                placeholder="Ex: Erro ao acessar o sistema de folha de pagamento"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <KBSuggestions query={title} />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide">Categoria</label>
              <div className="relative">
                <select 
                  required
                  className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 transition-all outline-none appearance-none text-slate-900 dark:text-white"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Selecione uma categoria</option>
                  <option value="Hardware">Hardware</option>
                  <option value="Software">Software</option>
                  <option value="Acesso">Acesso / VPN</option>
                  <option value="Infraestrutura">Infraestrutura</option>
                  <option value="Outros">Outros</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide">Urgência</label>
              <div className="relative">
                <select 
                  className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 transition-all outline-none appearance-none text-slate-900 dark:text-white"
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                >
                  <option value="Baixa">Baixa</option>
                  <option value="Média">Média</option>
                  <option value="Alta">Alta</option>
                  <option value="Crítica">Crítica</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide">Descrição Detalhada</label>
              <textarea 
                required
                rows={4}
                className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 transition-all outline-none text-slate-900 dark:text-white resize-none"
                placeholder="Descreva o problema com o máximo de detalhes possível..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <button type="button" className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors text-sm font-bold uppercase tracking-wide">
              <span className="material-symbols-outlined">attach_file</span> Anexar
            </button>
            <div className="flex gap-3">
              <button 
                type="button" 
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                disabled={submitting}
                className="flex items-center gap-2 bg-primary text-white px-8 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:brightness-110 transition-all disabled:opacity-50"
              >
                {submitting ? 'Enviando...' : <><span className="material-symbols-outlined">send</span> Enviar Ticket</>}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketForm;
