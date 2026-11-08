import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Baby, Star, BookOpen, GraduationCap, Sun, Moon, CircleCheck as CheckCircle, Clock, Users, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Programs',
  description:
    'Explore Love Edify Child Care Services programs — from infant care to school-age programs. Faith-based, developmentally appropriate education for every age.',
};


const programs = [
  {
    id: 'infant',
    icon: Baby,
    title: 'Infant Care',
    age: '0 – 12 months',
    hours: 'Full-day & Part-day',
    ratio: '1:4 caregiver-to-child',
    description:
      'Our infant program provides tender, attentive care in a nurturing and secure environment where babies develop trust, sensory awareness, and healthy routines through responsive caregiving.',
    features: [
      'Individual daily schedules tailored to each infant',
      'Daily feeding, nap, and activity updates for parents',
      'Sensory play and tummy time development',
      'Music, language, and interaction experiences',
      'Secure attachment practices with loving caregivers',
      'Clean, safe, and developmentally appropriate nursery',
    ],
    image:
      'https://images.unsplash.com/photo-1544126592-807ade215a0b?w=600&q=80&fit=crop',
    color: 'bg-golden-500',
  },
  {
    id: 'young-toddlers',
    icon: Star,
    title: 'Young Toddlers',
    age: '12 – 24 months',
    hours: 'Full-day & Part-day',
    ratio: '1:5 caregiver-to-child',
    description:
      'Our young toddler program encourages exploration, movement, and early communication through hands-on activities, nurturing routines, and loving guidance.',
    features: [
      'Language-rich songs, books, and conversations',
      'Sensory exploration and creative play',
      'Gross motor development and outdoor activities',
      'Early social interaction and sharing skills',
      'Routine building and independence development',
      'Bible stories and simple faith-centered lessons',
    ],
    image:
      'https://images.unsplash.com/photo-1609834008399-c00e10728e7b?q=80&w=1170&auto=format&fit=crop',
    color: 'bg-sage-400',
  },
  {
    id: 'older-toddlers',
    icon: Heart,
    title: 'Older Toddlers',
    age: '2 – 3 years',
    hours: 'Full-day & Part-day',
    ratio: '1:7 caregiver-to-child',
    description:
      'Older toddlers thrive in a playful, structured environment focused on independence, creativity, communication, and positive social development.',
    features: [
      'Hands-on learning through play and discovery',
      'Creative arts, music, and movement activities',
      'Potty training support and encouragement',
      'Structured group learning and interaction',
      'Outdoor exploration and active play',
      'Faith-based character development and Bible lessons',
    ],
    image:
      'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1170&auto=format&fit=crop',
    color: 'bg-forest-500',
  },
  {
    id: 'preschool',
    icon: BookOpen,
    title: 'Preschool',
    age: '3 – 4 years',
    hours: 'Full-day & Part-day',
    ratio: '1:11 teacher-to-child',
    description:
      'Our preschool program combines play-based learning with intentional academic preparation to help children grow socially, emotionally, spiritually, and intellectually.',
    features: [
      'Early literacy, phonics, and storytelling',
      'Math, science, and discovery learning activities',
      'Creative arts, music, and dramatic play',
      'Social-emotional learning and teamwork skills',
      'Bible memory verses and prayer practices',
      'Themed learning units exploring community and nature',
    ],
    image:
      'https://images.unsplash.com/photo-1553641118-066cde5e7047?q=80&w=1170&auto=format&fit=crop',
    color: 'bg-golden-500',
  },
  {
    id: 'prek',
    icon: GraduationCap,
    title: 'Pre-Kindergarten',
    age: '4 – 5 years',
    hours: 'Full-day',
    ratio: '1:13 teacher-to-child',
    description:
      'Our Pre-K program prepares children for kindergarten success with advanced readiness skills, leadership development, and faith-centered learning experiences.',
    features: [
      'Reading readiness and comprehension activities',
      'Math concepts, counting, and pattern recognition',
      'STEM exploration and critical thinking projects',
      'Writing readiness and fine motor practice',
      'Character development and biblical values',
      'Kindergarten readiness assessments and progress reports',
    ],
    image:
      'https://images.unsplash.com/photo-1559918095-0e91f93a8dd8?q=80&w=1170&auto=format&fit=crop',
    color: 'bg-sage-400',
  },
  {
    id: 'school-age',
    icon: Sun,
    title: 'School-Age Care',
    age: '5 – 6 years',
    hours: 'Before & After School',
    ratio: '1:15 teacher-to-child',
    description:
      'Our school-age care program offers a safe and enriching environment where children receive homework support, mentorship, and engaging activities before and after school.',
    features: [
      'Homework help and academic encouragement',
      'Enrichment activities in art, STEM, and recreation',
      'Character-building and mentorship opportunities',
      'Social interaction and outdoor play',
      'Healthy snacks and wellness education',
      'Morning devotionals and positive routines',
    ],
    image:
      'https://images.unsplash.com/photo-1473280025148-643f9b0cbac2?q=80&w=1176&auto=format&fit=crop',
    color: 'bg-forest-500',
  },
  {
    id: 'extended-school-age',
    icon: Moon,
    title: 'Extended School-Age Program',
    age: '6 – 13 years',
    hours: 'Before & After School + Summer',
    ratio: '1:20 counselor-to-child',
    description:
      'Designed for older children, our extended school-age program provides leadership opportunities, enrichment experiences, mentorship, and exciting seasonal activities.',
    features: [
      'Leadership and team-building activities',
      'Homework assistance and independent study time',
      'Sports, recreation, and creative enrichment',
      'Field trips and seasonal themed programs',
      'Faith devotionals and character challenges',
      'Community service and collaborative projects',
    ],
    image:
      'https://images.unsplash.com/photo-1606978806539-28ad82207267?q=80&w=1170&auto=format&fit=crop',
    color: 'bg-golden-500',
  },
];


export default function ProgramsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-forest-500 py-20 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-hero-pattern" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block text-golden-400 font-inter font-medium text-sm uppercase tracking-widest mb-3">
              Our Programs
            </span>
            <h1 className="font-poppins font-700 text-4xl md:text-5xl text-white mb-5">
              Nurturing Every Stage of Childhood
            </h1>
            <p className="text-white/80 font-inter text-lg max-w-2xl mx-auto leading-relaxed">
              Age-appropriate, faith-integrated programs designed to support your child&apos;s
              development from infancy through school age.
            </p>
          </div>
        </section>

        {/* Programs */}
        <section className="py-16 bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            {programs.map((program, idx) => (
              <article
                key={program.id}
                id={program.id}
                className="grid lg:grid-cols-2 gap-10 items-center"
              >
                <div className={`${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="relative rounded-3xl overflow-hidden shadow-card">
                    <img
                      src={program.image}
                      alt={`${program.title} at Love Edify Child Care`}
                      className="w-full h-[380px] object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <div className={`${program.color} text-white font-inter text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5`}>
                        <program.icon className="w-3.5 h-3.5" />
                        {program.age}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className={`w-12 h-12 ${program.color} rounded-xl flex items-center justify-center mb-4`}>
                    <program.icon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="font-poppins font-700 text-2xl md:text-3xl text-forest-500 mb-2">
                    {program.title}
                  </h2>
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="flex items-center gap-1.5 text-muted-gray text-xs font-inter">
                      <Clock className="w-3.5 h-3.5 text-golden-500" />
                      {program.hours}
                    </span>
                    <span className="flex items-center gap-1.5 text-muted-gray text-xs font-inter">
                      <Users className="w-3.5 h-3.5 text-golden-500" />
                      {program.ratio}
                    </span>
                  </div>
                  <p className="text-muted-gray font-inter text-base leading-relaxed mb-6">
                    {program.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {program.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-sage-400 flex-shrink-0 mt-0.5" />
                        <span className="text-charcoal font-inter text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/enrollment" className="btn-primary inline-flex items-center gap-2">
                    Enroll in {program.title}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-forest-500 text-center">
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="font-poppins font-700 text-2xl md:text-3xl text-white mb-4">
              Questions About Our Programs?
            </h2>
            <p className="text-white/80 font-inter text-base mb-8">
              We&apos;re happy to walk you through which program is the best fit for your child.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/enrollment" className="btn-primary">Start Enrollment</Link>
              <Link href="/contact" className="flex items-center justify-center gap-2 bg-white/15 border-2 border-white/40 text-white font-inter font-medium px-6 py-3 rounded-[14px] hover:bg-white/25 transition-all duration-200">
                Ask a Question
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
