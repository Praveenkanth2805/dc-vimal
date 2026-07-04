'use client';
import { useState } from 'react';

type Review = {
  id: string;
  customerName: string;
  rating: number;
  reviewText: string;
  photoUrl?: string;
};

export default function ReviewManager({ initialReviews }: { initialReviews: Review[] }) {
  const [reviews, setReviews] = useState(initialReviews);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');

  // edit state
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editRating, setEditRating] = useState(5);
  const [editText, setEditText] = useState('');

  const addReview = async () => {
    if (!name || !text) return;
    const res = await fetch('/api/reviews', {
      method: 'POST',
      body: JSON.stringify({ customerName: name, rating, reviewText: text }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      const newReview = await res.json();
      setReviews([newReview, ...reviews]);
      setName('');
      setText('');
    }
  };

  const deleteReview = async (id: string) => {
    await fetch(`/api/reviews/${id}`, { method: 'DELETE' });
    setReviews(reviews.filter(r => r.id !== id));
  };

  const startEdit = (r: Review) => {
    setEditId(r.id);
    setEditName(r.customerName);
    setEditRating(r.rating);
    setEditText(r.reviewText);
  };
  const cancelEdit = () => setEditId(null);

  const saveEdit = async (id: string) => {
    const res = await fetch(`/api/reviews/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customerName: editName, rating: editRating, reviewText: editText }),
    });
    if (res.ok) {
      const updated = await res.json();
      setReviews(reviews.map(r => r.id === id ? updated : r));
      cancelEdit();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-heading text-gold mb-4">Reviews</h2>
      {/* add form unchanged */}
      <div className="mb-6 flex gap-4 flex-wrap">
        <input placeholder="Customer Name" className="bg-navy border border-border p-2 rounded text-text-primary" value={name} onChange={e => setName(e.target.value)} />
        <select className="bg-navy border border-border p-2 rounded text-text-primary" value={rating} onChange={e => setRating(Number(e.target.value))}>
          {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} Star</option>)}
        </select>
        <input placeholder="Review Text" className="bg-navy border border-border p-2 rounded text-text-primary flex-1" value={text} onChange={e => setText(e.target.value)} />
        <button onClick={addReview} className="bg-gold text-navy px-4 py-2 rounded hover:bg-gold-dark">Add Review</button>
      </div>
      <div className="space-y-2">
        {reviews.map(r => (
          <div key={r.id} className="bg-navy-light p-3 rounded border border-border flex justify-between">
            {editId === r.id ? (
              <div className="flex flex-col gap-2 flex-1">
                <input value={editName} onChange={e => setEditName(e.target.value)} className="bg-navy border border-border p-1 rounded text-text-primary" />
                <select value={editRating} onChange={e => setEditRating(Number(e.target.value))} className="bg-navy border border-border p-1 rounded text-text-primary">
                  {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} Star</option>)}
                </select>
                <textarea value={editText} onChange={e => setEditText(e.target.value)} className="bg-navy border border-border p-1 rounded text-text-primary" rows={2} />
                <div className="flex gap-2">
                  <button onClick={() => saveEdit(r.id)} className="bg-green-600 text-white px-2 py-1 rounded text-xs">Save</button>
                  <button onClick={cancelEdit} className="bg-gray-500 text-white px-2 py-1 rounded text-xs">Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <div>
                  <span className="font-semibold">{r.customerName}</span> - {r.rating}★
                  <p className="text-text-secondary text-sm">{r.reviewText}</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => startEdit(r)} className="text-blue-400 text-sm">Edit</button>
                  <button onClick={() => deleteReview(r.id)} className="text-red-400 text-sm">Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}