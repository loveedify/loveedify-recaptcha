'use client';

import { useState } from 'react';
import { Mail, CircleCheck as CheckCircle } from 'lucide-react';
import { submitProtectedForm } from '@/lib/form-submission';
import RecaptchaNotice from '@/components/RecaptchaNotice';

export default function HomeNewsletter() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await submitProtectedForm('newsletter', { email, name });

    setLoading(false);

    if (result.ok) {
      setSuccess(true);
      setEmail('');
      setName('');
    } else if (result.code === 'duplicate') {
      setError('This email is already subscribed!');
    } else {
      setError(result.message);
    }
  };

  return (
    <section className="py-16 bg-white border-t border-cream-100" aria-labelledby="newsletter-heading">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-12 h-12 bg-golden-50 rounded-xl flex items-center justify-center mx-auto mb-4">
          <Mail className="w-5 h-5 text-golden-600" />
        </div>
        <h2
          id="newsletter-heading"
          className="font-poppins font-700 text-2xl md:text-3xl text-forest-500 mb-3"
        >
          Stay Connected with Our Community
        </h2>
        <p className="text-muted-gray font-inter text-base leading-relaxed mb-8">
          Subscribe to receive our monthly newsletter with devotionals, program updates,
          upcoming events, and encouragement for your family.
        </p>

        {success ? (
          <div className="flex items-center justify-center gap-3 bg-sage-100 text-sage-500 rounded-2xl px-6 py-5">
            <CheckCircle className="w-5 h-5" />
            <div className="text-left">
              <p className="font-poppins font-600 text-forest-500 text-sm">You&apos;re subscribed!</p>
              <p className="text-muted-gray font-inter text-xs mt-0.5">
                Thank you for joining our community. You&apos;ll hear from us soon.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 px-4 py-3 rounded-[14px] border border-cream-100 bg-cream font-inter text-sm text-charcoal placeholder:text-muted-gray focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent"
            />
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-3 rounded-[14px] border border-cream-100 bg-cream font-inter text-sm text-charcoal placeholder:text-muted-gray focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={loading}
              className="btn-primary whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        )}

        {error && (
          <p className="text-red-500 text-sm font-inter mt-3">{error}</p>
        )}

        <p className="text-muted-gray text-xs font-inter mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>

        {!success && (
          <div className="mt-3">
            <RecaptchaNotice />
          </div>
        )}
      </div>
    </section>
  );
}
