import { supabase, type SiteAnnouncement } from '@/lib/supabase';

export async function fetchSiteAnnouncement(): Promise<SiteAnnouncement | null> {
  const { data, error } = await supabase
    .from('site_announcements')
    .select('*')
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error || !data) return null;
  return data as SiteAnnouncement;
}

export function isWithinDateRange(announcement: SiteAnnouncement, today: string): boolean {
  if (announcement.starts_on && announcement.starts_on > today) return false;
  if (announcement.ends_on && announcement.ends_on < today) return false;
  return true;
}

export function todayIsoDate(): string {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - offset).toISOString().split('T')[0];
}
