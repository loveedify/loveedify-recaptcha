'use client';

import { useState } from 'react';
import { Mail, CircleCheck as CheckCircle } from 'lucide-react';
import { submitProtectedForm } from '@/lib/form-submission';
import RecaptchaNotice from '@/components/RecaptchaNotice';

export default function InspirationalNewsletter() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await submitProtectedForm('newsletter', { email });

    setLoading(false);

    if (result.ok) {
      setSuccess(true);
      setEmail('');
    } else if (result.code === 'duplicate') {
      setError('This email is already subscribed!');
    } else {
      setError(result.message);
    }
  };

  return (
    <section className="py-16 bg-cream-100 border-t border-cream-100">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="w-12 h-12 bg-golden-50 rounded-xl flex items-center justify-center mx-auto mb-4">
          <Mail className="w-5 h-5 text-golden-600" />
        </div>
        <h2 className="font-poppins font-700 text-2xl text-forest-500 mb-3">
          Get Weekly Inspiration
        </h2>
        <p className="text-muted-gray font-inter text-sm leading-relaxed mb-6">
          Subscribe to receive weekly devotionals and encouraging messages delivered to your inbox.
        </p>

        {success ? (
          <div className="flex items-center justify-center gap-3 bg-sage-100 text-sage-500 rounded-2xl px-6 py-4">
            <CheckCircle className="w-5 h-5" />
            <span className="font-inter text-sm font-medium text-forest-500">
              You&apos;re subscribed! Thank you for joining our community.
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-3 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-3 rounded-[14px] border border-cream-100 bg-white font-inter text-sm text-charcoal placeholder:text-muted-gray focus:outline-none focus:ring-2 focus:ring-forest-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="btn-primary whitespace-nowrap disabled:opacity-60"
            >
              {loading ? '...' : 'Subscribe'}
            </button>
          </form>
        )}

        {error && <p className="text-red-500 text-sm font-inter mt-3">{error}</p>}

        {!success && (
          <div className="mt-4">
            <RecaptchaNotice />
          </div>
        )}
      </div>
    </section>
  );
}
