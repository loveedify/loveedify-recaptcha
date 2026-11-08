import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { supabase, type InspirationalPost } from '@/lib/supabase';
import { BookOpen, Heart, Star } from 'lucide-react';
import InspirationalNewsletter from '@/components/InspirationalNewsletter';

export const metadata: Metadata = {
  title: 'Inspirational Corner',
  description:
    'Daily devotionals, scriptures, and uplifting messages from Love Edify Child Care Services — faith-based encouragement for children and families.',
};

export const revalidate = 60;

const categoryConfig: Record<string, { label: string; color: string; icon: typeof BookOpen }> = {
  scripture: { label: 'Scripture', color: 'bg-golden-100 text-golden-700', icon: BookOpen },
  devotional: { label: 'Devotional', color: 'bg-forest-50 text-forest-600', icon: Heart },
  message: { label: 'Message', color: 'bg-sage-100 text-sage-600', icon: Star },
  newsletter: { label: 'Newsletter', color: 'bg-cream-100 text-charcoal', icon: Star },
};

async function getPosts(): Promise<InspirationalPost[]> {
  const { data } = await supabase
    .from('inspirational_posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });
  return data || [];
}

export default async function InspirationalPage() {
  const posts = await getPosts();
  const featuredPosts = posts.filter((p) => p.featured);
  const regularPosts = posts.filter((p) => !p.featured);

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative bg-forest-500 py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=1920&q=80&fit=crop"
              alt="Children in prayer"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="absolute inset-0 bg-forest-500/85" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block text-golden-400 font-inter font-medium text-sm uppercase tracking-widest mb-3">
              Faith &amp; Encouragement
            </span>
            <h1 className="font-poppins font-700 text-4xl md:text-5xl text-white mb-5">
              Inspirational Corner
            </h1>
            <p className="text-white/80 font-inter text-lg max-w-2xl mx-auto leading-relaxed">
              Daily devotionals, scriptures, and uplifting messages to encourage your family&apos;s
              faith journey and bring God&apos;s word into your home.
            </p>
          </div>
        </section>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="py-16 bg-cream">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <span className="inline-block text-golden-600 font-inter font-medium text-sm uppercase tracking-widest mb-2">
                  Featured
                </span>
                <h2 className="font-poppins font-700 text-2xl md:text-3xl text-forest-500">
                  This Week&apos;s Highlights
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredPosts.map((post) => {
                  const cfg = categoryConfig[post.category] || categoryConfig.message;
                  return (
                    <article
                      key={post.id}
                      className="bg-white rounded-3xl p-7 border border-cream-100 shadow-card card-hover"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className={`text-xs font-inter font-medium px-2.5 py-1 rounded-full ${cfg.color}`}>
                          {cfg.label}
                        </span>
                        <div className="w-8 h-0.5 bg-golden-300" />
                      </div>
                      <h3 className="font-poppins font-600 text-forest-500 text-lg mb-3">
                        {post.title}
                      </h3>
                      <p className="text-muted-gray font-inter text-sm leading-relaxed mb-5">
                        {post.content}
                      </p>
                      {post.scripture_text && (
                        <div className="bg-cream rounded-xl p-4 border-l-4 border-golden-400">
                          <p className="font-playfair italic text-forest-500 text-sm leading-relaxed mb-1">
                            &ldquo;{post.scripture_text}&rdquo;
                          </p>
                          {post.scripture_reference && (
                            <p className="text-golden-600 font-inter text-xs font-medium">
                              — {post.scripture_reference}
                            </p>
                          )}
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* All Posts */}
        {regularPosts.length > 0 && (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-poppins font-700 text-2xl md:text-3xl text-forest-500 mb-8">
                More Encouragement
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {regularPosts.map((post) => {
                  const cfg = categoryConfig[post.category] || categoryConfig.message;
                  return (
                    <article
                      key={post.id}
                      className="flex gap-5 bg-cream rounded-2xl p-5 border border-cream-100 card-hover"
                    >
                      <div className="w-10 h-10 bg-forest-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <cfg.icon className="w-5 h-5 text-forest-500" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className={`text-xs font-inter font-medium px-2 py-0.5 rounded-full ${cfg.color}`}>
                            {cfg.label}
                          </span>
                        </div>
                        <h3 className="font-poppins font-600 text-forest-500 text-base mb-1.5">
                          {post.title}
                        </h3>
                        <p className="text-muted-gray font-inter text-sm leading-relaxed mb-2 line-clamp-3">
                          {post.content}
                        </p>
                        {post.scripture_reference && (
                          <p className="text-golden-600 font-inter text-xs font-medium">
                            {post.scripture_reference}
                          </p>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {posts.length === 0 && (
          <section className="py-20 bg-cream text-center">
            <div className="max-w-md mx-auto px-4">
              <div className="w-16 h-16 bg-golden-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-golden-500" />
              </div>
              <h2 className="font-poppins font-700 text-2xl text-forest-500 mb-3">
                New Content Coming Soon
              </h2>
              <p className="text-muted-gray font-inter text-base leading-relaxed">
                Our team is preparing uplifting devotionals and scriptures for you.
                Subscribe to our newsletter to be notified!
              </p>
            </div>
          </section>
        )}

        {/* Prayer CTA */}
        <section className="py-14 bg-golden-500">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="font-poppins font-700 text-2xl md:text-3xl text-white mb-3">
              We&apos;re Praying for Your Family
            </h2>
            <p className="text-white/85 font-inter text-base leading-relaxed mb-6">
              Share your prayer needs with our team. We believe in the power of prayer and
              would be honored to lift your family before God.
            </p>
            <Link
              href="/prayer-requests"
              className="inline-flex items-center gap-2 bg-white text-golden-600 font-inter font-medium px-7 py-3.5 rounded-[14px] transition-all duration-200 hover:bg-cream hover:-translate-y-0.5 shadow-soft"
            >
              Submit a Prayer Request
            </Link>
          </div>
        </section>

        {/* Newsletter */}
        <InspirationalNewsletter />
      </main>
      <Footer />
    </>
  );
}
