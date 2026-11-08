import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EventsCalendar from '@/components/EventsCalendar';
import Link from 'next/link';
import { FileText, Calendar, Download, Smartphone, BookOpen, Shield, ExternalLink } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import type { CenterEvent } from '@/lib/supabase';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Parent Resources',
  description:
    'Access newsletters, required paperwork, communication tools, and parent resources for Love Edify Child Care Services enrolled families.',
};

const paperworkItems = [
  { name: 'Enrollment Application Form', desc: 'Complete to begin the enrollment process', type: 'PDF' },
  { name: 'Child Medical History Form', desc: 'Required health history and immunization records', type: 'PDF' },
  { name: 'Emergency Contact Form', desc: 'List all emergency contacts and authorized pickup persons', type: 'PDF' },
  { name: 'Medication Authorization Form', desc: 'Permission for administering medication at the center', type: 'PDF' },
  { name: 'Photo & Media Release', desc: 'Permission for photos and videos of your child', type: 'PDF' },
  { name: 'Arrival & Departure Authorization', desc: 'Authorized persons to pick up your child', type: 'PDF' },
  { name: 'Allergy & Special Needs Form', desc: 'Document any dietary restrictions or special requirements', type: 'PDF' },
  { name: 'Tuition Agreement', desc: 'Payment schedule, policies, and fee agreement', type: 'PDF' },
];

const resources = [
  {
    icon: BookOpen,
    title: 'Parent Handbook',
    desc: 'Comprehensive guide to policies, procedures, schedules, and expectations.',
    href: '/contact',
    color: 'text-forest-500',
    bg: 'bg-forest-50',
    id: 'handbook',
  },
  {
    icon: Calendar,
    title: 'Events Calendar',
    desc: 'Important dates, center events, holidays, and school year schedule.',
    href: '#calendar',
    color: 'text-forest-500',
    bg: 'bg-forest-50',
    id: 'calendar-card',
  },
  {
    icon: Smartphone,
    title: 'Parent App',
    desc: 'Clock in/out, daily reports, photos, and real-time updates on your phone.',
    href: '#parentApp',
    color: 'text-golden-600',
    bg: 'bg-golden-50',
    id: 'app',
  },
  {
    icon: Shield,
    title: 'Health & Safety',
    desc: 'Illness policies, emergency procedures, and COVID protocols for our center.',
    href: '/contact',
    color: 'text-sage-500',
    bg: 'bg-sage-100',
    id: 'health',
  },
];

async function getEvents(): Promise<CenterEvent[]> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data } = await supabase
    .from('center_events')
    .select('*')
    .eq('published', true)
    .order('event_date', { ascending: true });
  return (data ?? []) as CenterEvent[];
}

export default async function ParentResourcesPage() {
  const events = await getEvents();

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
                For Families
              </span>
              <h1 className="font-poppins font-700 text-4xl md:text-5xl text-white mb-5">
                Parent Resources &amp; Tools
              </h1>
              <p className="text-white/80 font-inter text-lg leading-relaxed">
                Everything you need to stay connected, informed, and engaged with your
                child&apos;s experience at Love Edify — all in one convenient place.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Resource Grid */}
        <section className="py-16 bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-poppins font-700 text-3xl text-forest-500 mb-3">
                Resource Hub
              </h2>
              <p className="text-muted-gray font-inter text-base max-w-xl mx-auto">
                Access all parent tools, documents, and communication systems in one place.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {resources.map((r) => (
                <a
                  key={r.title}
                  href={r.href}
                  id={r.id}
                  className="group bg-white border border-cream-100 rounded-2xl p-6 shadow-soft card-hover flex items-start gap-4"
                >
                  <div className={`w-12 h-12 ${r.bg} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}>
                    <r.icon className={`w-5 h-5 ${r.color}`} />
                  </div>
                  <div>
                    <h3 className="font-poppins font-600 text-forest-500 text-base mb-1.5 group-hover:text-golden-600 transition-colors duration-200">
                      {r.title}
                    </h3>
                    <p className="text-muted-gray font-inter text-sm leading-relaxed">{r.desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Events Calendar */}
        <section className="py-16 bg-white scroll-mt-24" id="calendar">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <span className="inline-block text-golden-600 font-inter font-medium text-sm uppercase tracking-widest mb-3">
                Stay Connected
              </span>
              <h2 className="font-poppins font-700 text-3xl text-forest-500 mb-3">
                Events Calendar
              </h2>
              <p className="text-muted-gray font-inter text-base max-w-xl">
                Stay up to date with upcoming center events, holidays, field trips, and parent
                meetings. Click any highlighted day to view event details.
              </p>
            </div>
            <EventsCalendar events={events} />
          </div>
        </section>

        {/* Required Paperwork */}
        <section className="py-16 bg-cream scroll-mt-24" id="paperwork">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-14 items-start">
              <div>
                <span className="inline-block text-golden-600 font-inter font-medium text-sm uppercase tracking-widest mb-3">
                  Required Documents
                </span>
                <h2 className="font-poppins font-700 text-3xl text-forest-500 mb-4">
                  Enrollment Paperwork
                </h2>
                <p className="text-muted-gray font-inter text-base leading-relaxed mb-6">
                  Please complete all required forms before your child&apos;s first day.
                  Contact us if you need assistance completing any documents.
                </p>
                <Link href="/contact" className="btn-primary inline-flex items-center gap-2 mb-8">
                  Need Help? Contact Us
                </Link>
              </div>
              <div className="space-y-3">
                {paperworkItems.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between bg-white rounded-xl px-5 py-4 border border-cream-100 group hover:border-forest-200 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-forest-50 rounded-lg flex items-center justify-center">
                        <FileText className="w-4 h-4 text-forest-500" />
                      </div>
                      <div>
                        <p className="font-inter font-medium text-charcoal text-sm">{item.name}</p>
                        <p className="text-muted-gray font-inter text-xs">{item.desc}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-gray font-inter bg-cream-100 px-2 py-0.5 rounded">
                        {item.type}
                      </span>
                      <Download className="w-4 h-4 text-muted-gray group-hover:text-forest-500 transition-colors cursor-pointer" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Parent App */}
        {/* <section className="py-16 bg-forest-500 relative overflow-hidden" id="parentApp">
          <div className="absolute inset-0 bg-hero-pattern" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block text-golden-400 font-inter font-medium text-sm uppercase tracking-widest mb-3">
                  Coming Soon
                </span>
                <h2 className="font-poppins font-700 text-3xl md:text-4xl text-white mb-5">
                  The Love Edify Parent App
                </h2>
                <p className="text-white/80 font-inter text-base leading-relaxed mb-6">
                  Our parent app puts everything you need right in the palm of your hand. Stay
                  connected to your child&apos;s day, receive real-time updates, and manage your
                  family&apos;s schedule with ease.
                </p>
                <ul className="space-y-3 mb-8 text-white/80">
                  {[
                    'Digital sign-in / clock-in system',
                    'Daily activity and meal reports',
                    'Photo sharing from teachers',
                    'Direct messaging with staff',
                    'Upcoming events and announcements',
                    'Invoice and payment management',
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-white/85 font-inter text-sm">
                      <div className="w-1.5 h-1.5 bg-golden-400 rounded-full flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex gap-3">
                  <Link href="/contact#app" className="btn-primary flex items-center gap-2">
                    <Smartphone className="w-4 h-4" />
                    Get Notified at Launch
                  </Link>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="bg-white/10 border border-white/20 rounded-3xl p-8 text-center max-w-sm">
                  <div className="w-20 h-20 bg-golden-500 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-golden">
                    <Smartphone className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="font-poppins font-600 text-white text-xl mb-2">Love Edify App</h3>
                  <p className="text-white/70 font-inter text-sm mb-5">
                    Available soon on iOS &amp; Android
                  </p>
                  <div className="space-y-2">
                    <div className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 flex items-center gap-3">
                      <ExternalLink className="w-4 h-4 text-golden-400" />
                      <span className="text-white text-sm font-inter">App Store</span>
                      <span className="ml-auto text-white/50 text-xs">Coming Soon</span>
                    </div>
                    <div className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 flex items-center gap-3">
                      <ExternalLink className="w-4 h-4 text-golden-400" />
                      <span className="text-white text-sm font-inter">Google Play</span>
                      <span className="ml-auto text-white/50 text-xs">Coming Soon</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}

<section className="py-16 bg-forest-500 relative overflow-hidden scroll-mt-24" id="parentApp">
  <div className="absolute inset-0 bg-hero-pattern" />

  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <span className="inline-block text-golden-400 font-inter font-medium text-sm uppercase tracking-widest mb-3">
          Parent Communication
        </span>

        <h2 className="font-poppins font-700 text-3xl md:text-4xl text-white mb-5">
          Stay Connected with Brightwheel
        </h2>

        <p className="text-white/80 font-inter text-base leading-relaxed mb-6">
          Love Edify Child Care Services uses the Brightwheel Parent App to keep
          families connected throughout the day. Receive real-time updates,
          photos, messages, billing information, and important classroom
          notifications directly from your child&apos;s teachers.
        </p>

        <ul className="space-y-3 mb-8 text-white/80">
          {[
            'Daily activity, meals, and nap reports',
            'Real-time photos and classroom updates',
            'Direct messaging with teachers and staff',
            'Digital check-in and attendance tracking',
            'Tuition billing and payment management',
            'Announcements, reminders, and event updates',
          ].map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-2.5 text-white/85 font-inter text-sm"
            >
              <div className="w-1.5 h-1.5 bg-golden-400 rounded-full flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>

       
      </div>

      <div className="flex justify-center">
        <div className="bg-white/10 border border-white/20 rounded-3xl p-8 text-center max-w-md backdrop-blur-sm">
          <div className="flex justify-center mb-6">
      <img
        src="https://mybrightwheel.com/wp-content/themes/_brightwheel/img/brightwheel-logo-white.svg"
        alt="Brightwheel Logo"
        className="h-12 md:h-14 w-auto object-contain"
      />
    </div>


          <p className="text-white/75 font-inter text-sm leading-relaxed mb-6">
            Access your child&apos;s daily updates, communicate with teachers,
            receive photos, and manage billing all from one convenient app.
          </p>

         <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
  
  <a
    href="https://brightwheel.app.link/kBO3XtO5A6"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center h-14 px-4 rounded-xl bg-black/0 transition-transform duration-200 hover:scale-105"
  >
    <img
      src="https://mybrightwheel.com/wp-content/themes/_brightwheel/img/redesign/appstore.svg"
      alt="Download on the App Store"
      className="h-12 w-auto object-contain"
    />
  </a>

  <a
    href="https://brightwheel.app.link/J0Geo1W5A6"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center h-14 px-4 rounded-xl bg-black/0 transition-transform duration-200 hover:scale-105"
  >
    <img
      src="https://mybrightwheel.com/wp-content/themes/_brightwheel/img/redesign/googleplay.svg"
      alt="Get it on Google Play"
      className="h-12 w-auto object-contain"
    />
  </a>

</div>
        </div>
      </div>
    </div>
  </div>
</section>

        
        {/* Child Care Management System */}
        <section className="py-16 bg-white" id="communication">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block text-golden-600 font-inter font-medium text-sm uppercase tracking-widest mb-3">
              Management System
            </span>
            <h2 className="font-poppins font-700 text-3xl text-forest-500 mb-4">
              Connected to Our Child Care Platform
            </h2>
            <p className="text-muted-gray font-inter text-base leading-relaxed mb-8 max-w-2xl mx-auto">
              Our center utilizes a professional child care management system to keep parents
              connected and informed. Once enrolled, you&apos;ll receive login credentials to
              access your family&apos;s portal.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {[
                { title: 'Daily Reports', desc: 'Activities, meals, naps, and milestones delivered daily.' },
                { title: 'Secure Messaging', desc: 'Communicate directly with your child\'s teacher.' },
                { title: 'Billing & Payments', desc: 'View invoices and manage payments online.' },
              ].map((item) => (
                <div key={item.title} className="bg-cream rounded-2xl p-5 border border-cream-100 text-left">
                  <h3 className="font-poppins font-600 text-forest-500 text-base mb-2">{item.title}</h3>
                  <p className="text-muted-gray font-inter text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
            <Link href="/enrollment" className="btn-primary inline-flex items-center gap-2">
              Begin Enrollment for Access
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
