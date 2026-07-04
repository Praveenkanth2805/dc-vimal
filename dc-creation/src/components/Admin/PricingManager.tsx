'use client';
import { useState } from 'react';

type Price = {
  id: string;
  size: string;
  type: string;
  price: number;
};

export default function PricingManager({ initialPrices }: { initialPrices: Price[] }) {
  const [prices, setPrices] = useState(initialPrices);
  const [size, setSize] = useState('');
  const [type, setType] = useState('Standard');
  const [price, setPrice] = useState('');

  // edit
  const [editId, setEditId] = useState<string | null>(null);
  const [editSize, setEditSize] = useState('');
  const [editType, setEditType] = useState('Standard');
  const [editPrice, setEditPrice] = useState('');

  const addPrice = async () => {
    if (!size || !price) return;
    const res = await fetch('/api/pricing', {
      method: 'POST',
      body: JSON.stringify({ size, type, price: Number(price) }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      const newPrice = await res.json();
      setPrices([...prices, newPrice]);
      setSize('');
      setPrice('');
    }
  };

  const deletePrice = async (id: string) => {
    await fetch(`/api/pricing/${id}`, { method: 'DELETE' });
    setPrices(prices.filter(p => p.id !== id));
  };

  const startEdit = (p: Price) => {
    setEditId(p.id);
    setEditSize(p.size);
    setEditType(p.type);
    setEditPrice(String(p.price));
  };
  const cancelEdit = () => setEditId(null);
  const saveEdit = async (id: string) => {
    const res = await fetch(`/api/pricing/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ size: editSize, type: editType, price: Number(editPrice) }),
    });
    if (res.ok) {
      const updated = await res.json();
      setPrices(prices.map(p => p.id === id ? updated : p));
      cancelEdit();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-heading text-gold mb-4">Photo Frame Pricing</h2>
      <div className="mb-6 flex gap-4 flex-wrap">
        <input placeholder="Size (e.g., 6x4)" className="bg-navy border border-border p-2 rounded text-text-primary" value={size} onChange={e => setSize(e.target.value)} />
        <select className="bg-navy border border-border p-2 rounded text-text-primary" value={type} onChange={e => setType(e.target.value)}>
          {['Standard','1-inch Frame','Oil Painting Finish','Premium Frame','2-inch Frame','3-inch Frame'].map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <input type="number" placeholder="Price (₹)" className="bg-navy border border-border p-2 rounded text-text-primary" value={price} onChange={e => setPrice(e.target.value)} />
        <button onClick={addPrice} className="bg-gold text-navy px-4 py-2 rounded hover:bg-gold-dark">Add</button>
      </div>
      <table className="min-w-full border border-border">
        <thead className="bg-navy-light">
          <tr>
            <th className="p-2 text-left text-gold">Size</th>
            <th className="p-2 text-left text-gold">Type</th>
            <th className="p-2 text-left text-gold">Price</th>
            <th className="p-2 text-left text-gold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {prices.map(p => (
            <tr key={p.id} className="border-t border-border">
              {editId === p.id ? (
                <>
                  <td className="p-2"><input value={editSize} onChange={e => setEditSize(e.target.value)} className="bg-navy border border-border p-1 rounded text-text-primary w-20" /></td>
                  <td className="p-2"><select value={editType} onChange={e => setEditType(e.target.value)} className="bg-navy border border-border p-1 rounded text-text-primary">
                    {['Standard','1-inch Frame','Oil Painting Finish','Premium Frame','2-inch Frame','3-inch Frame'].map(t => <option key={t} value={t}>{t}</option>)}
                  </select></td>
                  <td className="p-2"><input type="number" value={editPrice} onChange={e => setEditPrice(e.target.value)} className="bg-navy border border-border p-1 rounded text-text-primary w-20" /></td>
                  <td className="p-2 flex gap-2">
                    <button onClick={() => saveEdit(p.id)} className="bg-green-600 text-white px-2 py-1 rounded text-xs">Save</button>
                    <button onClick={cancelEdit} className="bg-gray-500 text-white px-2 py-1 rounded text-xs">Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td className="p-2">{p.size}</td>
                  <td className="p-2">{p.type}</td>
                  <td className="p-2">₹{p.price}</td>
                  <td className="p-2 flex gap-2">
                    <button onClick={() => startEdit(p)} className="text-blue-400 text-sm hover:underline">Edit</button>
                    <button onClick={() => deletePrice(p.id)} className="text-red-400 text-sm hover:underline">Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}