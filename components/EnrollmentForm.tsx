'use client';

import { useState } from 'react';
import { CircleCheck as CheckCircle } from 'lucide-react';
import { submitProtectedForm } from '@/lib/form-submission';
import RecaptchaNotice from '@/components/RecaptchaNotice';

const programs = [
  'Infant Care (6 weeks – 12 months)',
  'Toddler Program (1–2 years)',
  'Preschool (3–4 years)',
  'Pre-Kindergarten (4–5 years)',
  'School-Age Care (5–12 years)',
  'Summer Program (5–12 years)',
];

export default function EnrollmentForm() {
  const [form, setForm] = useState({
    parent_name: '',
    email: '',
    phone: '',
    child_name: '',
    child_dob: '',
    program_interest: '',
    start_date: '',
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

    const result = await submitProtectedForm('enrollment', form);

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
        <h3 className="font-poppins font-700 text-forest-500 text-2xl mb-3">
          Inquiry Received!
        </h3>
        <p className="text-muted-gray font-inter text-base leading-relaxed max-w-md mx-auto mb-5">
          Thank you for your interest in Love Edify! A member of our team will contact you
          within 1–2 business days to discuss next steps and schedule your tour.
        </p>
        <p className="font-playfair italic text-forest-400 text-sm">
          &ldquo;Welcome to the Love Edify family!&rdquo;
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-cream-100 p-6 shadow-soft space-y-5"
    >
      {/* Parent Info */}
      <div>
        <h3 className="font-poppins font-600 text-forest-500 text-base mb-4 pb-2 border-b border-cream-100">
          Parent / Guardian Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-inter font-medium text-charcoal mb-1.5">
              Full Name <span className="text-golden-500">*</span>
            </label>
            <input
              name="parent_name"
              type="text"
              value={form.parent_name}
              onChange={handleChange}
              required
              placeholder="Parent/guardian name"
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
          <div className="sm:col-span-2">
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
        </div>
      </div>

      {/* Child Info */}
      <div>
        <h3 className="font-poppins font-600 text-forest-500 text-base mb-4 pb-2 border-b border-cream-100">
          Child Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-inter font-medium text-charcoal mb-1.5">
              Child&apos;s Name <span className="text-golden-500">*</span>
            </label>
            <input
              name="child_name"
              type="text"
              value={form.child_name}
              onChange={handleChange}
              required
              placeholder="Child's first & last name"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-inter font-medium text-charcoal mb-1.5">
              Date of Birth
            </label>
            <input
              name="child_dob"
              type="date"
              value={form.child_dob}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-inter font-medium text-charcoal mb-1.5">
              Program of Interest <span className="text-golden-500">*</span>
            </label>
            <select
              name="program_interest"
              value={form.program_interest}
              onChange={handleChange}
              required
              className={inputClass}
            >
              <option value="">Select a program</option>
              {programs.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-inter font-medium text-charcoal mb-1.5">
              Desired Start Date
            </label>
            <input
              name="start_date"
              type="date"
              value={form.start_date}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Additional Notes */}
      <div>
        <label className="block text-sm font-inter font-medium text-charcoal mb-1.5">
          Additional Notes or Questions
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={4}
          placeholder="Tell us anything helpful about your child or any questions you have..."
          className={`${inputClass} rounded-2xl resize-none`}
        />
      </div>

      {error && <p className="text-red-500 text-sm font-inter">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full text-base disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? 'Submitting...' : 'Submit Enrollment Inquiry'}
      </button>

      <p className="text-muted-gray text-xs font-inter text-center">
        By submitting this form, you agree to be contacted by Love Edify Child Care Services
        regarding your enrollment inquiry.
      </p>

      <RecaptchaNotice />
    </form>
  );
}
