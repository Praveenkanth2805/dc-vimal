'use client';
import { useState } from 'react';
import Image from 'next/image';

type PortfolioImage = {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  thumbnailUrl?: string;
};

export default function PortfolioManager({ initialImages }: { initialImages: PortfolioImage[] }) {
  const [images, setImages] = useState(initialImages);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Wedding');
  const [file, setFile] = useState<File | null>(null);

  // editing state
  const [editId, setEditId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState('Wedding');

  const handleUpload = async () => {
    if (!file || !title) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('category', category);
    const res = await fetch('/api/portfolio', { method: 'POST', body: formData });
    if (res.ok) {
      const newImg = await res.json();
      setImages([...images, newImg]);
      setTitle('');
      setFile(null);
    }
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/portfolio/${id}`, { method: 'DELETE' });
    setImages(images.filter((img) => img.id !== id));
  };

  const startEdit = (img: PortfolioImage) => {
    setEditId(img.id);
    setEditTitle(img.title);
    setEditCategory(img.category);
  };

  const cancelEdit = () => {
    setEditId(null);
  };

  const saveEdit = async (id: string) => {
    const res = await fetch(`/api/portfolio/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: editTitle, category: editCategory }),
    });
    if (res.ok) {
      const updated = await res.json();
      setImages(images.map(img => (img.id === id ? updated : img)));
      cancelEdit();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-heading text-gold mb-4">Portfolio Images</h2>
      {/* Add form remains the same */}
      <div className="mb-6 flex gap-4 flex-wrap">
        <input type="text" placeholder="Image title" className="bg-navy border border-border p-2 rounded text-text-primary" value={title} onChange={e => setTitle(e.target.value)} />
        <select className="bg-navy border border-border p-2 rounded text-text-primary" value={category} onChange={e => setCategory(e.target.value)}>
          {['Wedding','Candid','Traditional','Engagement','Pre Wedding','Outdoor Shoot','Birthday','Corporate','Drone','Album'].map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} />
        <button onClick={handleUpload} className="bg-gold text-navy px-4 py-2 rounded hover:bg-gold-dark">Upload</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.id} className="relative bg-navy-light border border-border rounded-lg overflow-hidden group">
            <Image src={img.thumbnailUrl || img.imageUrl} alt={img.title} width={200} height={150} className="w-full h-32 object-cover" />
            {editId === img.id ? (
              <div className="p-2 space-y-2">
                <input value={editTitle} onChange={e => setEditTitle(e.target.value)} className="w-full bg-navy border border-border p-1 rounded text-text-primary text-sm" />
                <select value={editCategory} onChange={e => setEditCategory(e.target.value)} className="w-full bg-navy border border-border p-1 rounded text-text-primary text-sm">
                  {['Wedding','Candid','Traditional','Engagement','Pre Wedding','Outdoor Shoot','Birthday','Corporate','Drone','Album'].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <div className="flex gap-2 mt-1">
                  <button onClick={() => saveEdit(img.id)} className="bg-green-600 text-white px-2 py-1 rounded text-xs">Save</button>
                  <button onClick={cancelEdit} className="bg-gray-500 text-white px-2 py-1 rounded text-xs">Cancel</button>
                </div>
              </div>
            ) : (
              <div className="p-2">
                <p className="text-sm">{img.title} ({img.category})</p>
                <div className="flex gap-2 mt-1">
                  <button onClick={() => startEdit(img)} className="text-blue-400 text-xs hover:underline">Edit</button>
                  <button onClick={() => handleDelete(img.id)} className="text-red-400 text-xs hover:underline">Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}