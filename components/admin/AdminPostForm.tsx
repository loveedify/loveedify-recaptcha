'use client';

import { useState } from 'react';
import { supabase, type InspirationalPost } from '@/lib/supabase';

type Props = {
  post: InspirationalPost | null;
  onSave: () => void;
  onCancel: () => void;
};

export default function AdminPostForm({ post, onSave, onCancel }: Props) {
  const [form, setForm] = useState({
    title: post?.title || '',
    content: post?.content || '',
    scripture_reference: post?.scripture_reference || '',
    scripture_text: post?.scripture_text || '',
    category: post?.category || 'message',
    published: post?.published ?? false,
    featured: post?.featured ?? false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    let dbError;
    if (post) {
      const result = await supabase
        .from('inspirational_posts')
        .update({ ...form, updated_at: new Date().toISOString() })
        .eq('id', post.id);
      dbError = result.error;
    } else {
      const result = await supabase.from('inspirational_posts').insert(form);
      dbError = result.error;
    }

    setLoading(false);

    if (dbError) {
      setError('Error saving post. Please try again.');
    } else {
      onSave();
    }
  };

  const inputClass =
    'w-full px-4 py-3 rounded-[14px] border border-cream-100 bg-cream font-inter text-sm text-charcoal placeholder:text-muted-gray focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-sm font-inter font-medium text-charcoal mb-1.5">
            Title <span className="text-golden-500">*</span>
          </label>
          <input
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="Post title"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-inter font-medium text-charcoal mb-1.5">Category</label>
          <select name="category" value={form.category} onChange={handleChange} className={inputClass}>
            <option value="scripture">Scripture</option>
            <option value="devotional">Devotional</option>
            <option value="message">Message</option>
            <option value="newsletter">Newsletter</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-inter font-medium text-charcoal mb-1.5">Scripture Reference</label>
          <input
            name="scripture_reference"
            type="text"
            value={form.scripture_reference}
            onChange={handleChange}
            placeholder="e.g. Proverbs 22:6"
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-inter font-medium text-charcoal mb-1.5">Scripture Text</label>
          <input
            name="scripture_text"
            type="text"
            value={form.scripture_text}
            onChange={handleChange}
            placeholder="The actual Bible verse text"
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-inter font-medium text-charcoal mb-1.5">
            Content <span className="text-golden-500">*</span>
          </label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            required
            rows={5}
            placeholder="Write your inspirational message, devotional, or newsletter content..."
            className={`${inputClass} rounded-2xl resize-none`}
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            name="published"
            type="checkbox"
            checked={form.published}
            onChange={handleChange}
            className="w-4 h-4 accent-forest-500"
          />
          <span className="font-inter text-sm text-charcoal">Published</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            name="featured"
            type="checkbox"
            checked={form.featured}
            onChange={handleChange}
            className="w-4 h-4 accent-golden-500"
          />
          <span className="font-inter text-sm text-charcoal">Featured</span>
        </label>
      </div>

      {error && <p className="text-red-500 text-sm font-inter">{error}</p>}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary flex-1 disabled:opacity-60"
        >
          {loading ? 'Saving...' : post ? 'Update Post' : 'Create Post'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary flex-1"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
