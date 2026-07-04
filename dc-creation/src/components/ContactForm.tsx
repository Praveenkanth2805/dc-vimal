'use client';
import { useState } from 'react';
import { submitBooking } from '@/app/actions';

export default function ContactForm() {
  const [form, setForm] = useState({
    fullName: '',
    mobile: '',
    eventType: '',
    eventDate: '',
    venue: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitBooking(form);
      const text = `Hello DC Creation,\nI would like to book your photography/videography service.\n\nName: ${form.fullName}\nPhone: ${form.mobile}\nEvent Type: ${form.eventType}\nEvent Date: ${form.eventDate}\nVenue: ${form.venue}\n\nMessage: ${form.message}\nThank you.`;
      window.open(`https://wa.me/917200304753?text=${encodeURIComponent(text)}`, '_blank');
    } catch (error) {
      alert('Submission failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-navy-light border border-border p-8 rounded-xl space-y-5">
      <input name="fullName" placeholder="Full Name" required value={form.fullName} onChange={handleChange} className="w-full p-3 bg-navy border border-border rounded text-text-primary" />
      <input name="mobile" placeholder="Mobile Number" required value={form.mobile} onChange={handleChange} className="w-full p-3 bg-navy border border-border rounded text-text-primary" />
      <select name="eventType" required value={form.eventType} onChange={handleChange} className="w-full p-3 bg-navy border border-border rounded text-text-primary">
        <option value="">Select Event Type</option>
        <option>Wedding</option>
        <option>Pre-Wedding</option>
        <option>Birthday</option>
        <option>Corporate</option>
        <option>Other</option>
      </select>
      <input type="date" name="eventDate" required value={form.eventDate} onChange={handleChange} className="w-full p-3 bg-navy border border-border rounded text-text-primary" />
      <input name="venue" placeholder="Venue" value={form.venue} onChange={handleChange} className="w-full p-3 bg-navy border border-border rounded text-text-primary" />
      <textarea name="message" placeholder="Your Message" rows={4} value={form.message} onChange={handleChange} className="w-full p-3 bg-navy border border-border rounded text-text-primary" />
      <button type="submit" className="w-full bg-gold text-navy py-3 rounded-full font-semibold hover:bg-gold-dark transition">
        Submit & Chat on WhatsApp
      </button>
    </form>
  );
}