'use client';

import { useState, useEffect } from 'react';
import { supabase, type GalleryPhoto } from '@/lib/supabase';

type Props = {
  photo: GalleryPhoto | null;
  onSave: () => void;
  onCancel: () => void;
};

export default function AdminGalleryForm({ photo, onSave, onCancel }: Props) {
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [displayOrder, setDisplayOrder] = useState(0);
  const [published, setPublished] = useState(true);
  const [saving, setSaving] = useState(false);
  const [previewError, setPreviewError] = useState(false);

  useEffect(() => {
    if (photo) {
      setTitle(photo.title);
      setCaption(photo.caption);
      setImageUrl(photo.image_url);
      setDisplayOrder(photo.display_order);
      setPublished(photo.published);
    }
  }, [photo]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!imageUrl.trim()) return;
    setSaving(true);
    const payload = {
      title: title.trim(),
      caption: caption.trim(),
      image_url: imageUrl.trim(),
      display_order: displayOrder,
      published,
    };
    if (photo) {
      await supabase.from('gallery_photos').update(payload).eq('id', photo.id);
    } else {
      await supabase.from('gallery_photos').insert(payload);
    }
    setSaving(false);
    onSave();
  }

  const showPreview = imageUrl.trim().length > 0 && !previewError;

  return (
    <form onSubmit={handleSubmit} className="space-y-5 p-5">
      {/* Image URL */}
      <div>
        <label className="block font-inter text-sm font-medium text-charcoal mb-1.5">
          Image URL <span className="text-red-500">*</span>
        </label>
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => { setImageUrl(e.target.value); setPreviewError(false); }}
          placeholder="https://images.unsplash.com/..."
          required
          className="w-full font-inter text-sm border border-cream-100 bg-cream rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-forest-400 placeholder:text-muted-gray/60"
        />
      </div>

      {/* Image preview */}
      {showPreview && (
        <div className="rounded-xl overflow-hidden border border-cream-100 bg-cream h-44">
          <img
            src={imageUrl}
            alt="Preview"
            onError={() => setPreviewError(true)}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      {previewError && (
        <p className="text-xs font-inter text-red-500">Could not load image from that URL.</p>
      )}

      {/* Title */}
      <div>
        <label className="block font-inter text-sm font-medium text-charcoal mb-1.5">
          Title <span className="text-muted-gray font-normal">(optional)</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Classroom Learning"
          className="w-full font-inter text-sm border border-cream-100 bg-cream rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-forest-400 placeholder:text-muted-gray/60"
        />
      </div>

      {/* Caption */}
      <div>
        <label className="block font-inter text-sm font-medium text-charcoal mb-1.5">
          Caption <span className="text-muted-gray font-normal">(optional)</span>
        </label>
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="A short description shown over the photo..."
          rows={2}
          className="w-full font-inter text-sm border border-cream-100 bg-cream rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-forest-400 placeholder:text-muted-gray/60 resize-none"
        />
      </div>

      {/* Display order + Published row */}
      <div className="flex items-end gap-4">
        <div className="flex-1">
          <label className="block font-inter text-sm font-medium text-charcoal mb-1.5">Display Order</label>
          <input
            type="number"
            value={displayOrder}
            onChange={(e) => setDisplayOrder(Number(e.target.value))}
            min={0}
            className="w-full font-inter text-sm border border-cream-100 bg-cream rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-forest-400"
          />
        </div>
        <div className="flex-1">
          <label className="block font-inter text-sm font-medium text-charcoal mb-1.5">Visibility</label>
          <button
            type="button"
            onClick={() => setPublished((p) => !p)}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-inter font-medium transition-colors ${
              published ? 'bg-sage-100 text-sage-700' : 'bg-cream-100 text-muted-gray'
            }`}
          >
            {published ? 'Published' : 'Draft'}
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-3 rounded-xl font-inter text-sm font-medium bg-cream text-muted-gray hover:bg-cream-100 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving || !imageUrl.trim()}
          className="flex-1 py-3 rounded-xl font-inter text-sm font-medium bg-forest-500 text-white hover:bg-forest-600 disabled:opacity-60 transition-colors"
        >
          {saving ? 'Saving…' : photo ? 'Save Changes' : 'Add Photo'}
        </button>
      </div>
    </form>
  );
}
