'use client';

import { useEffect, useState } from 'react';
import { supabase, type SiteAnnouncement } from '@/lib/supabase';
import { fetchSiteAnnouncement } from '@/lib/announcements';
import { Save, Check, AlertCircle } from 'lucide-react';

type FormState = {
  banner_text: string;
  show_banner: boolean;
  flyer_url: string;
  show_popup: boolean;
  starts_on: string;
  ends_on: string;
};

const emptyForm: FormState = {
  banner_text: '',
  show_banner: false,
  flyer_url: '',
  show_popup: false,
  starts_on: '',
  ends_on: '',
};

export default function AdminAnnouncementForm() {
  const [existing, setExisting] = useState<SiteAnnouncement | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<'idle' | 'saved' | 'error'>('idle');
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    fetchSiteAnnouncement().then((data) => {
      if (data) {
        setExisting(data);
        setForm({
          banner_text: data.banner_text,
          show_banner: data.show_banner,
          flyer_url: data.flyer_url,
          show_popup: data.show_popup,
          starts_on: data.starts_on ?? '',
          ends_on: data.ends_on ?? '',
        });
      } else {
        setLoadFailed(true);
      }
      setLoading(false);
    });
  }, []);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setStatus('idle');
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (form.starts_on && form.ends_on && form.ends_on < form.starts_on) {
      setStatus('error');
      return;
    }
    setSaving(true);
    const payload = {
      banner_text: form.banner_text.trim(),
      show_banner: form.show_banner,
      flyer_url: form.flyer_url.trim(),
      show_popup: form.show_popup,
      starts_on: form.starts_on || null,
      ends_on: form.ends_on || null,
      updated_at: new Date().toISOString(),
    };
    const { error } = existing
      ? await supabase.from('site_announcements').update(payload).eq('id', existing.id)
      : await supabase.from('site_announcements').insert(payload);
    setSaving(false);
    if (error) {
      setStatus('error');
      return;
    }
    setStatus('saved');
    const refreshed = await fetchSiteAnnouncement();
    if (refreshed) setExisting(refreshed);
  }

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-cream-100 bg-cream font-inter text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-forest-400';
  const labelClass = 'block font-inter font-medium text-sm text-charcoal mb-1.5';

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="w-8 h-8 border-2 border-forest-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (loadFailed) {
    return (
      <div className="bg-red-50 text-red-600 rounded-2xl p-4 font-inter text-sm flex items-center gap-2">
        <AlertCircle className="w-4 h-4 flex-shrink-0" />
        The announcement settings could not be loaded. Please refresh the page.
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <section className="bg-white rounded-2xl p-5 border border-cream-100 shadow-soft space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="font-poppins font-600 text-forest-500 text-base">Top Banner</h2>
            <p className="text-muted-gray font-inter text-xs mt-0.5">Shown across the top of every page.</p>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.show_banner}
              onChange={(e) => update('show_banner', e.target.checked)}
              className="w-4 h-4 accent-forest-500"
            />
            <span className="font-inter text-sm text-charcoal">Show</span>
          </label>
        </div>
        <div>
          <label htmlFor="banner_text" className={labelClass}>Banner message</label>
          <textarea
            id="banner_text"
            rows={2}
            value={form.banner_text}
            onChange={(e) => update('banner_text', e.target.value)}
            placeholder="e.g. We will be closed Monday, November 23 and Thursday, November 26 for the holiday."
            className={inputClass}
          />
        </div>
      </section>

      <section className="bg-white rounded-2xl p-5 border border-cream-100 shadow-soft space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="font-poppins font-600 text-forest-500 text-base">Flyer Pop-Up</h2>
            <p className="text-muted-gray font-inter text-xs mt-0.5">Opens once per visit when a family arrives.</p>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.show_popup}
              onChange={(e) => update('show_popup', e.target.checked)}
              className="w-4 h-4 accent-forest-500"
            />
            <span className="font-inter text-sm text-charcoal">Show</span>
          </label>
        </div>
        <div>
          <label htmlFor="flyer_url" className={labelClass}>Flyer image link</label>
          <input
            id="flyer_url"
            type="url"
            value={form.flyer_url}
            onChange={(e) => update('flyer_url', e.target.value)}
            placeholder="https://..."
            className={inputClass}
          />
        </div>
      </section>

      <section className="bg-white rounded-2xl p-5 border border-cream-100 shadow-soft">
        <h2 className="font-poppins font-600 text-forest-500 text-base mb-1">Active Dates</h2>
        <p className="text-muted-gray font-inter text-xs mb-4">
          Leave blank to keep it running. It hides automatically after the end date.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="starts_on" className={labelClass}>Show from</label>
            <input
              id="starts_on"
              type="date"
              value={form.starts_on}
              onChange={(e) => update('starts_on', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="ends_on" className={labelClass}>Show until</label>
            <input
              id="ends_on"
              type="date"
              value={form.ends_on}
              onChange={(e) => update('ends_on', e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </section>

      <div className="flex items-center justify-between gap-4">
        <div className="font-inter text-sm min-h-[20px]">
          {status === 'saved' && (
            <span className="flex items-center gap-1.5 text-sage-600"><Check className="w-4 h-4" /> Saved and live on the site</span>
          )}
          {status === 'error' && (
            <span className="flex items-center gap-1.5 text-red-500">
              <AlertCircle className="w-4 h-4" />
              {form.ends_on && form.starts_on && form.ends_on < form.starts_on
                ? 'The end date must be after the start date.'
                : 'Could not save. Please try again.'}
            </span>
          )}
        </div>
        <button
          type="submit"
          disabled={saving}
          className="btn-primary flex items-center gap-2 text-sm disabled:opacity-60"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : 'Save Announcements'}
        </button>
      </div>
    </form>
  );
}
