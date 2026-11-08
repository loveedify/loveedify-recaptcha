import Link from 'next/link';
import { FileText, MessageSquare, Calendar, Download, Bell, Smartphone } from 'lucide-react';

const resources = [
  {
    icon: FileText,
    title: 'Required Paperwork',
    description: 'Download and complete all enrollment and health forms before your first day.',
    href: '/parent-resources#paperwork',
    color: 'text-forest-500',
    bg: 'bg-forest-50',
  },
  {
    icon: Calendar,
    title: 'Schedule a Meeting',
    description: 'Request a tour, parent-teacher conference, or any appointment with our team.',
    href: '/contact#schedule',
    color: 'text-sage-500',
    bg: 'bg-sage-100',
  },

  {
    icon: Smartphone,
    title: 'Download the App',
    description: 'Our parent app puts daily reports, photos, and sign-in tools at your fingertips.',
    href: '/parent-resources#parentApp',
    color: 'text-sage-500',
    bg: 'bg-sage-100',
  },
];

export default function HomeParentResources() {
  return (
    <section className="py-20 md:py-28 bg-white" aria-labelledby="resources-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-golden-600 font-inter font-medium text-sm uppercase tracking-widest mb-3">
            For Families
          </span>
          <h2
            id="resources-heading"
            className="font-poppins font-700 text-3xl md:text-4xl text-forest-500 mb-4"
          >
            Parent Resources &amp; Tools
          </h2>
          <p className="text-muted-gray font-inter text-lg max-w-2xl mx-auto leading-relaxed">
            Everything you need to stay connected, informed, and engaged with your child&apos;s
            experience at Love Edify — all in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {resources.map((resource) => (
            <Link
              key={resource.title}
              href={resource.href}
              className="group bg-white border border-cream-100 rounded-2xl p-6 shadow-soft card-hover flex items-start gap-4"
            >
              <div
                className={`w-12 h-12 ${resource.bg} rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110`}
              >
                <resource.icon className={`w-5 h-5 ${resource.color}`} />
              </div>
              <div>
                <h3 className="font-poppins font-600 text-forest-500 text-base mb-1.5 group-hover:text-golden-600 transition-colors duration-200">
                  {resource.title}
                </h3>
                <p className="text-muted-gray font-inter text-sm leading-relaxed">
                  {resource.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/parent-resources" className="btn-secondary inline-flex items-center gap-2">
            View All Parent Resources
          </Link>
        </div>
      </div>
    </section>
  );
}
