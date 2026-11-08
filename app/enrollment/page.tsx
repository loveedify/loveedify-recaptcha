import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EnrollmentForm from '@/components/EnrollmentForm';
import { CircleCheck as CheckCircle, Clock, Phone, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Enrollment',
  description:
    'Enroll your child at Love Edify Child Care Services. Complete our enrollment inquiry form and take the first step toward a faith-filled early childhood experience.',
};

const steps = [
  { num: '01', title: 'Submit Inquiry', desc: 'Complete the enrollment inquiry form with your family information.' },
  { num: '02', title: 'Schedule Tour', desc: 'A team member will contact you to schedule a center tour.' },
  { num: '03', title: 'Complete Paperwork', desc: 'Download and complete all required enrollment documents.' },
  { num: '04', title: 'Welcome Day', desc: 'Your child joins our Love Edify family — we celebrate every new beginning!' },
];

export default function EnrollmentPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-forest-500 py-20 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-hero-pattern" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <span className="inline-block text-golden-400 font-inter font-medium text-sm uppercase tracking-widest mb-3">
                Begin Your Journey
              </span>
              <h1 className="font-poppins font-700 text-4xl md:text-5xl text-white mb-5 leading-tight">
                Enrollment at Love Edify
              </h1>
              <p className="text-white/80 font-inter text-lg leading-relaxed">
                We&apos;d love to welcome your child into our family. Complete the inquiry form
                below to begin the enrollment process.
              </p>
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="py-14 bg-cream-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="font-poppins font-700 text-2xl md:text-3xl text-forest-500 mb-2">
                How Enrollment Works
              </h2>
              <p className="text-muted-gray font-inter text-base">
                Simple, welcoming, and straightforward.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {steps.map((step, i) => (
                <div key={step.num} className="relative">
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-golden-200 z-0" style={{ width: 'calc(100% - 4rem)', left: '4.5rem' }} />
                  )}
                  <div className="bg-white rounded-2xl p-5 border border-cream-100 shadow-soft text-center relative z-10">
                    <div className="w-14 h-14 bg-golden-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-golden">
                      <span className="font-poppins font-700 text-white text-lg">{step.num}</span>
                    </div>
                    <h3 className="font-poppins font-600 text-forest-500 text-base mb-2">{step.title}</h3>
                    <p className="text-muted-gray font-inter text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Form + Info */}
        <section className="py-16 bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Sidebar Info */}
              <div className="lg:col-span-1 space-y-5">
                <div className="bg-forest-500 rounded-2xl p-6 text-white">
                  <h3 className="font-poppins font-600 text-lg mb-4">Contact Us Directly</h3>
                  <div className="space-y-3">
                    <a href="tel:+18645892228" className="flex items-center gap-3 text-white/85 hover:text-golden-400 transition-colors">
                      <Phone className="w-4 h-4" />
                      <span className="font-inter text-sm">(864) 589-2228</span>
                    </a>
                    <a href="mailto:love.edify317@outlook.com" className="flex items-center gap-3 text-white/85 hover:text-golden-400 transition-colors">
                      <Mail className="w-4 h-4" />
                      <span className="font-inter text-sm">love.edify317@outlook.com</span>
                    </a>
                    <div className="flex items-center gap-3 text-white/70">
                      <Clock className="w-4 h-4" />
                      <span className="font-inter text-sm">Mon–Fri: 6:30 AM – 6:00 PM</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-cream-100 shadow-soft">
                  <h3 className="font-poppins font-600 text-forest-500 text-base mb-4">What to Expect</h3>
                  <ul className="space-y-2.5">
                    {[
                      'Response within 1-2 business days',
                      'Center tour before enrollment',
                      'Meet your child\'s teacher',
                      'Review all policies together',
                      'Warm, personal onboarding',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-sage-400 flex-shrink-0 mt-0.5" />
                        <span className="text-muted-gray font-inter text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-golden-50 border border-golden-200 rounded-2xl p-5">
                  <p className="font-playfair italic text-forest-500 text-sm leading-relaxed mb-2">
                    &ldquo;Every child who walks through our doors is a blessing and a responsibility we take with joy.&rdquo;
                  </p>
                  <p className="text-muted-gray font-inter text-xs">— Love Edify Director</p>
                </div>
              </div>

              {/* Enrollment Form */}
              <div className="lg:col-span-2">
                <div className="mb-6">
                  <h2 className="font-poppins font-700 text-2xl md:text-3xl text-forest-500 mb-2">
                    Enrollment Inquiry Form
                  </h2>
                  <p className="text-muted-gray font-inter text-base">
                    Fill out the form below and our team will reach out to complete your enrollment.
                  </p>
                </div>
                <EnrollmentForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
