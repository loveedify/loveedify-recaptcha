import Link from 'next/link';
import { ArrowRight, Phone, Star } from 'lucide-react';

export default function HomeHero() {
  return (
    <section
      className="relative min-h-screen h-[140vh] sm:h-[50vh] flex  overflow-hidden" 
      aria-label="Hero section" 
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://static.wixstatic.com/media/c73eb8_7567e252267948dda8643c084b085efa~mv2.jpg"
          alt="Children learning and playing in a bright classroom environment"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-500/90 via-forest-500/75 to-forest-500/40" />
        <div className="absolute inset-0 bg-hero-pattern" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
        <div className="max-w-3xl"> 
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-golden-500/20 border border-golden-400/40 rounded-full px-4 py-1.5 mb-6">
            <Star className="w-3.5 h-3.5 text-golden-400 fill-golden-400" />
            <span className="text-golden-300 text-xs font-inter font-medium tracking-wide">
              Faith-Centered Child Care Excellence
            </span>
          </div>

          <h1 className="font-poppins font-700 text-4xl md:text-5xl lg:text-6xl text-white leading-[1.15] mb-6">
            Where Children Grow in{' '}
            <span className="text-golden-400">Love</span>,{' '}
            <span className="text-golden-400">Learning</span>{' '}
            &amp; <span className="text-golden-400">Faith</span>
          </h1>

          <p className="text-white text-lg md:text-xl font-inter leading-relaxed mb-8 max-w-2xl">
            Building up children in academics and in the love of Christ. Providing a safe, nurturing, and faith-centered environment where children are encouraged to learn, grow, and thrive through love and biblical values.
          </p>

          {/* Scripture Quote */}
          <blockquote className="mb-10 pl-4 border-l-2 border-golden-400">
            <p className="font-playfair italic text-white/80 text-base md:text-lg"> 
              &ldquo;...That Christ may dwell in your hearts through faith; that you being rooted and grounded in love...&rdquo;
            </p>
            <cite className="text-golden-400 text-sm font-inter not-italic mt-1 block">
              — Ephesians 3:17
            </cite>
          </blockquote>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/enrollment" className="btn-primary flex items-center justify-center gap-2 text-base">
              Enroll Now
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/programs" className="flex items-center justify-center gap-2 bg-white/15 border-2 border-white/40 text-white font-inter font-medium px-6 py-3 rounded-[14px] transition-all duration-200 hover:bg-white/25 hover:-translate-y-0.5">
              View Our Programs
            </Link>
            <a
              href="tel:+18645892228"
              className="flex items-center justify-center gap-2 text-white font-inter font-medium hover:text-golden-400 transition-colors duration-200"
            >
              <Phone className="w-4 h-4" />
              (864) 589-2228
            </a>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-forest-600/90 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 sm:divide-x divide-white/10">
            {[ 
            
             
              { value: '100%', label: 'Licensed & Accredited' },
       { value: '5★', label: 'Parent Satisfaction' },
       { value: '24/7', label: 'Commitment to Excellence' },
       { value: '100%', label: 'Faith-led' },
             
            ].map((stat) => (
              <div key={stat.label} className="text-center py-4 px-4">
                <div className="font-poppins font-700 text-golden-400 text-2xl md:text-3xl">
                  {stat.value}
                </div>
                <div className="text-white/70 text-xs md:text-sm font-inter mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))} 
          </div>
        </div>
      </div>
    </section>
  );
}
