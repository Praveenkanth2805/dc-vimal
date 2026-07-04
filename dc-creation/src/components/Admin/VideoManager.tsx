'use client';
import { useState } from 'react';

type Video = {
  id: string;
  title: string;
  category: string;
  youtubeId: string;
};

export default function VideoManager({ initialVideos }: { initialVideos: Video[] }) {
  const [videos, setVideos] = useState(initialVideos);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Wedding Films');
  const [youtubeId, setYoutubeId] = useState('');

  // edit state
  const [editId, setEditId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState('Wedding Films');
  const [editYoutubeId, setEditYoutubeId] = useState('');

  const addVideo = async () => {
    if (!title || !youtubeId) return;
    const res = await fetch('/api/videos', {
      method: 'POST',
      body: JSON.stringify({ title, category, youtubeId }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      const newVideo = await res.json();
      setVideos([...videos, newVideo]);
      setTitle('');
      setYoutubeId('');
    }
  };

  const deleteVideo = async (id: string) => {
    await fetch(`/api/videos/${id}`, { method: 'DELETE' });
    setVideos(videos.filter(v => v.id !== id));
  };

  const startEdit = (v: Video) => {
    setEditId(v.id);
    setEditTitle(v.title);
    setEditCategory(v.category);
    setEditYoutubeId(v.youtubeId);
  };

  const cancelEdit = () => setEditId(null);

  const saveEdit = async (id: string) => {
    const res = await fetch(`/api/videos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: editTitle, category: editCategory, youtubeId: editYoutubeId }),
    });
    if (res.ok) {
      const updated = await res.json();
      setVideos(videos.map(v => v.id === id ? updated : v));
      cancelEdit();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-heading text-gold mb-4">Videos</h2>
      <div className="mb-6 flex gap-4 flex-wrap">
        <input placeholder="Title" className="bg-navy border border-border p-2 rounded text-text-primary" value={title} onChange={e => setTitle(e.target.value)} />
        <select className="bg-navy border border-border p-2 rounded text-text-primary" value={category} onChange={e => setCategory(e.target.value)}>
          {['Wedding Films','Highlight Videos','Drone Videos','Event Videos'].map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <input placeholder="YouTube ID" className="bg-navy border border-border p-2 rounded text-text-primary" value={youtubeId} onChange={e => setYoutubeId(e.target.value)} />
        <button onClick={addVideo} className="bg-gold text-navy px-4 py-2 rounded hover:bg-gold-dark">Add Video</button>
      </div>
      <div className="space-y-2">
        {videos.map(v => (
          <div key={v.id} className="flex items-center justify-between bg-navy-light p-3 rounded border border-border">
            {editId === v.id ? (
              <div className="flex items-center gap-2 flex-1">
                <input value={editTitle} onChange={e => setEditTitle(e.target.value)} className="bg-navy border border-border p-1 rounded text-text-primary text-sm" />
                <select value={editCategory} onChange={e => setEditCategory(e.target.value)} className="bg-navy border border-border p-1 rounded text-text-primary text-sm">
                  {['Wedding Films','Highlight Videos','Drone Videos','Event Videos'].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <input value={editYoutubeId} onChange={e => setEditYoutubeId(e.target.value)} className="bg-navy border border-border p-1 rounded text-text-primary text-sm" />
                <button onClick={() => saveEdit(v.id)} className="text-green-400 text-sm">Save</button>
                <button onClick={cancelEdit} className="text-gray-400 text-sm">Cancel</button>
              </div>
            ) : (
              <>
                <span className="flex-1">{v.title} ({v.category})</span>
                <div className="flex gap-3">
                  <button onClick={() => startEdit(v)} className="text-blue-400 hover:text-blue-300 text-sm">Edit</button>
                  <button onClick={() => deleteVideo(v.id)} className="text-red-400 hover:text-red-300 text-sm">Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}