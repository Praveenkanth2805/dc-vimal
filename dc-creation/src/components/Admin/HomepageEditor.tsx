'use client';
import { useState } from 'react';
import { toast } from "sonner";

type Stat = { label: string; value: number };
type HomepageData = {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  aboutText: string;
  whyChooseUs: string[];
  stats: Stat[];
};

export default function HomepageEditor({ initialData }: { initialData: HomepageData }) {
  const [form, setForm] = useState<HomepageData>(initialData);
    

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Why choose us array edit
  const addWhyPoint = () => setForm({ ...form, whyChooseUs: [...form.whyChooseUs, ''] });
  const updateWhyPoint = (index: number, value: string) => {
    const updated = [...form.whyChooseUs];
    updated[index] = value;
    setForm({ ...form, whyChooseUs: updated });
  };
  const removeWhyPoint = (index: number) => {
    setForm({ ...form, whyChooseUs: form.whyChooseUs.filter((_, i) => i !== index) });
  };

  // Stats array edit
  const addStat = () => setForm({ ...form, stats: [...form.stats, { label: '', value: 0 }] });
  const updateStat = (index: number, field: 'label' | 'value', val: string | number) => {
    const updated = [...form.stats];
    updated[index] = { ...updated[index], [field]: val };
    setForm({ ...form, stats: updated });
  };
  const removeStat = (index: number) => {
    setForm({ ...form, stats: form.stats.filter((_, i) => i !== index) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const payload = {
    heroTitle: form.heroTitle,
    heroSubtitle: form.heroSubtitle,
    heroImage: form.heroImage,
    aboutText: form.aboutText,
    whyChooseUs: JSON.stringify(form.whyChooseUs),
    stats: JSON.stringify(form.stats),
  };

  const loading = toast.loading("Saving homepage...");

  try {
    const res = await fetch('/api/homepage', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error();
    }

    toast.success("Homepage updated successfully!", {
      id: loading,
    });
  } catch {
    toast.error("Failed to update homepage.", {
      id: loading,
    });
  }
};

  return (
    <div>
      <h2 className="text-2xl font-heading text-gold mb-6">Homepage Content</h2>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
        <div>
          <label className="text-gold block mb-1">Hero Title</label>
          <input name="heroTitle" value={form.heroTitle} onChange={handleChange} className="w-full bg-navy border border-border p-2 rounded text-text-primary" />
        </div>
        <div>
          <label className="text-gold block mb-1">Hero Subtitle</label>
          <input name="heroSubtitle" value={form.heroSubtitle} onChange={handleChange} className="w-full bg-navy border border-border p-2 rounded text-text-primary" />
        </div>
        <div>
          <label className="text-gold block mb-1">Hero Image URL</label>
          <input name="heroImage" value={form.heroImage} onChange={handleChange} className="w-full bg-navy border border-border p-2 rounded text-text-primary" />
        </div>
        <div>
          <label className="text-gold block mb-1">About Text</label>
          <textarea name="aboutText" value={form.aboutText} onChange={handleChange} rows={4} className="w-full bg-navy border border-border p-2 rounded text-text-primary" />
        </div>

        {/* Why Choose Us */}
        <div>
          <label className="text-gold block mb-1">Why Choose Us (list)</label>
          {form.whyChooseUs.map((point, idx) => (
            <div key={idx} className="flex gap-2 mb-1">
              <input
                value={point}
                onChange={(e) => updateWhyPoint(idx, e.target.value)}
                className="flex-1 bg-navy border border-border p-1 rounded text-text-primary"
              />
              <button type="button" onClick={() => removeWhyPoint(idx)} className="text-red-500">X</button>
            </div>
          ))}
          <button type="button" onClick={addWhyPoint} className="text-blue-400 text-sm mt-1">+ Add point</button>
        </div>

        {/* Statistics */}
        <div>
          <label className="text-gold block mb-1">Statistics</label>
          {form.stats.map((stat, idx) => (
            <div key={idx} className="flex gap-2 mb-1 items-center">
              <input
                placeholder="Label"
                value={stat.label}
                onChange={(e) => updateStat(idx, 'label', e.target.value)}
                className="flex-1 bg-navy border border-border p-1 rounded text-text-primary"
              />
              <input
                type="number"
                placeholder="Value"
                value={stat.value}
                onChange={(e) => updateStat(idx, 'value', Number(e.target.value))}
                className="w-24 bg-navy border border-border p-1 rounded text-text-primary"
              />
              <button type="button" onClick={() => removeStat(idx)} className="text-red-500">X</button>
            </div>
          ))}
          <button type="button" onClick={addStat} className="text-blue-400 text-sm mt-1">+ Add stat</button>
        </div>

        <button type="submit" className="bg-gold text-navy px-6 py-2 rounded font-semibold hover:bg-gold-dark">
          Save Changes
        </button>
        
      </form>
    </div>
  );
}