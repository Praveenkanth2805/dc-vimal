'use client';
import { useState } from 'react';
import { submitBooking } from '@/app/actions';
import { toast } from "sonner";

export default function ContactForm() {
  const [form, setForm] = useState({
    fullName: '',
    mobile: '',
    eventType: '',
    eventDate: '',
    venue: '',
    message: '',
  });
const [loading, setLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!form.fullName.trim()) {
    toast.error("Please enter your full name");
    return;
  }

  if (!form.mobile.trim()) {
    toast.error("Please enter your mobile number");
    return;
  }

  if (!/^\d{10}$/.test(form.mobile)) {
    toast.error("Please enter a valid 10-digit mobile number");
    return;
  }

  if (!form.eventType) {
    toast.error("Please select an event type");
    return;
  }

  if (!form.eventDate) {
    toast.error("Please select an event date");
    return;
  }

  if (!form.venue) {
    toast.error("Please enter a venue");
    return;
  }
  setLoading(true);

  try {
    await submitBooking(form);

    toast.success("Booking submitted successfully!");

    const text = `Hello DC Creation,
I would like to book your photography/videography service.

Name: ${form.fullName}
Phone: ${form.mobile}
Event Type: ${form.eventType}
Event Date: ${form.eventDate}
Venue: ${form.venue}

Message: ${form.message}

Thank you.`;

    window.open(
      `https://wa.me/917200304753?text=${encodeURIComponent(text)}`,
      "_blank"
    );

    setForm({
      fullName: "",
      mobile: "",
      eventType: "",
      eventDate: "",
      venue: "",
      message: "",
    });

  } catch (error: any) {
    if (error?.issues?.length) {
      toast.error(error.issues[0].message);
    } else {
      toast.error("Submission failed. Please try again.");
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <form  noValidate onSubmit={handleSubmit} className="max-w-lg mx-auto bg-navy-light border border-border p-8 rounded-xl space-y-5">
      <input name="fullName" placeholder="Full Name"  value={form.fullName} onChange={handleChange} className="w-full p-3 bg-navy border border-border rounded text-text-primary" />
      <input name="mobile" placeholder="Mobile Number"  value={form.mobile} onChange={handleChange} className="w-full p-3 bg-navy border border-border rounded text-text-primary" />
      <select name="eventType"  value={form.eventType} onChange={handleChange} className="w-full p-3 bg-navy border border-border rounded text-text-primary">
        <option value="">Select Event Type</option>
        <option>Wedding</option>
        <option>Pre-Wedding</option>
        <option>Birthday</option>
        <option>Corporate</option>
        <option>Other</option>
      </select>
      <input type="date" name="eventDate" value={form.eventDate} onChange={handleChange} className="w-full p-3 bg-navy border border-border rounded text-text-primary" />
      <input name="venue" placeholder="Venue" value={form.venue} onChange={handleChange} className="w-full p-3 bg-navy border border-border rounded text-text-primary" />
      <textarea name="message" placeholder="Your Message" rows={4} value={form.message} onChange={handleChange} className="w-full p-3 bg-navy border border-border rounded text-text-primary" />
      <button
  type="submit"
  disabled={loading}
  className="w-full bg-gold text-navy py-3 rounded-full font-semibold hover:bg-gold-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
>
  {loading ? "Submitting..." : "Submit & Chat on WhatsApp"}
</button>
    </form>
  );
}