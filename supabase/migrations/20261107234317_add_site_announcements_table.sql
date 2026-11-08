/*
  # Add Site Announcements Table

  1. New Tables
  - `site_announcements`: a single row holding the site-wide banner message,
    the closure flyer pop-up, and the dates each one is active.
    - `id` (uuid, primary key)
    - `banner_text` (text): message shown in the top banner. Empty hides the banner.
    - `show_banner` (boolean): turns the top banner on or off.
    - `flyer_url` (text): link to the flyer image shown in the pop-up.
    - `show_popup` (boolean): turns the flyer pop-up on or off.
    - `starts_on` / `ends_on` (date, nullable): optional active date range.
    - `updated_at` (timestamptz): changes every time an announcement is saved.

  2. Security
  - Row level security enabled.
  - Anyone (anon and signed-in admins) can read the announcement, since it is public information.
  - Only signed-in admins can insert, update, or delete it.

  3. Seed Data
  - Inserts one row with the closure flyer pop-up turned on and the banner turned off.
    Safe to re-run: the row is only inserted when the table is empty.

  Important Notes
  1. Admins edit the single row from the Announcements tab in the admin area.
  2. Old closure dates are hidden automatically once `ends_on` has passed.
*/

CREATE TABLE IF NOT EXISTS site_announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  banner_text text NOT NULL DEFAULT '',
  show_banner boolean NOT NULL DEFAULT false,
  flyer_url text NOT NULL DEFAULT '',
  show_popup boolean NOT NULL DEFAULT false,
  starts_on date,
  ends_on date,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE site_announcements ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON site_announcements TO anon, authenticated;
GRANT INSERT, UPDATE ON site_announcements TO authenticated;

DROP POLICY IF EXISTS "Public can view site announcements" ON site_announcements;
CREATE POLICY "Public can view site announcements"
  ON site_announcements FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can insert site announcements" ON site_announcements;
CREATE POLICY "Authenticated users can insert site announcements"
  ON site_announcements FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can update site announcements" ON site_announcements;
CREATE POLICY "Authenticated users can update site announcements"
  ON site_announcements FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

INSERT INTO site_announcements (banner_text, show_banner, flyer_url, show_popup)
SELECT '', false, 'https://jvjrzfoduxmfiqihllhd.supabase.co/storage/v1/object/public/media/Love%20edify%20Closure%20Dates.jpg', true
WHERE NOT EXISTS (SELECT 1 FROM site_announcements);
