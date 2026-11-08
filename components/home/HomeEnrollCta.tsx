import Link from 'next/link';
import { ArrowRight, Phone, Calendar } from 'lucide-react';

export default function HomeEnrollCta() {
  return (
    <section className="py-20 md:py-28 bg-forest-500 relative overflow-hidden" aria-labelledby="enroll-cta-heading">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-hero-pattern" />
      <div className="absolute -right-20 -top-20 w-96 h-96 bg-golden-500/10 rounded-full blur-3xl" />
      <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-sage/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block text-golden-400 font-inter font-medium text-sm uppercase tracking-widest mb-3">
          Ready to Get Started?
        </span>
        <h2
          id="enroll-cta-heading"
          className="font-poppins font-700 text-3xl md:text-5xl text-white mb-5 leading-tight"
        >
          Give Your Child the Gift of a{' '}
          <span className="text-golden-400">Faith-Filled</span> Start
        </h2>
        <p className="text-white/80 font-inter text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
          Enrollment spots are limited. Take the first step toward providing your child with a
          safe, loving, and biblically grounded early childhood experience.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/enrollment"
            className="btn-primary flex items-center justify-center gap-2 text-base px-8 py-4"
          >
            Begin Enrollment
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact#schedule"
            className="flex items-center justify-center gap-2 bg-white/15 border-2 border-white/40 text-white font-inter font-medium px-8 py-4 rounded-[14px] transition-all duration-200 hover:bg-white/25 hover:-translate-y-0.5"
          >
            <Calendar className="w-4 h-4" />
            Schedule a Tour
          </Link>
          <a
            href="tel:+15551234567"
            className="flex items-center justify-center gap-2 text-white/80 font-inter font-medium hover:text-golden-400 transition-colors duration-200 px-4"
          >
            <Phone className="w-4 h-4" />
            Call Us Today
          </a>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 flex flex-wrap gap-6 justify-center">
          {[
            'Licensed & Accredited',
            'Background Checked Staff',
            'Faith-Based Environment',
            'Flexible Scheduling',
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 text-white/70 text-sm font-inter">
              <div className="w-1.5 h-1.5 bg-golden-400 rounded-full" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
