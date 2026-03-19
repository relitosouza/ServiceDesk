import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateTicketPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [urgency, setUrgency] = useState('baixa');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const newTicket = {
      id: `#${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleString('pt-BR'),
      email: 'joao.silva@empresa.com', // Mocked user
      title,
      category,
      urgency: urgency.charAt(0).toUpperCase() + urgency.slice(1),
      description,
    };

    try {
      await axios.post('/api/tickets', newTicket);
      navigate('/tickets');
    } catch (error) {
      console.error('Error creating ticket:', error);
      alert('Falha ao criar chamado. Verifique a conexão com o servidor.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 bg-background-light dark:bg-background-dark min-h-screen font-display antialiased">
      <main className="flex-1 px-6 lg:px-10 py-8 max-w-[1200px] mx-auto w-full">
        {/* Header Section */}
        <header className="mb-10">
          <div className="flex items-center gap-2 text-primary mb-4 cursor-pointer hover:underline group" onClick={() => navigate(-1)}>
            <span className="material-symbols-outlined text-[20px] transition-transform group-hover:-translate-x-1">arrow_back</span>
            <span className="text-sm font-bold uppercase tracking-wider">Voltar para a lista</span>
          </div>
          <h1 className="text-[32px] font-black tracking-tight text-slate-900 dark:text-white leading-tight">Abrir Novo Chamado</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">Preencha os detalhes abaixo para que nossa equipe técnica possa te ajudar.</p>
        </header>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Form Fields */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
              {/* Field: Subject */}
              <div className="flex flex-col gap-2">
                <label className="text-slate-700 dark:text-slate-300 text-sm font-bold uppercase tracking-wide">Assunto do Chamado</label>
                <input 
                  required
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full h-14 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-primary focus:border-primary px-4 text-lg font-medium text-slate-900 dark:text-white placeholder:text-slate-400 transition-all" 
                  placeholder="Ex: Não consigo acessar o servidor de arquivos"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Field: Category */}
                <div className="flex flex-col gap-2">
                  <label className="text-slate-700 dark:text-slate-300 text-sm font-bold uppercase tracking-wide">Categoria</label>
                  <div className="relative">
                    <select 
                      required
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full h-12 appearance-none rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-primary focus:border-primary px-4 pr-10 text-slate-900 dark:text-white font-medium transition-all"
                    >
                      <option value="">Selecione...</option>
                      <option value="Hardware">Hardware / Equipamentos</option>
                      <option value="Software">Software / Sistemas</option>
                      <option value="Acesso">Acessos / VPN</option>
                      <option value="Rede">Rede / Internet</option>
                      <option value="Outros">Outros Assuntos</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">unfold_more</span>
                  </div>
                </div>

                {/* Field: Urgency */}
                <div className="flex flex-col gap-2">
                  <label className="text-slate-700 dark:text-slate-300 text-sm font-bold uppercase tracking-wide">Urgência</label>
                  <div className="relative">
                    <select 
                      value={urgency}
                      onChange={(e) => setUrgency(e.target.value)}
                      className="w-full h-12 appearance-none rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-primary focus:border-primary px-4 pr-10 text-slate-900 dark:text-white font-medium transition-all"
                    >
                      <option value="baixa">Baixa (Rotina)</option>
                      <option value="media">Média (Atrasa o fluxo)</option>
                      <option value="alta">Alta (Impede o trabalho)</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">unfold_more</span>
                  </div>
                </div>
              </div>

              {/* Field: Description */}
              <div className="flex flex-col gap-2">
                <label className="text-slate-700 dark:text-slate-300 text-sm font-bold uppercase tracking-wide">Descrição Detalhada</label>
                <textarea 
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full min-h-[200px] rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-primary focus:border-primary p-4 text-slate-900 dark:text-white resize-none transition-all" 
                  placeholder="Descreva o que aconteceu, as etapas para reproduzir o erro e qualquer outra informação relevante..."
                ></textarea>
              </div>
            </div>
          </div>

          {/* Right Column: Attachments and Summary */}
          <div className="space-y-6">
            {/* File Upload Card */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-slate-900 dark:text-white font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">attach_file</span>
                Anexar Arquivos
              </h3>
              <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors cursor-pointer bg-slate-50 dark:bg-slate-800/50">
                <span className="material-symbols-outlined text-slate-400 text-4xl mb-2">cloud_upload</span>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Clique ou arraste arquivos</p>
                <p className="text-xs text-slate-500 mt-1">PNG, JPG ou PDF (Máx. 10MB)</p>
              </div>
            </div>

            {/* Summary Card */}
            <div className="bg-primary/5 dark:bg-primary/10 p-6 rounded-2xl border border-primary/20 shadow-sm">
              <h3 className="text-slate-900 dark:text-white font-bold mb-4 tracking-tight">Resumo do Chamado</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Solicitante:</span>
                  <span className="font-bold text-slate-900 dark:text-white">João Silva</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Departamento:</span>
                  <span className="font-bold text-slate-900 dark:text-white">TI / Infraestrutura</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Tempo de Resposta:</span>
                  <span className="font-black text-primary">~ 24 horas</span>
                </div>
                <hr className="border-primary/10 my-2"/>
                <p className="text-[11px] text-slate-500 leading-relaxed italic">
                  Ao enviar este chamado, nossa equipe técnica será notificada automaticamente via e-mail e Slack.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <button 
                type="submit"
                disabled={submitting}
                className="w-full bg-primary hover:bg-primary/90 text-white font-black py-4 px-6 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {submitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <span className="material-symbols-outlined">send</span>
                    Enviar Chamado
                  </>
                )}
              </button>
              <button 
                type="button"
                onClick={() => navigate('/tickets')}
                className="w-full bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold py-3 px-6 rounded-xl transition-colors border border-slate-200 dark:border-slate-800"
              >
                Cancelar e Voltar
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateTicketPage;
