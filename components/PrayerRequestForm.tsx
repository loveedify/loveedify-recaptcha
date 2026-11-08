'use client';

import { useState } from 'react';
import { CircleCheck as CheckCircle } from 'lucide-react';
import { submitProtectedForm } from '@/lib/form-submission';
import RecaptchaNotice from '@/components/RecaptchaNotice';

export default function PrayerRequestForm() {
  const [form, setForm] = useState({ name: '', email: '', request: '', is_private: false });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

    const result = await submitProtectedForm('prayer', form);

    setLoading(false);

    if (result.ok) {
      setSuccess(true);
    } else {
      setError(result.message);
    }
  };

  if (success) {
    return (
      <div className="bg-white rounded-2xl border border-cream-100 p-8 text-center shadow-soft">
        <div className="w-14 h-14 bg-sage-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-7 h-7 text-sage-500" />
        </div>
        <h3 className="font-poppins font-600 text-forest-500 text-xl mb-2">
          Request Received
        </h3>
        <p className="text-muted-gray font-inter text-sm leading-relaxed mb-5">
          Thank you for trusting us with your prayer request. Our team will be praying for you.
          May God&apos;s peace surround you.
        </p>
        <p className="font-playfair italic text-forest-400 text-sm">
          &ldquo;The Lord is near to all who call on him.&rdquo; — Psalm 145:18
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-cream-100 p-6 shadow-soft space-y-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="prayer-name" className="block text-sm font-inter font-medium text-charcoal mb-1.5">
            Your Name
          </label>
          <input
            id="prayer-name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="First & last name"
            className="w-full px-4 py-3 rounded-[14px] border border-cream-100 bg-cream font-inter text-sm text-charcoal placeholder:text-muted-gray focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="prayer-email" className="block text-sm font-inter font-medium text-charcoal mb-1.5">
            Email (Optional)
          </label>
          <input
            id="prayer-email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="For follow-up prayer"
            className="w-full px-4 py-3 rounded-[14px] border border-cream-100 bg-cream font-inter text-sm text-charcoal placeholder:text-muted-gray focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label htmlFor="prayer-request" className="block text-sm font-inter font-medium text-charcoal mb-1.5">
          Prayer Request <span className="text-golden-500">*</span>
        </label>
        <textarea
          id="prayer-request"
          name="request"
          value={form.request}
          onChange={handleChange}
          required
          rows={5}
          placeholder="Share what is on your heart. We are here to pray with you..."
          className="w-full px-4 py-3 rounded-2xl border border-cream-100 bg-cream font-inter text-sm text-charcoal placeholder:text-muted-gray focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent resize-none"
        />
      </div>

      <div className="flex items-center gap-3">
        <input
          id="is-private"
          name="is_private"
          type="checkbox"
          checked={form.is_private}
          onChange={handleChange}
          className="w-4 h-4 text-forest-500 border-cream-100 rounded focus:ring-forest-400 accent-forest-500"
        />
        <label htmlFor="is-private" className="font-inter text-sm text-charcoal cursor-pointer">
          Keep my request private (not shown publicly)
        </label>
      </div>

      {error && <p className="text-red-500 text-sm font-inter">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? 'Submitting...' : 'Submit Prayer Request'}
      </button>

      <RecaptchaNotice />
    </form>
  );
}
