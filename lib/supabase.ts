import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type InspirationalPost = {
  id: string;
  title: string;
  content: string;
  scripture_reference: string;
  scripture_text: string;
  category: 'devotional' | 'scripture' | 'message' | 'newsletter';
  published: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
};

export type NewsletterSubscriber = {
  id: string;
  email: string;
  name: string;
  subscribed_at: string;
  active: boolean;
};

export type PrayerRequest = {
  id: string;
  name: string;
  email: string;
  request: string;
  is_private: boolean;
  is_answered: boolean;
  created_at: string;
};

export type EnrollmentInquiry = {
  id: string;
  parent_name: string;
  email: string;
  phone: string;
  child_name: string;
  child_dob: string;
  program_interest: string;
  start_date: string;
  message: string;
  status: 'new' | 'contacted' | 'enrolled' | 'declined';
  created_at: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  read: boolean;
  created_at: string;
};

export type CenterEvent = {
  id: string;
  title: string;
  description: string;
  event_date: string;
  start_time: string | null;
  end_time: string | null;
  location: string;
  category: 'school_event' | 'holiday' | 'parent_event' | 'field_trip' | 'closed';
  all_day: boolean;
  published: boolean;
  created_at: string;
};

export type SiteAnnouncement = {
  id: string;
  banner_text: string;
  show_banner: boolean;
  flyer_url: string;
  show_popup: boolean;
  starts_on: string | null;
  ends_on: string | null;
  updated_at: string;
};

export type GalleryPhoto = {
  id: string;
  title: string;
  caption: string;
  image_url: string;
  display_order: number;
  published: boolean;
  created_at: string;
};
