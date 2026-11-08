import { CircleCheck as CheckCircle, Award, Clock, Heart, BookOpen, Users, Shield, Smile } from 'lucide-react';

const reasons = [
  {
    icon: Heart,
    title: 'Faith-Integrated Curriculum',
    description: 'Scripture, prayer, and biblical values woven into every lesson and interaction.',
  },
  {
    icon: Award,
    title: 'Fully Licensed & Accredited',
    description: 'Meeting and exceeding all state licensing requirements for child care excellence.',
  },
  {
    icon: Users,
    title: 'Qualified, Caring Staff',
    description: 'Our teachers are educated, trained, background-checked, and passionate about children.',
  },
  {
    icon: Clock,
    title: 'Flexible Scheduling',
    description: 'Full-time and part-time options with extended hours to accommodate working families.',
  },
  {
    icon: Shield,
    title: 'Safety First Always',
    description: 'Secure facilities, emergency protocols, and a monitored, child-safe environment.',
  },
  {
    icon: BookOpen,
    title: 'Developmentally Appropriate',
    description: 'Age-appropriate learning experiences that meet each child where they are.',
  },
  {
    icon: Smile,
    title: 'Joyful, Positive Atmosphere',
    description: 'A warm, encouraging space where children feel loved, valued, and excited to learn.',
  },
  {
    icon: CheckCircle,
    title: 'Family Partnership',
    description: 'Regular communication, parent events, and resources to support your whole family.',
  },
];

export default function HomeWhyUs() {
  return (
    <section className="py-20 md:py-28 bg-cream-100" aria-labelledby="why-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-card">
              <img
                src="https://static.wixstatic.com/media/c73eb8_14052ee47abf401b9a072b1f2e3569f9~mv2.jpg"
                alt="Teacher reading to children in a bright, warm classroom"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-forest-500/20 to-transparent" />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-6 -right-4 bg-white rounded-2xl shadow-card p-5 max-w-[220px] border border-cream-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-golden-500 rounded-xl flex items-center justify-center">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-poppins font-700 text-forest-500 text-xl">100%</div>
                  <div className="text-muted-gray text-xs font-inter">Commitment to Safe Care</div>
                </div>
              </div>
              <p className="text-muted-gray text-xs font-inter leading-relaxed">
                Trusted by dozens of families in our community.
              </p>
            </div>
            {/* Scripture Card */}
            <div className="absolute -top-4 -left-4 bg-forest-500 rounded-2xl shadow-card p-4 max-w-[200px]">
              <p className="font-playfair italic text-white text-sm leading-relaxed">
                &ldquo;Love one another as I have loved you.&rdquo;
              </p>
              <p className="text-golden-400 text-xs font-inter mt-1">— John 15:12</p>
            </div>
          </div>

          {/* Content Side */}
          <div>
            <span className="inline-block text-golden-600 font-inter font-medium text-sm uppercase tracking-widest mb-3">
              Why Families Choose Us
            </span>
            <h2
              id="why-heading"
              className="font-poppins font-700 text-3xl md:text-4xl text-forest-500 leading-tight mb-5"
            >
              A Ministry Built on Love, Excellence &amp; Faith
            </h2>
            <p className="text-muted-gray font-inter text-base leading-relaxed mb-8">
              Families choose Love Edify because we offer more than child care — we offer a community
              rooted in faith, dedicated staff, and an unwavering commitment to each child&apos;s
              growth and well-being.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {reasons.map((reason) => (
                <div key={reason.title} className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-forest-500/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                    <reason.icon className="w-4 h-4 text-forest-500" />
                  </div>
                  <div>
                    <h3 className="font-poppins font-600 text-forest-500 text-sm mb-0.5">{reason.title}</h3>
                    <p className="text-muted-gray font-inter text-xs leading-relaxed">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
