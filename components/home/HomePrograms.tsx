import Link from 'next/link';
import { Baby, Star, BookOpen, GraduationCap, Sun, Moon, Heart } from 'lucide-react';

// const programs = [
//   {
//     icon: Baby,
//     title: 'Infant Care',
//     age: '6 weeks – 12 months',
//     description:
//       'Tender, attentive care for your youngest ones. Our infant program provides a nurturing, safe environment with loving, responsive caregivers.',
//     color: 'bg-golden-50',
//     iconColor: 'bg-golden-500 text-white',
//     image: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?w=600&q=80&fit=crop',
//   },
//   {
//     icon: Star,
//     title: 'Toddler Program',
//     age: '1 – 2 years',
//     description:
//       'Exploration, play, and discovery! Our toddler program encourages curiosity and early language development in a safe, stimulating space.',
//     color: 'bg-sage-100',
//     iconColor: 'bg-sage-400 text-white',
//     image: 'https://images.unsplash.com/photo-1609834008399-c00e10728e7b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//   },
//   {
//     icon: BookOpen,
//     title: 'Preschool',
//     age: '3 – 4 years',
//     description:
//       'Building foundational skills through play-based learning, creative arts, Bible stories, and social development activities.',
//     color: 'bg-forest-50',
//     iconColor: 'bg-forest-500 text-white',
//     image: 'https://images.unsplash.com/photo-1553641118-066cde5e7047?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//   },
//   {
//     icon: GraduationCap, 
//     title: 'Pre-Kindergarten',
//     age: '4 – 5 years',
//     description:
//       'Preparing children for kindergarten success with academic readiness, character development, and a strong faith foundation.',
//     color: 'bg-golden-50',
//     iconColor: 'bg-golden-500 text-white',
//     image: 'https://images.unsplash.com/photo-1559918095-0e91f93a8dd8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//   },
//   {
//     icon: Sun,
//     title: 'School-Age Care',
//     age: '5 – 12 years',
//     description:
//       'Before and after school care with homework help, enrichment activities, and a safe, faith-filled environment for older children.',
//     color: 'bg-sage-100',
//     iconColor: 'bg-sage-400 text-white',
//     image: 'https://images.unsplash.com/photo-1473280025148-643f9b0cbac2?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//   },
//   {
//     icon: Moon,
//     title: 'Summer Program',
//     age: 'Ages 5 – 12',
//     description:
//       'An engaging summer camp experience filled with outdoor adventures, creative arts, devotionals, and joyful community activities.',
//     color: 'bg-forest-50',
//     iconColor: 'bg-forest-500 text-white',
//     image: 'https://images.unsplash.com/photo-1606978806539-28ad82207267?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//   },
// ];

const programs = [
  {
    icon: Baby,
    title: 'Infant Care',
    age: '0 – 12 months',
    description:
      'Tender, attentive care for your youngest ones in a nurturing environment designed to support early bonding, sensory development, and daily routines.',
    color: 'bg-golden-50',
    iconColor: 'bg-golden-500 text-white',
    image:
      'https://images.unsplash.com/photo-1544126592-807ade215a0b?w=600&q=80&fit=crop',
  },
  {
    icon: Star,
    title: 'Young Toddlers',
    age: '12 – 24 months',
    description:
      'A playful and engaging environment where toddlers begin exploring language, movement, social interaction, and hands-on discovery.',
    color: 'bg-sage-100',
    iconColor: 'bg-sage-400 text-white',
    image:
      'https://images.unsplash.com/photo-1609834008399-c00e10728e7b?q=80&w=1170&auto=format&fit=crop',
  },
  {
    icon: Heart,
    title: 'Older Toddlers',
    age: '2 – 3 years',
    description:
      'Encouraging confidence, independence, and creativity through structured play, early learning activities, and positive social development.',
    color: 'bg-forest-50',
    iconColor: 'bg-forest-500 text-white',
    image:
      'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1170&auto=format&fit=crop',
  },
  {
    icon: BookOpen,
    title: 'Preschool',
    age: '3 – 4 years',
    description:
      'Building foundational academic and social skills through play-based learning, creative arts, Bible stories, and collaborative activities.',
    color: 'bg-golden-50',
    iconColor: 'bg-golden-500 text-white',
    image:
      'https://images.unsplash.com/photo-1553641118-066cde5e7047?q=80&w=1170&auto=format&fit=crop',
  },
  {
    icon: GraduationCap,
    title: 'Pre-Kindergarten',
    age: '4 – 5 years',
    description:
      'Preparing children for kindergarten success with academic readiness, leadership development, problem-solving, and a strong faith foundation.',
    color: 'bg-sage-100',
    iconColor: 'bg-sage-400 text-white',
    image:
      'https://images.unsplash.com/photo-1559918095-0e91f93a8dd8?q=80&w=1170&auto=format&fit=crop',
  },
  {
    icon: Sun,
    title: 'School-Age Care',
    age: '5 – 6 years',
    description:
      'Supportive before and after school care featuring homework help, enrichment activities, structured recreation, and spiritual encouragement.',
    color: 'bg-forest-50',
    iconColor: 'bg-forest-500 text-white',
    image:
      'https://images.unsplash.com/photo-1473280025148-643f9b0cbac2?q=80&w=1176&auto=format&fit=crop',
  },
  {
    icon: Moon,
    title: 'Extended School-Age Program',
    age: '6 – 13 years',
    description:
      'A safe and engaging environment for older children with mentorship, group activities, leadership opportunities, and seasonal programs.',
    color: 'bg-golden-50',
    iconColor: 'bg-golden-500 text-white',
    image:
      'https://images.unsplash.com/photo-1606978806539-28ad82207267?q=80&w=1170&auto=format&fit=crop',
  },
];



export default function HomePrograms() {
  return (
    <section className="py-20 md:py-28 bg-white" aria-labelledby="programs-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-golden-600 font-inter font-medium text-sm uppercase tracking-widest mb-3">
            Programs Offered
          </span>
          <h2
            id="programs-heading"
            className="font-poppins font-700 text-3xl md:text-4xl text-forest-500 mb-4"
          >
            Nurturing Every Stage of Childhood
          </h2>
          <p className="text-muted-gray font-inter text-lg max-w-2xl mx-auto leading-relaxed">
            From infants to school-age children, our faith-based programs provide age-appropriate
            education, care, and spiritual guidance at every developmental stage.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program) => (
            <article
              key={program.title}
              className="bg-white rounded-3xl overflow-hidden border border-cream-100 shadow-soft card-hover group"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={program.image}
                  alt={`${program.title} program at Love Edify Child Care`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-500/60 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-inter font-medium px-3 py-1 rounded-full border border-white/30">
                    {program.age}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-9 h-9 ${program.iconColor} rounded-xl flex items-center justify-center`}>
                    <program.icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-poppins font-600 text-forest-500 text-lg">{program.title}</h3>
                </div>
                <p className="text-muted-gray font-inter text-sm leading-relaxed">{program.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/programs" className="btn-primary inline-flex items-center gap-2">
            Explore All Programs
          </Link>
        </div>
      </div>
    </section>
  );
}
