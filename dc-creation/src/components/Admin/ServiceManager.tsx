'use client';
import { useState } from 'react';

type Service = {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  category: string;
};

export default function ServiceManager({ initialServices }: { initialServices: Service[] }) {
  const [services, setServices] = useState(initialServices);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState('Photography');
  const [icon, setIcon] = useState('FaCamera');

  // edit state
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editCategory, setEditCategory] = useState('Photography');
  const [editIcon, setEditIcon] = useState('FaCamera');

  const addService = async () => {
    if (!name) return;
    const res = await fetch('/api/services', {
      method: 'POST',
      body: JSON.stringify({ name, description: desc, category, icon }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      const newSvc = await res.json();
      setServices([...services, newSvc]);
      setName('');
      setDesc('');
    }
  };

  const deleteService = async (id: string) => {
    await fetch(`/api/services/${id}`, { method: 'DELETE' });
    setServices(services.filter(s => s.id !== id));
  };

  const startEdit = (s: Service) => {
    setEditId(s.id);
    setEditName(s.name);
    setEditDesc(s.description || '');
    setEditCategory(s.category);
    setEditIcon(s.icon || 'FaCamera');
  };
  const cancelEdit = () => setEditId(null);

  const saveEdit = async (id: string) => {
    const res = await fetch(`/api/services/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editName, description: editDesc, category: editCategory, icon: editIcon }),
    });
    if (res.ok) {
      const updated = await res.json();
      setServices(services.map(s => s.id === id ? updated : s));
      cancelEdit();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-heading text-gold mb-4">Services</h2>
      <div className="mb-6 flex gap-4 flex-wrap">
        <input placeholder="Name" className="bg-navy border border-border p-2 rounded text-text-primary" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Description" className="bg-navy border border-border p-2 rounded text-text-primary" value={desc} onChange={e => setDesc(e.target.value)} />
        <select className="bg-navy border border-border p-2 rounded text-text-primary" value={category} onChange={e => setCategory(e.target.value)}>
          {['Photography','Videography','Creative'].map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select className="bg-navy border border-border p-2 rounded text-text-primary" value={icon} onChange={e => setIcon(e.target.value)}>
          {['FaCamera','FaVideo','FaPaintBrush','FaDrone','FaRing'].map(i => <option key={i} value={i}>{i}</option>)}
        </select>
        <button onClick={addService} className="bg-gold text-navy px-4 py-2 rounded hover:bg-gold-dark">Add</button>
      </div>
      <div className="space-y-2">
        {services.map(s => (
          <div key={s.id} className="flex justify-between items-start bg-navy-light p-3 rounded border border-border">
            {editId === s.id ? (
              <div className="flex flex-col gap-2 flex-1">
                <input value={editName} onChange={e => setEditName(e.target.value)} className="bg-navy border border-border p-1 rounded text-text-primary" />
                <input value={editDesc} onChange={e => setEditDesc(e.target.value)} className="bg-navy border border-border p-1 rounded text-text-primary" />
                <select value={editCategory} onChange={e => setEditCategory(e.target.value)} className="bg-navy border border-border p-1 rounded text-text-primary">
                  {['Photography','Videography','Creative'].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <select value={editIcon} onChange={e => setEditIcon(e.target.value)} className="bg-navy border border-border p-1 rounded text-text-primary">
                  {['FaCamera','FaVideo','FaPaintBrush','FaDrone','FaRing'].map(i => <option key={i} value={i}>{i}</option>)}
                </select>
                <div className="flex gap-2">
                  <button onClick={() => saveEdit(s.id)} className="bg-green-600 text-white px-2 py-1 rounded text-xs">Save</button>
                  <button onClick={cancelEdit} className="bg-gray-500 text-white px-2 py-1 rounded text-xs">Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <div>
                  <span className="font-semibold">{s.name}</span> ({s.category})
                  {s.description && <p className="text-text-secondary text-sm">{s.description}</p>}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => startEdit(s)} className="text-blue-400 text-sm">Edit</button>
                  <button onClick={() => deleteService(s.id)} className="text-red-400 text-sm">Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}