import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Parent of 2',
    quote:
      "Love Edify has been such a blessing to our family. My children come home every day singing Bible verses and telling me about what they learned. The staff truly cares about each child.",
    rating: 5,
    image: 'https://images.unsplash.com/photo-1640529853461-92876b30944f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Marcus T.',
    role: 'Parent of twins',
    quote:
      "From day one, the teachers at Love Edify made our twins feel safe and loved. The faith-based environment aligns perfectly with our family values. We couldn't be happier.",
    rating: 5,
    image: 'https://images.unsplash.com/photo-1746954412182-e97488254ffc?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'Priscilla W.',
    role: 'Parent of 3',
    quote:
      "What sets Love Edify apart is the genuine love for children and families. The prayer support, the newsletters, and the open communication make us feel like part of a family, not just clients.",
    rating: 5,
    image: 'https://images.unsplash.com/photo-1592214534258-0067435006d8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: 'David & Kezia L.',
    role: 'Parents',
    quote:
      "We searched for months for the right place for our daughter. Love Edify was the answer. The teachers are excellent, the curriculum is strong, and the biblical foundation is exactly what we wanted.",
    rating: 5,
    image: 'https://images.unsplash.com/photo-1749065309826-a8d6563ba884?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
  },
];

export default function HomeTestimonials() {
  return (
    <section className="py-20 md:py-28 bg-cream-100" aria-labelledby="testimonials-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-golden-600 font-inter font-medium text-sm uppercase tracking-widest mb-3">
            Family Testimonials
          </span>
          <h2
            id="testimonials-heading"
            className="font-poppins font-700 text-3xl md:text-4xl text-forest-500 mb-4"
          >
            What Families Are Saying
          </h2>
          <p className="text-muted-gray font-inter text-lg max-w-2xl mx-auto leading-relaxed">
            The trust and gratitude of our families is our greatest honor. Here are just a few
            voices from the Love Edify community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-3xl p-7 shadow-soft border border-cream-100 card-hover"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={t.image}
                    alt={`${t.name} - Love Edify parent testimonial`}
                    className="w-12 h-12 rounded-full object-cover border-2 border-golden-200"
                  />
                  <div>
                    <div className="font-poppins font-600 text-forest-500 text-sm">{t.name}</div>
                    <div className="text-muted-gray font-inter text-xs">{t.role}</div>
                  </div>
                </div>
                <Quote className="w-8 h-8 text-golden-200 fill-golden-100 flex-shrink-0" />
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-golden-500 fill-golden-500" />
                ))}
              </div>

              <p className="text-muted-gray font-inter text-sm leading-relaxed italic">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
