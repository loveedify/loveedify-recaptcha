'use client';

import { useEffect, useState } from 'react';
import { X, Megaphone } from 'lucide-react';
import type { SiteAnnouncement } from '@/lib/supabase';
import { fetchSiteAnnouncement, isWithinDateRange, todayIsoDate } from '@/lib/announcements';

const DISMISS_KEY = 'announcement-banner-dismissed';

export default function AnnouncementBanner() {
  const [announcement, setAnnouncement] = useState<SiteAnnouncement | null>(null);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    let active = true;
    fetchSiteAnnouncement().then((data) => {
      if (!active || !data) return;
      setAnnouncement(data);
      const seenKey = `${data.id}:${data.updated_at}`;
      setDismissed(window.localStorage.getItem(DISMISS_KEY) === seenKey);
    });
    return () => {
      active = false;
    };
  }, []);

  if (!announcement || dismissed) return null;
  if (!announcement.show_banner || !announcement.banner_text.trim()) return null;
  if (!isWithinDateRange(announcement, todayIsoDate())) return null;

  function handleDismiss() {
    if (!announcement) return;
    window.localStorage.setItem(DISMISS_KEY, `${announcement.id}:${announcement.updated_at}`);
    setDismissed(true);
  }

  return (
    <div role="status" className="bg-golden-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center gap-3">
        <Megaphone className="w-4 h-4 flex-shrink-0" />
        <p className="flex-1 text-sm font-inter font-medium leading-snug">{announcement.banner_text}</p>
        <button
          onClick={handleDismiss}
          aria-label="Dismiss announcement"
          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/15 transition-colors flex-shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
