import Link from 'next/link';
import { Heart, BookOpen, Shield, Users } from 'lucide-react';

const pillars = [
  {
    icon: Heart,
    title: 'Rooted in Love',
    description:
      'Every child is welcomed with warmth and compassion. We create a home away from home where love is felt in everything we do.',
    color: 'bg-golden-50 text-golden-600',
    border: 'border-golden-200',
  },
  {
    icon: BookOpen,
    title: 'Faith Foundation',
    description:
      'Biblical values are woven into our daily curriculum — scripture, prayer, and spiritual encouragement guide every interaction.',
    color: 'bg-forest-50 text-forest-500',
    border: 'border-forest-100',
  },
  {
    icon: Shield,
    title: 'Safe Environment',
    description:
      'Licensed, accredited, and committed to the highest safety standards so parents can have complete peace of mind.',
    color: 'bg-sage-100 text-sage-500',
    border: 'border-sage-200',
  },
  {
    icon: Users,
    title: 'Community Care',
    description:
      'We partner with families and the community, offering resources, prayer support, and a ministry that goes beyond child care.',
    color: 'bg-cream-100 text-forest-500',
    border: 'border-cream-100',
  },
];

export default function HomeMission() {
  return (
    <section className="py-20 md:py-28 bg-cream" aria-labelledby="mission-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left Column - Text */}
          <div>
            <span className="inline-block text-golden-600 font-inter font-medium text-sm uppercase tracking-widest mb-3">
              Our Mission & Vision
            </span>
            <h2
              id="mission-heading"
              className="font-poppins font-700 text-3xl md:text-4xl text-forest-500 leading-tight mb-5"
            >
              Building Strong Foundations for Children &amp; Families
            </h2>
            <p className="text-muted-gray font-inter text-lg leading-relaxed mb-5">
              At Love Edify Child Care Services, our mission is to provide a nurturing, faith-centered
              environment where every child is seen, loved, and equipped to flourish. We blend
              professional early childhood education with heartfelt biblical encouragement.
            </p>
            <p className="text-muted-gray font-inter text-base leading-relaxed mb-8">
              Our vision is to be a community beacon — a place where families find not just exceptional
              child care, but spiritual support, community connection, and genuine care for the whole family.
            </p>
            <Link href="/about" className="btn-secondary inline-flex items-center gap-2">
              Learn Our Story
            </Link>
          </div>

          {/* Right Column - Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className={`bg-white rounded-2xl p-5 border ${pillar.border} shadow-soft card-hover`}
              >
                <div className={`w-11 h-11 ${pillar.color} rounded-xl flex items-center justify-center mb-4`}>
                  <pillar.icon className="w-5 h-5" />
                </div>
                <h3 className="font-poppins font-600 text-forest-500 text-base mb-2">{pillar.title}</h3>
                <p className="text-muted-gray font-inter text-sm leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
