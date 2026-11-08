'use client';

import { useState } from 'react';
import { CircleCheck as CheckCircle } from 'lucide-react';
import { submitProtectedForm } from '@/lib/form-submission';
import RecaptchaNotice from '@/components/RecaptchaNotice';

const subjects = [
  'General Inquiry',
  'Schedule a Tour',
  'Enrollment Question',
  'Program Information',
  'Prayer Request',
  'Schedule a Meeting',
  'Parent Concern',
  'Other',
];

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await submitProtectedForm('contact', form);

    setLoading(false);

    if (result.ok) {
      setSuccess(true);
    } else {
      setError(result.message);
    }
  };

  const inputClass =
    'w-full px-4 py-3 rounded-[14px] border border-cream-100 bg-cream font-inter text-sm text-charcoal placeholder:text-muted-gray focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent';

  if (success) {
    return (
      <div className="bg-white rounded-2xl border border-cream-100 p-10 text-center shadow-soft">
        <div className="w-16 h-16 bg-sage-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-8 h-8 text-sage-500" />
        </div>
        <h3 className="font-poppins font-700 text-forest-500 text-xl mb-2">Message Sent!</h3>
        <p className="text-muted-gray font-inter text-base leading-relaxed max-w-md mx-auto">
          Thank you for reaching out to Love Edify. We&apos;ll get back to you within 1–2 business days.
          We look forward to connecting with you!
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
          <label className="block text-sm font-inter font-medium text-charcoal mb-1.5">
            Your Name <span className="text-golden-500">*</span>
          </label>
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="First & last name"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-inter font-medium text-charcoal mb-1.5">
            Email Address <span className="text-golden-500">*</span>
          </label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="your@email.com"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-inter font-medium text-charcoal mb-1.5">
            Phone Number
          </label>
          <input
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="(555) 000-0000"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-inter font-medium text-charcoal mb-1.5">
            Subject <span className="text-golden-500">*</span>
          </label>
          <select
            name="subject"
            value={form.subject}
            onChange={handleChange}
            required
            className={inputClass}
          >
            <option value="">Select a subject</option>
            {subjects.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-inter font-medium text-charcoal mb-1.5">
          Message <span className="text-golden-500">*</span>
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={6}
          placeholder="How can we help you? Share your question, request, or message here..."
          className={`${inputClass} rounded-2xl resize-none`}
        />
      </div>

      {error && <p className="text-red-500 text-sm font-inter">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full text-base disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? 'Sending...' : 'Send Message'}
      </button>

      <RecaptchaNotice />
    </form>
  );
}
