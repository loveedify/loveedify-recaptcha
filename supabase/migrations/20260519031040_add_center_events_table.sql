/*
  # Add Center Events Table

  Creates the center_events table for the Parent Resources Events Calendar.
  Authenticated admins have full CRUD access; public can read published events.
*/

CREATE TABLE IF NOT EXISTS center_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  event_date date NOT NULL,
  start_time time,
  end_time time,
  location text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'school_event',
  all_day boolean NOT NULL DEFAULT true,
  published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE center_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published events"
  ON center_events FOR SELECT
  TO anon, authenticated
  USING (published = true);

CREATE POLICY "Authenticated users can view all events"
  ON center_events FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert events"
  ON center_events FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update events"
  ON center_events FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete events"
  ON center_events FOR DELETE
  TO authenticated
  USING (true);
