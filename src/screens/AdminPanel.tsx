import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { ShieldAlert, Plus, Save, Loader2, Database } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';

export const AdminPanel = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [inserting, setInserting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Platform',
    description: '',
    title_color: 'text-indigo-400',
    sort_order: 0,
  });

  // 1. Fetch Current Vault Data
  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('portfolio_projects')
      .select('*')
      .order('sort_order', { ascending: true });
      
    if (!error) setProjects(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // 2. Handle Form Changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Inject New Bounty/Project into Database
  const handleInsert = async (e: React.FormEvent) => {
    e.preventDefault();
    setInserting(true);

    const { error } = await supabase
      .from('portfolio_projects')
      .insert([
        {
          title: formData.title,
          category: formData.category,
          description: formData.description,
          title_color: formData.title_color,
          sort_order: Number(formData.sort_order),
        }
      ]);

    if (error) {
      alert('INJECTION FAILED: ' + error.message);
    } else {
      // Reset form and refresh list
      setFormData({ title: '', category: 'Platform', description: '', title_color: 'text-indigo-400', sort_order: 0 });
      fetchProjects();
    }
    setInserting(false);
  };

  return (
    <div className="max-w-7xl mx-auto w-full pb-24 px-4">
      <PageHeader titleTop="ADMIN" titleBottom="CONTROL PANEL" activePage="SYSTEM / ADMIN" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
        
        {/* LEFT COLUMN: INJECTION FORM */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg shadow-xl">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Plus className="text-emerald-500" /> Inject New Data
          </h3>
          
          <form onSubmit={handleInsert} className="space-y-4">
            <div>
              <label className="block text-zinc-400 text-sm mb-1">Project / Bounty Title</label>
              <input required type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full bg-zinc-950 border border-zinc-800 text-white p-2 rounded focus:border-indigo-500 outline-none" placeholder="e.g. Field Ops UI" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-400 text-sm mb-1">Category</label>
                <select name="category" value={formData.category} onChange={handleInputChange} className="w-full bg-zinc-950 border border-zinc-800 text-white p-2 rounded focus:border-indigo-500 outline-none">
                  <option value="Platform">Platform</option>
                  <option value="Gaming">Gaming</option>
                  <option value="Field Ops">Field Ops</option>
                  <option value="Bounty">Bounty (Closed)</option>
                </select>
              </div>
              <div>
                <label className="block text-zinc-400 text-sm mb-1">Sort Order (0 is first)</label>
                <input type="number" name="sort_order" value={formData.sort_order} onChange={handleInputChange} className="w-full bg-zinc-950 border border-zinc-800 text-white p-2 rounded focus:border-indigo-500 outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-zinc-400 text-sm mb-1">Description</label>
              <textarea required name="description" value={formData.description} onChange={handleInputChange} className="w-full bg-zinc-950 border border-zinc-800 text-white p-2 rounded focus:border-indigo-500 outline-none h-24" placeholder="Brief tactical summary..." />
            </div>

            <div>
              <label className="block text-zinc-400 text-sm mb-1">Title Tailwind Color</label>
              <input type="text" name="title_color" value={formData.title_color} onChange={handleInputChange} className="w-full bg-zinc-950 border border-zinc-800 text-white p-2 rounded focus:border-indigo-500 outline-none" placeholder="text-indigo-400" />
            </div>

            <button disabled={inserting} type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded transition-colors flex items-center justify-center gap-2 mt-4 disabled:opacity-50">
              {inserting ? <Loader2 className="animate-spin" /> : <Save />} Execute Injection
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: LIVE DATABASE FEED */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg shadow-xl">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Database className="text-indigo-400" /> Live Vault Data
          </h3>
          
          {loading ? (
            <div className="flex justify-center py-10"><Loader2 className="animate-spin text-indigo-500 w-8 h-8" /></div>
          ) : (
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
              {projects.map((proj) => (
                <div key={proj.id} className="bg-zinc-950 border border-zinc-800 p-3 rounded flex justify-between items-center">
                  <div>
                    <span className={`font-bold ${proj.title_color}`}>{proj.title}</span>
                    <span className="text-zinc-500 text-sm ml-2">[{proj.category}]</span>
                    <p className="text-zinc-400 text-xs mt-1">{proj.description}</p>
                  </div>
                  <span className="text-zinc-600 text-xs font-mono">Order: {proj.sort_order}</span>
                </div>
              ))}
              {projects.length === 0 && <p className="text-zinc-500 italic">No data found in vault.</p>}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};