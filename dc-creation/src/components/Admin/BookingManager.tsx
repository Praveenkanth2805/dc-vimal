'use client';
import { useState } from 'react';
import { toast } from "sonner";

type Booking = {
  id: string;
  fullName: string;
  mobile: string;
  eventType: string;
  eventDate: string;
  venue?: string;
  message?: string;
  contacted: boolean;
  createdAt: string;
};

export default function BookingManager({ initialBookings }: { initialBookings: Booking[] }) {
  const [bookings, setBookings] = useState(initialBookings);
  const [search, setSearch] = useState('');
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Booking>>({});

  const markContacted = async (id: string) => {
  const res = await fetch(`/api/bookings/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ contacted: true }),
  });

  if (res.ok) {
    setBookings(prev =>
      prev.map(b =>
        b.id === id
          ? { ...b, contacted: true }
          : b
      )
    );

    toast.success("Booking marked as contacted.");
  } else {
    toast.error("Failed to update booking.");
  }
};

  const deleteBooking = async (id: string) => {
  const res = await fetch(`/api/bookings/${id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    setBookings(bookings.filter(b => b.id !== id));
    toast.success("Booking deleted successfully.");
  } else {
    toast.error("Failed to delete booking.");
  }
};

  const startEdit = (b: Booking) => {
    setEditId(b.id);
    setEditForm({
      fullName: b.fullName,
      mobile: b.mobile,
      eventType: b.eventType,
      eventDate: b.eventDate.slice(0, 10),
      venue: b.venue || '',
      message: b.message || '',
      contacted: b.contacted,
    });
  };

  const cancelEdit = () => setEditId(null);

  const saveEdit = async (id: string) => {
  const res = await fetch(`/api/bookings/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(editForm),
  });

  if (res.ok) {
    const updated = await res.json();
    setBookings(bookings.map(b => b.id === id ? updated : b));
    cancelEdit();
    toast.success("Booking updated successfully.");
  } else {
    toast.error("Failed to update booking.");
  }
};

  const filtered = bookings.filter(
  b =>
    (b.fullName ?? "")
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    (b.mobile ?? "").includes(search)
);

  const whatsappLink = (b: Booking) =>
    `https://wa.me/91${b.mobile}?text=${encodeURIComponent(`Hello ${b.fullName},\nRegarding your ${b.eventType} enquiry on ${new Date(b.eventDate).toLocaleDateString()}.`)}`;

  // --- NEW: Export function ---
  const handleExport = () => {
  const url = search
    ? `/api/bookings/export?search=${encodeURIComponent(search)}`
    : "/api/bookings/export";

  window.open(url, "_blank");
  toast.success("Excel export started.");
};

  return (
    <div>
      <h2 className="text-2xl font-heading text-gold mb-4">Bookings</h2>

      {/* Search + Export row */}
      <div className="flex gap-4 mb-4 flex-wrap items-center">
        <input
          placeholder="Search by name or mobile"
          className="flex-1 bg-navy border border-border p-2 rounded text-text-primary"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button
          onClick={handleExport}
          className="bg-green-700 text-white px-5 py-2 rounded hover:bg-green-800 transition flex items-center gap-2"
        >
          📥 Export to Excel
        </button>
      </div>

      {/* Bookings list – unchanged */}
      <div className="space-y-4">
        {filtered.map(b => (
          <div key={b.id} className={`bg-navy-light border ${b.contacted ? 'border-green-500/50' : 'border-border'} p-4 rounded-lg`}>
            {editId === b.id ? (
              <div className="space-y-3">
                <input value={editForm.fullName} onChange={e => setEditForm({...editForm, fullName: e.target.value})} className="w-full bg-navy border border-border p-1 rounded" placeholder="Full Name" />
                <input value={editForm.mobile} onChange={e => setEditForm({...editForm, mobile: e.target.value})} className="w-full bg-navy border border-border p-1 rounded" placeholder="Mobile" />
                <input value={editForm.eventType} onChange={e => setEditForm({...editForm, eventType: e.target.value})} className="w-full bg-navy border border-border p-1 rounded" placeholder="Event Type" />
                <input type="date" value={editForm.eventDate} onChange={e => setEditForm({...editForm, eventDate: e.target.value})} className="w-full bg-navy border border-border p-1 rounded" />
                <input value={editForm.venue} onChange={e => setEditForm({...editForm, venue: e.target.value})} className="w-full bg-navy border border-border p-1 rounded" placeholder="Venue" />
                <textarea value={editForm.message} onChange={e => setEditForm({...editForm, message: e.target.value})} className="w-full bg-navy border border-border p-1 rounded" placeholder="Message" rows={2} />
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={editForm.contacted} onChange={e => setEditForm({...editForm, contacted: e.target.checked})} /> Contacted
                </label>
                <div className="flex gap-2">
                  <button onClick={() => saveEdit(b.id)} className="bg-green-600 text-white px-3 py-1 rounded text-sm">Save</button>
                  <button onClick={cancelEdit} className="bg-gray-500 text-white px-3 py-1 rounded text-sm">Cancel</button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-start flex-wrap gap-2">
                <div>
                  <p className="font-semibold text-lg">{b.fullName}</p>
                  <p className="text-text-secondary">{b.mobile} | {b.eventType} | {new Date(b.eventDate).toLocaleDateString()}</p>
                  {b.venue && <p className="text-sm">Venue: {b.venue}</p>}
                  {b.message && <p className="text-sm italic">"{b.message}"</p>}
                </div>
                <div className="flex gap-2">
                  <a href={whatsappLink(b)} target="_blank" className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">WhatsApp</a>
                  {!b.contacted && (
                    <button onClick={() => markContacted(b.id)} className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">Mark Contacted</button>
                  )}
                  <button onClick={() => startEdit(b)} className="bg-yellow-600 text-white px-3 py-1 rounded text-sm hover:bg-yellow-700">Edit</button>
                  <button onClick={() => deleteBooking(b.id)} className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && <p className="text-text-secondary text-center">No bookings found.</p>}
      </div>
    </div>
  );
}