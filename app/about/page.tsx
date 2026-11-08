import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Heart, Award, Users, BookOpen, Star, CircleCheck as CheckCircle } from 'lucide-react';
import GallerySlideshow from '@/components/GallerySlideshow';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Love Edify Child Care Services — our story, mission, values, and the dedicated team serving children and families with faith and excellence.',
};

const values = [
  { icon: Heart, title: 'Unconditional Love', desc: 'Every child is received and cared for with genuine, Christ-centered love.' },
  { icon: BookOpen, title: 'Biblical Foundation', desc: 'Scripture and faith values guide our curriculum, interactions, and culture.' },
  { icon: Award, title: 'Excellence in Education', desc: 'High standards in early childhood education prepare children for lifelong success.' },
  { icon: Users, title: 'Family Partnership', desc: 'We walk alongside families as trusted partners in raising flourishing children.' },
  { icon: Star, title: 'Joyful Environment', desc: 'We create spaces filled with warmth, laughter, creativity, and hope.' },
  { icon: CheckCircle, title: 'Accountability', desc: 'Transparent, professionally run operations that families can trust completely.' },
];

const team = [
  {
    name: 'Bryson McKinney',
    role: 'Executive Director',
    bio: 'Dedicated to helping children grow academically, emotionally, and spiritually through Christ-centered care and encouragement.',
    image: 'https://static.wixstatic.com/media/c73eb8_9a3ebf682fb743ac805029c9176d95f1~mv2.jpg',
  }, 
  // {
  //   name: 'Lead Teacher',
  //   role: 'Preschool Lead',
  //   bio: 'A certified early childhood educator with a heart for nurturing young minds through play, creativity, and biblical wisdom.',
  //   image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face',
  // },
  // {
  //   name: 'Infant Coordinator',
  //   role: 'Infant & Toddler Lead',
  //   bio: 'Specializing in the tender care of our youngest learners, bringing warmth, patience, and professional expertise.',
  //   image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&h=400&fit=crop&crop=face',
  // },
  // {
  //   name: 'Family Liaison',
  //   role: 'Parent & Community Relations',
  //   bio: 'Building bridges between families and our center, ensuring every parent feels connected, supported, and valued.',
  //   image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop&crop=face',
  // },
]; 

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Page Hero */}
        <section className="relative bg-forest-500 py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-hero-pattern" />
          <div className="absolute right-0 top-0 w-1/2 h-full opacity-20">
            <img
              src="https://static.wixstatic.com/media/c73eb8_77d24bf886b54a358661d682fb600642~mv2.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <span className="inline-block text-golden-400 font-inter font-medium text-sm uppercase tracking-widest mb-3">
                Our Story
              </span>
              <h1 className="font-poppins font-700 text-4xl md:text-5xl text-white mb-5 leading-tight">
                About Love Edify Child Care Services
              </h1>
              <p className="text-white/80 font-inter text-lg leading-relaxed">
                Born from a calling to serve children and families with excellence and faith,
                Love Edify has grown into a trusted pillar of our community — where every child
                is known, loved, and encouraged to flourish.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-14 items-center">
              <div>
                <img
                  src="https://static.wixstatic.com/media/c73eb8_14052ee47abf401b9a072b1f2e3569f9~mv2.jpg"
                  alt="Love Edify classroom environment"
                  className="w-full rounded-3xl shadow-card object-cover h-[450px]"
                />
              </div>
              <div>
                <span className="inline-block text-golden-600 font-inter font-medium text-sm uppercase tracking-widest mb-3">
                  How It Began
                </span>
                <h2 className="font-poppins font-700 text-3xl md:text-4xl text-forest-500 mb-5 leading-tight">
                  A Ministry Called Into Being
                </h2>
                <p className="text-muted-gray font-inter text-base leading-relaxed mb-4">
                  Love Edify Child Care Services began with a vision — a vision that every child
                  deserves more than just supervision. Children deserve an environment where they
                  are seen, celebrated, guided in faith, and equipped for an abundant life.
                </p>
                <p className="text-muted-gray font-inter text-base leading-relaxed mb-4">
                  Founded on the principles of biblical love and professional excellence, Love Edify
                  opened its doors to serve the families in our community who were looking for a
                  child care home that shared their faith-based values.
                </p>
                <p className="text-muted-gray font-inter text-base leading-relaxed mb-8">
                  Today, we are proud to serve hundreds of families, employing qualified, passionate
                  educators who believe that every interaction with a child is an opportunity to plant
                  seeds of love, wisdom, and faith.
                </p>
                <blockquote className="pl-4 border-l-4 border-golden-500 mb-6">
                  <p className="font-playfair italic text-forest-500 text-lg">
                    &ldquo;Train up a child in the way he should go; even when he is old he will not depart from it.&rdquo;
                  </p>
                  <cite className="text-muted-gray text-sm font-inter not-italic">— Proverbs 22:6</cite>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Slideshow */}
        <GallerySlideshow />

        {/* Mission & Vision */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-forest-500 rounded-3xl p-8 text-white">
                <div className="w-12 h-12 bg-golden-500 rounded-xl flex items-center justify-center mb-5">
                  <Heart className="w-6 h-6 text-white fill-white" />
                </div>
                <h2 className="font-poppins font-700 text-2xl mb-4">Our Mission</h2>
                <p className="font-inter text-white/85 leading-relaxed">
                  To provide exceptional, faith-centered child care that nurtures the whole child —
                  mind, body, and spirit — while partnering with families to raise children who are
                  confident, kind, and deeply rooted in God&apos;s love.
                </p>
              </div>
              <div className="bg-golden-50 border border-golden-200 rounded-3xl p-8">
                <div className="w-12 h-12 bg-golden-500 rounded-xl flex items-center justify-center mb-5">
                  <Star className="w-6 h-6 text-white fill-white" />
                </div>
                <h2 className="font-poppins font-700 text-2xl text-forest-500 mb-4">Our Vision</h2>
                <p className="font-inter text-muted-gray leading-relaxed">
                  To be a recognized center of excellence in faith-based early childhood education —
                  a community beacon that empowers families, transforms children&apos;s lives, and
                  reflects the love and grace of Jesus Christ in everything we do.
                </p>
              </div>
            </div>

            {/* Values */}
            <div className="text-center mb-12">
              <h2 className="font-poppins font-700 text-3xl md:text-4xl text-forest-500 mb-4">
                Our Core Values
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {values.map((v) => (
                <div key={v.title} className="flex items-start gap-4 bg-cream rounded-2xl p-5 border border-cream-100">
                  <div className="w-10 h-10 bg-forest-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <v.icon className="w-5 h-5 text-forest-500" />
                  </div>
                  <div>
                    <h3 className="font-poppins font-600 text-forest-500 text-sm mb-1">{v.title}</h3>
                    <p className="text-muted-gray font-inter text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-cream-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="inline-block text-golden-600 font-inter font-medium text-sm uppercase tracking-widest mb-3">
                Meet our Staff
              </span>
              <h2 className="font-poppins font-700 text-3xl md:text-4xl text-forest-500 mb-4">
                Dedicated Educators &amp; Caregivers
              </h2>
              <p className="text-muted-gray font-inter text-lg max-w-2xl mx-auto">
                Our staff are carefully selected, professionally trained, and personally called to
                serve children with excellence and faith.
              </p>
            </div>
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6"> */}
            <div className="flex flex-wrap justify-center gap-6">
              {team.map((member) => (
                <div key={member.name} className="bg-white rounded-3xl overflow-hidden shadow-soft border border-cream-100 card-hover text-center"> 
                  <div className="aspect-square w-full overflow-hidden">
                    <img
                      src={member.image}
                      alt={`${member.name} - ${member.role} at Love Edify`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-poppins font-600 text-forest-500 text-base">{member.name}</h3>
                    <p className="text-golden-600 font-inter text-xs font-medium mb-2">{member.role}</p>
                    <p className="text-muted-gray font-inter text-xs leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-forest-500 text-center">
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="font-poppins font-700 text-2xl md:text-3xl text-white mb-4">
              Ready to Join Our Family?
            </h2>
            <p className="text-white/80 font-inter text-base mb-8">
              We&apos;d love to meet you and your child. Schedule a tour or begin enrollment today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/enrollment" className="btn-primary">Enroll Now</Link>
              <Link href="/contact" className="flex items-center justify-center gap-2 bg-white/15 border-2 border-white/40 text-white font-inter font-medium px-6 py-3 rounded-[14px] transition-all duration-200 hover:bg-white/25">
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
