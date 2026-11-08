import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { supabase, type PrayerRequest } from '@/lib/supabase';
import PrayerRequestForm from '@/components/PrayerRequestForm';
import { Heart, HandHeart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Prayer Requests',
  description:
    'Submit a prayer request to the Love Edify family. We believe in the power of prayer and are honored to lift your needs before God.',
};

export const revalidate = 60;

async function getPublicPrayers(): Promise<PrayerRequest[]> {
  const { data } = await supabase
    .from('prayer_requests')
    .select('*')
    .eq('is_private', false)
    .order('created_at', { ascending: false })
    .limit(20);
  return data || [];
}

export default async function PrayerRequestsPage() {
  const prayers = await getPublicPrayers();

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative bg-forest-500 py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-hero-pattern" />
          <div className="absolute right-0 top-0 w-1/2 h-full opacity-10">
            <img
              src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&q=80&fit=crop"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 bg-golden-500 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-golden">
              <Heart className="w-8 h-8 text-white fill-white" />
            </div>
            <span className="inline-block text-golden-400 font-inter font-medium text-sm uppercase tracking-widest mb-3">
              Community Prayer
            </span>
            <h1 className="font-poppins font-700 text-4xl md:text-5xl text-white mb-5">
              Prayer Requests
            </h1>
            <p className="text-white/80 font-inter text-lg max-w-2xl mx-auto leading-relaxed">
              We believe in the power of prayer. Share your needs with our Love Edify family and
              know that you are being lifted up in prayer with love and faith.
            </p>
          </div>
        </section>

        {/* Scripture Banner */}
        <div className="bg-golden-500 py-5">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="font-playfair italic text-white text-base md:text-lg">
              &ldquo;Do not be anxious about anything, but in every situation, by prayer and petition,
              with thanksgiving, present your requests to God.&rdquo;
            </p>
            <p className="text-white/85 font-inter text-sm mt-1">— Philippians 4:6</p>
          </div>
        </div>

        {/* Main Content */}
        <section className="py-16 bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Submit Form */}
              <div>
                <h2 className="font-poppins font-700 text-2xl md:text-3xl text-forest-500 mb-3">
                  Submit Your Prayer Request
                </h2>
                <p className="text-muted-gray font-inter text-base leading-relaxed mb-6">
                  Your request will be shared with our prayer team. You may choose to keep
                  your request private if you prefer.
                </p>
                <PrayerRequestForm />
              </div>

              {/* Community Prayers */}
              <div>
                <h2 className="font-poppins font-700 text-2xl md:text-3xl text-forest-500 mb-3">
                  Community Prayer Wall
                </h2>
                <p className="text-muted-gray font-inter text-base leading-relaxed mb-6">
                  Join us in praying for these shared requests from our community.
                </p>

                {prayers.length > 0 ? (
                  <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                    {prayers.map((prayer) => (
                      <div
                        key={prayer.id}
                        className="bg-white rounded-2xl p-5 border border-cream-100 shadow-soft"
                      >
                        <div className="flex items-center gap-2.5 mb-3">
                          <div className="w-8 h-8 bg-golden-50 rounded-lg flex items-center justify-center">
                            <HandHeart className="w-4 h-4 text-golden-600" />
                          </div>
                          <div>
                            <p className="font-inter font-medium text-charcoal text-sm">
                              {prayer.name || 'Anonymous'}
                            </p>
                            <p className="text-muted-gray font-inter text-xs">
                              {new Date(prayer.created_at).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </p>
                          </div>
                          {prayer.is_answered && (
                            <span className="ml-auto bg-sage-100 text-sage-600 text-xs font-inter font-medium px-2.5 py-1 rounded-full">
                              Answered!
                            </span>
                          )}
                        </div>
                        <p className="text-charcoal font-inter text-sm leading-relaxed">
                          {prayer.request}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl p-8 border border-cream-100 text-center">
                    <div className="w-12 h-12 bg-golden-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Heart className="w-6 h-6 text-golden-500" />
                    </div>
                    <p className="text-muted-gray font-inter text-sm">
                      Be the first to share a prayer request with our community.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
