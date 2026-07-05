'use client';
import { useState,useRef } from 'react';
import Image from 'next/image';
import imageCompression from "browser-image-compression";
import { toast } from "sonner";

type PortfolioImage = {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  thumbnailUrl?: string;
};

export default function PortfolioManager({ initialImages }: { initialImages: PortfolioImage[] }) {
  const [images, setImages] = useState(initialImages);

  // Add state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Wedding');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
const [deletingId, setDeletingId] = useState<string | null>(null);
const [savingId, setSavingId] = useState<string | null>(null);
const fileInputRef = useRef<HTMLInputElement>(null);
const editFileInputRef = useRef<HTMLInputElement>(null);


  // Edit state
  const [editId, setEditId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState('Wedding');
  const [editFile, setEditFile] = useState<File | null>(null);
  const [compressing, setCompressing] = useState(false);

  const handleUpload = async () => {
  if (uploading) return;

if (!title.trim()) {
  toast.error("Please enter an image title.");
  return;
}

if (!file) {
  toast.error("Please select an image.");
  return;
}

  setUploading(true);

  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('category', category);

    const res = await fetch('/api/portfolio', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      const newImg = await res.json();
      setImages([...images, newImg]);
      setTitle('');
      setFile(null);
      fileInputRef.current!.value = "";
      toast.success("Image uploaded successfully.");
    } else {
      const error = await res.json();
      toast.error(error.error || "Upload failed");
    }
  } finally {
    setUploading(false);

  }
};

  const handleDelete = async (id: string) => {
  if (deletingId) return;

  setDeletingId(id);

  try {
  const res = await fetch(`/api/portfolio/${id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    setImages(images.filter((img) => img.id !== id));
    toast.success("Image deleted successfully.");
  } else {
    toast.error("Failed to delete image.");
  }
} finally {
  setDeletingId(null);
}
};

  const startEdit = (img: PortfolioImage) => {
    setEditId(img.id);
    setEditTitle(img.title);
    setEditCategory(img.category);
    setEditFile(null); // reset file picker
  };

  const cancelEdit = () => setEditId(null);

  const saveEdit = async (id: string) => {
  if (savingId) return;

  setSavingId(id);

  try {
    const formData = new FormData();
    formData.append('title', editTitle);
    formData.append('category', editCategory);

    if (editFile) {
      formData.append('file', editFile);
    }

    const res = await fetch(`/api/portfolio/${id}`, {
      method: 'PATCH',
      body: formData,
    });

    if (res.ok) {
      const updated = await res.json();
      setImages(images.map(img => (img.id === id ? updated : img)));
      setEditFile(null);
  editFileInputRef.current!.value = "";
  toast.success("Image updated successfully.");
      cancelEdit();
    } else {
      const error = await res.json();
     toast.error(error.error || "Failed to update");
    }
  } finally {
    setSavingId(null);
  }
};

  return (
    <div>
      <h2 className="text-2xl font-heading text-gold mb-4">Portfolio Images</h2>

      {/* Add new image */}
      <div className="mb-6 flex gap-4 flex-wrap">
        <input
  type="text"
  placeholder="Image title"
  className="bg-navy border border-border p-2 rounded text-text-primary"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
/>
        <select
          className="bg-navy border border-border p-2 rounded text-text-primary"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {['Wedding', 'Candid', 'Traditional', 'Engagement', 'Pre Wedding', 'Outdoor Shoot', 'Birthday', 'Corporate', 'Drone', 'Album'].map(
            (c) => (
              <option key={c} value={c}>
                {c}
              </option>
            )
          )}
        </select>
        <input
        ref={fileInputRef}
  type="file"
  className="text-text-secondary"
  onChange={async (e) => {
  const selected = e.target.files?.[0];
  if (!selected) return;

  setCompressing(true);

  try {
    const compressed = await imageCompression(selected, {
      maxSizeMB: 5,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    });

    setFile(compressed as File);
  } finally {
    setCompressing(false);
  }
}}
/>
       <button
  onClick={handleUpload}
  disabled={uploading || compressing}
  className="bg-gold text-navy px-4 py-2 rounded hover:bg-gold-dark disabled:opacity-50 disabled:cursor-not-allowed"
>
  {compressing
    ? "Optimizing..."
    : uploading
    ? "Uploading..."
    : "Upload"}
</button>
{compressing && (
  <div className="flex items-center gap-2 text-yellow-400 text-sm">
    <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
    <span>Optimizing image...</span>
  </div>
)}
      </div>

      {/* Images grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <div
            key={img.id}
            className="relative bg-navy-light border border-border rounded-lg overflow-hidden group"
          >
            <Image
              src={img.thumbnailUrl || img.imageUrl}
              alt={img.title}
              width={200}
              height={150}
              className="w-full h-32 object-cover"
            />

            {editId === img.id ? (
              <div className="p-3 space-y-2">
                <div className="text-sm text-text-secondary mb-1">Current image:</div>
                <Image
                  src={img.thumbnailUrl || img.imageUrl}
                  alt="Current"
                  width={80}
                  height={60}
                  className="rounded border border-border"
                />
                <input
                ref={editFileInputRef}
                  type="file"
                  onChange={async (e) => {
  const selected = e.target.files?.[0];
  if (!selected) return;

  setCompressing(true);

  try {
    const compressed = await imageCompression(selected, {
      maxSizeMB: 5,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    });

    setEditFile(compressed as File);
  } finally {
    setCompressing(false);
  }
}}
                  className="text-xs text-text-secondary"
                />
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full bg-navy border border-border p-1 rounded text-text-primary text-sm"
                  placeholder="Title"
                />
                <select
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  className="w-full bg-navy border border-border p-1 rounded text-text-primary text-sm"
                >
                  {['Wedding', 'Candid', 'Traditional', 'Engagement', 'Pre Wedding', 'Outdoor Shoot', 'Birthday', 'Corporate', 'Drone', 'Album'].map(
                    (c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    )
                  )}
                </select>
                <div className="flex gap-2">
                 <button
  onClick={() => saveEdit(img.id)}
  disabled={savingId === img.id}
  className="bg-green-600 text-white px-3 py-2 rounded flex items-center gap-2 disabled:opacity-50"
>
  {savingId === img.id && (
    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
  )}
  {savingId === img.id ? "Saving..." : "Save"}
</button>
                  <button
                    onClick={cancelEdit}
                    className="bg-gray-500 text-white px-2 py-1 rounded text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-2">
                <p className="text-sm">{img.title}</p>
                <p className="text-xs text-text-secondary">{img.category}</p>
                <div className="flex gap-2 mt-1">
                  <button
                    onClick={() => startEdit(img)}
                    className="text-blue-400 text-xs hover:underline"
                  >
                    Edit
                  </button>
                 <button
  onClick={() => handleDelete(img.id)}
  disabled={deletingId === img.id}
  className="text-red-400 text-xs hover:underline disabled:opacity-50"
>
  {deletingId === img.id ? "Deleting..." : "Delete"}
</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}