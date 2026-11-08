import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Youtube } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Contact Love Edify Child Care Services. Reach our team by phone, email, or use our contact form. We look forward to hearing from you.',
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-forest-500 py-20 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-hero-pattern" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block text-golden-400 font-inter font-medium text-sm uppercase tracking-widest mb-3">
              Get in Touch
            </span>
            <h1 className="font-poppins font-700 text-4xl md:text-5xl text-white mb-5">
              Contact Love Edify
            </h1>
            <p className="text-white/80 font-inter text-lg max-w-xl mx-auto leading-relaxed">
              We&apos;d love to hear from you. Reach out with questions, tour requests, prayer needs,
              or just to say hello.
            </p>
          </div>
        </section>

        {/* Contact Info + Form */}
        <section className="py-16 bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Contact Details */}
              <div className="space-y-5">
                {/* Phone */}
                <div className="bg-white rounded-2xl p-5 border border-cream-100 shadow-soft">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-forest-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-forest-500" />
                    </div>
                    <div>
                      <h3 className="font-poppins font-600 text-forest-500 text-base mb-1">Phone</h3>
                      <a href="tel:+18645892228" className="text-muted-gray font-inter text-sm hover:text-forest-500 transition-colors">
                       (864) 589-2228
                      </a>
                      <p className="text-muted-gray font-inter text-xs mt-0.5">Cell</p>
                      <br></br>
                       <a href="tel:+18644249393" className="text-muted-gray font-inter text-sm hover:text-forest-500 transition-colors">
                       (864) 424-9393
                      </a>
                      <p className="text-muted-gray font-inter text-xs mt-0.5">Landline</p>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="bg-white rounded-2xl p-5 border border-cream-100 shadow-soft">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-golden-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-golden-600" />
                    </div>
                    <div>
                      <h3 className="font-poppins font-600 text-forest-500 text-base mb-1">Email</h3>
                      <a href="mailto:love.edify317@outlook.com" className="text-muted-gray font-inter text-sm hover:text-forest-500 transition-colors block">
                        love.edify317@outlook.com
                      </a>
                      
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="bg-white rounded-2xl p-5 border border-cream-100 shadow-soft">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-sage-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-sage-500" />
                    </div>
                    <div>
                      <h3 className="font-poppins font-600 text-forest-500 text-base mb-1">Location</h3>
                      <p className="text-muted-gray font-inter text-sm leading-relaxed">
                        1115 Thompson Blvd.<br />
                        Union, SC 29379
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="bg-white rounded-2xl p-5 border border-cream-100 shadow-soft">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-forest-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-forest-500" />
                    </div>
                    <div>
                      <h3 className="font-poppins font-600 text-forest-500 text-base mb-2">Hours of Operation</h3>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm font-inter">
                          <span className="text-charcoal mr-4">Monday – Friday</span>
                          <span className="text-muted-gray">6:30 AM – 6:00 PM</span>
                        </div>
                        <div className="flex justify-between text-sm font-inter">
                          <span className="text-charcoal">Saturday</span>
                          <span className="text-muted-gray">Closed</span>
                        </div>
                        <div className="flex justify-between text-sm font-inter">
                          <span className="text-charcoal">Sunday</span>
                          <span className="text-muted-gray">Closed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social */}
                <div className="bg-forest-500 rounded-2xl p-5">
                  <h3 className="font-poppins font-600 text-white text-base mb-3">Follow Us</h3>
                  <div className="flex gap-3">
                    {[
                      { icon: Facebook, label: 'Facebook' },
                      { icon: Instagram, label: 'Instagram' },
                      { icon: Youtube, label: 'YouTube' },
                    ].map(({ icon: Icon, label }) => (
                      <a
                        key={label}
                        href="#"
                        aria-label={label}
                        className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-golden-500 transition-colors duration-200"
                      >
                        <Icon className="w-4 h-4 text-white" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-2">
                <div className="mb-6">
                  <h2 id="schedule" className="font-poppins font-700 text-2xl md:text-3xl text-forest-500 mb-2">
                    Send Us a Message
                  </h2>
                  <p className="text-muted-gray font-inter text-base">
                    Whether you have a question, want to schedule a tour, or need prayer support —
                    we&apos;re here for you.
                  </p>
                </div>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* Map Placeholder */}
        <section className="h-72 bg-forest-50 relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1920&q=80&fit=crop"
            alt="Map location of Love Edify Child Care Services"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-card p-5 flex items-center gap-4">
              <div className="w-11 h-11 bg-golden-500 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-poppins font-600 text-forest-500 text-base">Love Edify Child Care Center</p>
                <p className="text-muted-gray font-inter text-sm">1115 Thompson Blvd., Union,SC 29379</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
