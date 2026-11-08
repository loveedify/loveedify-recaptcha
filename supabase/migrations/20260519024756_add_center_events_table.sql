/*
  # Add Center Events Table

  ## Summary
  Creates a new table for managing center events displayed on the Parent Resources Events Calendar.

  ## New Tables

  ### `center_events`
  Stores all center events (holidays, school events, field trips, parent events, and closures).

  | Column        | Type      | Description                                              |
  |---------------|-----------|----------------------------------------------------------|
  | id            | uuid      | Primary key                                              |
  | title         | text      | Event title (required)                                   |
  | description   | text      | Optional longer description                              |
  | event_date    | date      | The date of the event (required)                         |
  | start_time    | time      | Optional start time (null when all_day = true)           |
  | end_time      | time      | Optional end time (null when all_day = true)             |
  | location      | text      | Optional event location                                  |
  | category      | text      | One of: school_event, holiday, parent_event, field_trip, closed |
  | all_day       | boolean   | Whether the event spans the entire day                   |
  | published     | boolean   | Whether event is visible to the public                   |
  | created_at    | timestamptz | Timestamp of creation                                  |

  ## Security
  - RLS enabled
  - Public SELECT for published events
  - No public INSERT/UPDATE/DELETE (admin only via service role)
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
  ON center_events
  FOR SELECT
  TO anon, authenticated
  USING (published = true);
