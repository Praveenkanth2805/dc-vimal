'use client';
import { useState, useEffect } from 'react';
import { toast } from 'sonner'; 

type ContactInfo = {
  address?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  mapEmbed?: string;
  openingHours?: string;  // JSON string
  socialLinks?: string;   // JSON string
};

export default function SettingsForm({ initialData }: { initialData: ContactInfo | null }) {
  const [form, setForm] = useState<ContactInfo>({
    address: '',
    phone: '',
    whatsapp: '',
    email: '',
    mapEmbed: '',
    openingHours: '["Mon-Sun: 09:00 AM - 05:00 PM"]',
    socialLinks: '{"instagram":"#","facebook":"#","youtube":"#"}',
  });
  
  const [loading, setLoading] = useState(false);
  const [social, setSocial] = useState({
  instagram: '',
  facebook: '',
  youtube: '',
});

  useEffect(() => {
    if (initialData) {
      setForm({
        address: initialData.address || '',
        phone: initialData.phone || '',
        whatsapp: initialData.whatsapp || '',
        email: initialData.email || '',
        mapEmbed: initialData.mapEmbed || '',
        openingHours: initialData.openingHours || '[]',
        socialLinks: initialData.socialLinks || '{}',
      });
    }
    if (initialData?.socialLinks) {
  try {
    setSocial(JSON.parse(initialData.socialLinks));
  } catch {
    setSocial({
      instagram: '',
      facebook: '',
      youtube: '',
    });
  }
}
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSocialChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  setSocial({
    ...social,
    [e.target.name]: e.target.value,
  });
};

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  setLoading(true);

  const payload = {
  ...form,
  socialLinks: JSON.stringify(social),
};

const promise = fetch('/api/contact-info', {
  method: 'PUT',
  body: JSON.stringify(payload),
  headers: {
    'Content-Type': 'application/json',
  },
}).then(async (res) => {
  if (!res.ok) {
    throw new Error('Failed');
  }
  return res;
});

  toast.promise(promise, {
    loading: 'Saving settings...',
    success: 'Settings saved successfully!',
    error: 'Failed to save settings.',
  });

  try {
   await promise;
  } finally {
    setLoading(false);
  }
};

  return (
    <div>
      <h2 className="text-2xl font-heading text-gold mb-4">Contact & Social Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <input name="address" placeholder="Address" className="w-full bg-navy border border-border p-2 rounded text-text-primary" value={form.address} onChange={handleChange} />
        <input name="phone" placeholder="Phone" className="w-full bg-navy border border-border p-2 rounded text-text-primary" value={form.phone} onChange={handleChange} />
        <input name="whatsapp" placeholder="WhatsApp number (with country code, e.g., 917200304753)" className="w-full bg-navy border border-border p-2 rounded text-text-primary" value={form.whatsapp} onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" className="w-full bg-navy border border-border p-2 rounded text-text-primary" value={form.email} onChange={handleChange} />
        <textarea name="mapEmbed" placeholder="Google Maps embed code" rows={3} className="w-full bg-navy border border-border p-2 rounded text-text-primary" value={form.mapEmbed} onChange={handleChange} />
        <textarea name="openingHours" placeholder='JSON array of hours, e.g., ["Mon-Fri: 9-5"]' rows={2} className="w-full bg-navy border border-border p-2 rounded text-text-primary" value={form.openingHours} onChange={handleChange} />
        <input
  name="instagram"
  placeholder="Instagram URL"
  className="w-full bg-navy border border-border p-2 rounded text-text-primary"
  value={social.instagram}
  onChange={handleSocialChange}
/>

<input
  name="facebook"
  placeholder="Facebook URL"
  className="w-full bg-navy border border-border p-2 rounded text-text-primary"
  value={social.facebook}
  onChange={handleSocialChange}
/>

<input
  name="youtube"
  placeholder="YouTube URL"
  className="w-full bg-navy border border-border p-2 rounded text-text-primary"
  value={social.youtube}
  onChange={handleSocialChange}
/>
        <button
  type="submit"
  disabled={loading}
  className="bg-gold text-navy px-6 py-2 rounded font-semibold hover:bg-gold-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
>
  {loading ? 'Saving...' : 'Save Settings'}
</button>
        
      </form>
    </div>
  );
}