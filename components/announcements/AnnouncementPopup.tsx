'use client';

import { useEffect, useState } from 'react';
import { X, ExternalLink } from 'lucide-react';
import type { SiteAnnouncement } from '@/lib/supabase';
import { fetchSiteAnnouncement, isWithinDateRange, todayIsoDate } from '@/lib/announcements';

const POPUP_SEEN_KEY = 'announcement-popup-seen';

export default function AnnouncementPopup() {
  const [announcement, setAnnouncement] = useState<SiteAnnouncement | null>(null);

  useEffect(() => {
    let active = true;
    fetchSiteAnnouncement().then((data) => {
      if (!active || !data) return;
      if (!data.show_popup || !data.flyer_url) return;
      if (!isWithinDateRange(data, todayIsoDate())) return;
      if (window.sessionStorage.getItem(POPUP_SEEN_KEY) === `${data.id}:${data.updated_at}`) return;
      setAnnouncement(data);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!announcement) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closePopup();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [announcement]);

  function closePopup() {
    if (announcement) {
      window.sessionStorage.setItem(POPUP_SEEN_KEY, `${announcement.id}:${announcement.updated_at}`);
    }
    setAnnouncement(null);
  }

  if (!announcement) return null;

  return (
    <div
      className="fixed inset-0 z-[70] bg-black/60 flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={closePopup}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Center announcement"
        className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closePopup}
          aria-label="Close announcement"
          className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 text-charcoal shadow-soft hover:bg-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="overflow-y-auto bg-cream">
          <img
            src={announcement.flyer_url}
            alt="Love Edify announcement flyer"
            className="w-full h-auto block"
          />
        </div>
        <div className="p-4 flex items-center justify-between gap-3 border-t border-cream-100">
          <p className="text-muted-gray font-inter text-xs">Save or print the flyer for your records.</p>
          <a
            href={announcement.flyer_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm px-4 py-2 inline-flex items-center gap-1.5 flex-shrink-0"
          >
            Open Flyer
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
