'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Heart, ChevronDown } from 'lucide-react';
import AnnouncementBanner from '@/components/announcements/AnnouncementBanner';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/programs', label: 'Programs' },
  { href: '/parent-resources', label: 'Parent Resources' },
  {
    label: 'Faith & Community',
    children: [
      { href: '/inspirational', label: 'Inspirational Corner' },
      { href: '/prayer-requests', label: 'Prayer Requests' },
    ],
  },
  { href: '/enrollment', label: 'Enrollment' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!dropdownOpen) return;
    const handlePointerDown = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) setDropdownOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setDropdownOpen(false);
    };
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [dropdownOpen]);

  const isActive = (href: string) => pathname === href;
  const isGroupActive = (children: { href: string }[]) =>
    children.some((child) => isActive(child.href));

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-forest-500 shadow-lg' : 'bg-forest-500/95 backdrop-blur-sm'
      }`}
    >
      <AnnouncementBanner />
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 p-1 bg-white rounded-xl flex items-center justify-center shadow-golden transition-transform group-hover:scale-105">
              <img 
                src="https://static.wixstatic.com/shapes/c73eb8_4c3d83c3e6104f6485e207603ce3b1c1.svg"
                alt="logo"
                className="h-14 w-auto"/>
            </div>
            <div>
              <span className="font-poppins font-700 text-white text-lg leading-tight block">
                Love Edify
              </span>
              <span className="text-golden-300 text-[10px] font-inter leading-tight block tracking-wide">
                Child Care Center
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label} className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    aria-expanded={dropdownOpen}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg font-inter font-medium text-sm transition-all duration-200 ${
                      isGroupActive(link.children)
                        ? 'text-golden-400 bg-white/10'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {link.label}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-card-hover border border-cream-100 py-1.5 min-w-[180px]">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`block px-4 py-2.5 text-sm font-inter transition-colors duration-150 ${
                            isActive(child.href)
                              ? 'text-forest-500 font-medium bg-cream-50'
                              : 'text-charcoal hover:text-forest-500 hover:bg-cream-50'
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href!}
                  className={`px-3 py-2 rounded-lg font-inter font-medium text-sm transition-all duration-200 ${
                    isActive(link.href!)
                      ? 'text-golden-400 bg-white/10'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/enrollment"
              className="btn-primary text-sm px-5 py-2.5"
            >
              Enroll Now
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-forest-600 border-t border-white/10">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label}>
                  <p className="px-3 py-2 text-white/70 text-xs font-inter font-medium uppercase tracking-wider">
                    {link.label}
                  </p>
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={`block px-3 py-2.5 pl-6 rounded-lg font-inter font-medium text-sm transition-colors duration-150 ${
                        isActive(child.href)
                          ? 'text-golden-400 bg-white/10'
                          : 'text-white/90 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href!}
                  className={`block px-3 py-2.5 rounded-lg font-inter font-medium text-sm transition-colors duration-150 ${
                    isActive(link.href!)
                      ? 'text-golden-400 bg-white/10'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="pt-2">
              <Link href="/enrollment" className="btn-primary block text-center text-sm">
                Enroll Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
