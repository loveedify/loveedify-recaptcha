import Link from 'next/link';

const scriptures = [
  {
    verse: 'Train up a child in the way he should go; even when he is old he will not depart from it.',
    reference: 'Proverbs 22:6',
  },
  {
    verse: 'Children are a heritage from the Lord, offspring a reward from him.',
    reference: 'Psalm 127:3',
  },
  {
    verse: 'And Jesus grew in wisdom and stature, and in favor with God and man.',
    reference: 'Luke 2:52',
  },
];

export default function HomeScripture() {
  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      aria-labelledby="scripture-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=1920&q=80&fit=crop"
          alt="Children praying together"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-forest-500/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-golden-400 font-inter font-medium text-sm uppercase tracking-widest mb-3">
            Our Faith Foundation
          </span>
          <h2
            id="scripture-heading"
            className="font-poppins font-700 text-3xl md:text-4xl text-white mb-4"
          >
            Guided by God&apos;s Word
          </h2>
          <p className="text-white/75 font-inter text-lg max-w-2xl mx-auto leading-relaxed">
            Scripture is the cornerstone of everything we do at Love Edify. We believe every child
            deserves to know they are uniquely created, deeply loved, and wonderfully made.
          </p>
        </div>

        {/* Scripture Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {scriptures.map((scripture) => (
            <div
              key={scripture.reference}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 text-center card-hover"
            >
              <div className="w-12 h-0.5 bg-golden-400 mx-auto mb-6" />
              <blockquote>
                <p className="font-playfair italic text-white text-lg leading-relaxed mb-4">
                  &ldquo;{scripture.verse}&rdquo;
                </p>
                <cite className="text-golden-400 font-inter text-sm not-italic font-medium">
                  {scripture.reference}
                </cite>
              </blockquote>
              <div className="w-12 h-0.5 bg-golden-400 mx-auto mt-6" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/inspirational"
            className="inline-flex items-center gap-2 bg-golden-500 text-white font-inter font-medium px-7 py-3.5 rounded-[14px] transition-all duration-200 hover:bg-golden-600 hover:shadow-golden hover:-translate-y-0.5"
          >
            Visit Our Inspirational Corner
          </Link>
          <p className="text-white/60 font-inter text-sm mt-4">
            Daily devotionals, scriptures, and uplifting messages for families
          </p>
        </div>
      </div>
    </section>
  );
}
