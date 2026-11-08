'use client';

import { useState, useEffect } from 'react';
import { supabase, type CenterEvent } from '@/lib/supabase';

type Props = {
  event: CenterEvent | null;
  onSaved: () => void;
};

const CATEGORIES = [
  { value: 'school_event', label: 'School Event' },
  { value: 'holiday', label: 'Holiday' },
  { value: 'parent_event', label: 'Parent Event' },
  { value: 'field_trip', label: 'Field Trip' },
  { value: 'closed', label: 'Center Closed' },
];

const blankForm = {
  title: '',
  description: '',
  event_date: '',
  start_time: '',
  end_time: '',
  location: '',
  category: 'school_event' as CenterEvent['category'],
  all_day: true,
  published: false,
};

export default function AdminEventForm({ event, onSaved }: Props) {
  const [form, setForm] = useState(blankForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (event) {
      setForm({
        title: event.title,
        description: event.description,
        event_date: event.event_date,
        start_time: event.start_time ?? '',
        end_time: event.end_time ?? '',
        location: event.location,
        category: event.category,
        all_day: event.all_day,
        published: event.published,
      });
    } else {
      setForm(blankForm);
    }
  }, [event]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const payload = {
      ...form,
      start_time: form.all_day ? null : form.start_time || null,
      end_time: form.all_day ? null : form.end_time || null,
    };

    const { error: dbError } = event
      ? await supabase.from('center_events').update(payload).eq('id', event.id)
      : await supabase.from('center_events').insert(payload);

    setLoading(false);

    if (dbError) {
      setError('Something went wrong. Please try again.');
    } else {
      onSaved();
    }
  };

  const inputClass =
    'w-full px-4 py-3 rounded-[14px] border border-cream-100 bg-cream font-inter text-sm text-charcoal placeholder:text-muted-gray focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent';

  return (
    <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto">
      {/* Title */}
      <div>
        <label className="block text-sm font-inter font-medium text-charcoal mb-1.5">
          Event Title <span className="text-golden-500">*</span>
        </label>
        <input
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          required
          placeholder="e.g. Spring Field Trip"
          className={inputClass}
        />
      </div>

      {/* Date + Category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-inter font-medium text-charcoal mb-1.5">
            Event Date <span className="text-golden-500">*</span>
          </label>
          <input
            name="event_date"
            type="date"
            value={form.event_date}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-inter font-medium text-charcoal mb-1.5">
            Category
          </label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className={inputClass}
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* All Day toggle */}
      <div className="flex items-center gap-3">
        <input
          id="all_day"
          name="all_day"
          type="checkbox"
          checked={form.all_day}
          onChange={handleChange}
          className="w-4 h-4 accent-forest-500"
        />
        <label htmlFor="all_day" className="font-inter text-sm text-charcoal cursor-pointer">
          All day event
        </label>
      </div>

      {/* Time fields (only when not all day) */}
      {!form.all_day && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-inter font-medium text-charcoal mb-1.5">
              Start Time
            </label>
            <input
              name="start_time"
              type="time"
              value={form.start_time}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-inter font-medium text-charcoal mb-1.5">
              End Time
            </label>
            <input
              name="end_time"
              type="time"
              value={form.end_time}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>
      )}

      {/* Location */}
      <div>
        <label className="block text-sm font-inter font-medium text-charcoal mb-1.5">
          Location
        </label>
        <input
          name="location"
          type="text"
          value={form.location}
          onChange={handleChange}
          placeholder="e.g. Main Hall, Outdoor Playground"
          className={inputClass}
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-inter font-medium text-charcoal mb-1.5">
          Description
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          placeholder="Additional details about this event..."
          className={`${inputClass} rounded-2xl resize-none`}
        />
      </div>

      {/* Published */}
      <div className="flex items-center gap-3 pt-1">
        <input
          id="published"
          name="published"
          type="checkbox"
          checked={form.published}
          onChange={handleChange}
          className="w-4 h-4 accent-forest-500"
        />
        <label htmlFor="published" className="font-inter text-sm text-charcoal cursor-pointer">
          Publish (visible to parents on the calendar)
        </label>
      </div>

      {error && <p className="text-red-500 text-sm font-inter">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full text-sm disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? 'Saving...' : event ? 'Update Event' : 'Create Event'}
      </button>
    </form>
  );
}
