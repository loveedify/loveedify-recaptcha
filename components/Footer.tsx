import Link from 'next/link';
import { Heart, Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-forest-500 text-white">
      {/* Scripture Banner */}
      <div className="bg-golden-500 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-playfair italic text-white text-sm md:text-base">
            &ldquo;Train up a child in the way he should go; even when he is old he will not depart from it.&rdquo;
            <span className="font-inter not-italic font-medium ml-2">— Proverbs 22:6</span>
          </p>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-9 h-9 p-1 bg-white rounded-xl flex items-center justify-center shadow-golden transition-transform group-hover:scale-105">
              <img 
                src="https://static.wixstatic.com/shapes/c73eb8_4c3d83c3e6104f6485e207603ce3b1c1.svg"
                alt="logo"
                className="h-14 w-auto"/>
            </div>
              <div>
                <span className="font-poppins font-700 text-white text-lg leading-tight block">Love Edify</span>
                <span className="text-golden-300 text-[10px] font-inter leading-tight block tracking-wide">
                  Child Care Center
                </span>
              </div>
            </Link>
            <p className="text-white/75 text-sm font-inter leading-relaxed mb-5">
              A faith-centered environment where children are cared for, encouraged, educated, and spiritually uplifted.
            </p>
            {/* <div className="flex gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-golden-500 transition-colors duration-200"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-golden-500 transition-colors duration-200"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-golden-500 transition-colors duration-200"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div> */}
          </div> 

          {/* Quick Links */}
          <div>
            <h4 className="font-poppins font-600 text-white mb-5 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { href: '/about', label: 'About Us' },
                { href: '/programs', label: 'Our Programs' },
                { href: '/enrollment', label: 'Enrollment' },
                { href: '/parent-resources', label: 'Parent Resources' },
                { href: '/inspirational', label: 'Inspirational Corner' },
                { href: '/prayer-requests', label: 'Prayer Requests' },
                { href: '/contact', label: 'Contact Us' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/75 text-sm font-inter hover:text-golden-400 transition-colors duration-150 flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 bg-golden-500 rounded-full"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-poppins font-600 text-white mb-5 text-sm uppercase tracking-wider">Programs</h4>
         <ul className="space-y-2.5">
  {[
    { href: '/programs#infant', label: 'Infant Care (0–12 months)' },
    { href: '/programs#young-toddlers', label: 'Young Toddlers (12–24 months)' },
    { href: '/programs#older-toddlers', label: 'Older Toddlers (2–3 years)' },
    { href: '/programs#preschool', label: 'Preschool (3–4 years)' },
    { href: '/programs#prek', label: 'Pre-Kindergarten (4–5 years)' },
    { href: '/programs#school-age', label: 'School-Age Care (5–6 years)' },
    { href: '/programs#extended-school-age', label: 'Extended School-Age Program (6–13 years)' },
  ].map((program) => (
    <li key={program.label}>
      <Link
        href={program.href}
        className="text-white/75 text-sm font-inter hover:text-golden-400 transition-colors duration-150 flex items-center gap-1.5"
        
      > 
        <span className="w-1 h-1 bg-golden-500 rounded-full flex-shrink-0"></span>
        {program.label}
      </Link>
    </li>
  ))}
</ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-poppins font-600 text-white mb-5 text-sm uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+18645892228"
                  className="flex items-start gap-3 text-white/75 text-sm font-inter hover:text-golden-400 transition-colors duration-150 group"
                >
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-golden-500 transition-colors duration-200">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <span className="leading-relaxed pt-0.5">(864) 589-2228</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:love.edify317@outlook.com"
                  className="flex items-start gap-3 text-white/75 text-sm font-inter hover:text-golden-400 transition-colors duration-150 group"
                >
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-golden-500 transition-colors duration-200">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <span className="leading-relaxed pt-0.5">love.edify317@outlook.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-white/75 text-sm font-inter">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <span className="leading-relaxed pt-0.5">
                    1115 Thompson Blvd<br />
                    Union, SC 29379
                  </span>
                </div>
              </li>
            </ul>

            <div className="mt-6 p-4 bg-white/10 rounded-xl border border-white/10">
              <p className="text-white text-xs font-inter font-medium mb-1">Office Hours</p>
              <p className="text-white/75 text-xs font-inter">Mon–Fri: 6:30 AM – 6:00 PM</p>
              <p className="text-white/75 text-xs font-inter">Closed on major holidays</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/60 text-xs font-inter text-center md:text-left">
            &copy; {new Date().getFullYear()} Love Edify Child Care Services. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-white/60 text-xs font-inter hover:text-golden-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white/60 text-xs font-inter hover:text-golden-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="/admin" className="text-white/60 text-xs font-inter hover:text-golden-400 transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
