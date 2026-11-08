/*
  # Love Edify Child Care Services - Initial Schema

  ## Overview
  Sets up the core database tables for the Love Edify website backend.

  ## New Tables

  ### 1. `inspirational_posts`
  ### 2. `newsletter_subscribers`
  ### 3. `prayer_requests`
  ### 4. `enrollment_inquiries`
  ### 5. `contact_messages`

  ## Security
  - RLS enabled on all tables
  - Public INSERT allowed for submissions
  - Public SELECT for published content
  - Authenticated role has full access for admin dashboard
*/

-- Inspirational Posts
CREATE TABLE IF NOT EXISTS inspirational_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  content text NOT NULL DEFAULT '',
  scripture_reference text DEFAULT '',
  scripture_text text DEFAULT '',
  category text NOT NULL DEFAULT 'message',
  published boolean NOT NULL DEFAULT false,
  featured boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE inspirational_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published posts"
  ON inspirational_posts FOR SELECT
  TO anon, authenticated
  USING (published = true);

CREATE POLICY "Authenticated users can read all posts"
  ON inspirational_posts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert posts"
  ON inspirational_posts FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update posts"
  ON inspirational_posts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete posts"
  ON inspirational_posts FOR DELETE
  TO authenticated
  USING (true);

-- Newsletter Subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text DEFAULT '',
  subscribed_at timestamptz DEFAULT now(),
  active boolean NOT NULL DEFAULT true
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscribers FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view subscribers"
  ON newsletter_subscribers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update subscribers"
  ON newsletter_subscribers FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete subscribers"
  ON newsletter_subscribers FOR DELETE
  TO authenticated
  USING (true);

-- Prayer Requests
CREATE TABLE IF NOT EXISTS prayer_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  email text DEFAULT '',
  request text NOT NULL DEFAULT '',
  is_private boolean NOT NULL DEFAULT false,
  is_answered boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE prayer_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit prayer requests"
  ON prayer_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can read non-private prayer requests"
  ON prayer_requests FOR SELECT
  TO anon, authenticated
  USING (is_private = false);

CREATE POLICY "Authenticated users can read all prayer requests"
  ON prayer_requests FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update prayer requests"
  ON prayer_requests FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete prayer requests"
  ON prayer_requests FOR DELETE
  TO authenticated
  USING (true);

-- Enrollment Inquiries
CREATE TABLE IF NOT EXISTS enrollment_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_name text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  phone text DEFAULT '',
  child_name text NOT NULL DEFAULT '',
  child_dob date,
  program_interest text DEFAULT '',
  start_date date,
  message text DEFAULT '',
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE enrollment_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit enrollment inquiry"
  ON enrollment_inquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view enrollment inquiries"
  ON enrollment_inquiries FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update enrollment inquiries"
  ON enrollment_inquiries FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete enrollment inquiries"
  ON enrollment_inquiries FOR DELETE
  TO authenticated
  USING (true);

-- Contact Messages
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  phone text DEFAULT '',
  subject text DEFAULT '',
  message text NOT NULL DEFAULT '',
  read boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact message"
  ON contact_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view contact messages"
  ON contact_messages FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update contact messages"
  ON contact_messages FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete contact messages"
  ON contact_messages FOR DELETE
  TO authenticated
  USING (true);

-- Seed inspirational posts
INSERT INTO inspirational_posts (title, content, scripture_reference, scripture_text, category, published, featured)
VALUES
  (
    'Train Up a Child',
    'At Love Edify, we believe that every child is a gift from God, and it is our sacred responsibility to nurture their growth in faith, love, and learning. We are committed to walking alongside each family on this beautiful journey.',
    'Proverbs 22:6',
    'Train up a child in the way he should go; even when he is old he will not depart from it.',
    'scripture',
    true,
    true
  ),
  (
    'Love Never Fails',
    'Our ministry is built on the foundation of unconditional love — love that sees every child, encourages every family, and believes in the potential God has placed in each young heart.',
    '1 Corinthians 13:8',
    'Love never fails. But where there are prophecies, they will cease; where there are tongues, they will be stilled; where there is knowledge, it will pass away.',
    'devotional',
    true,
    true
  ),
  (
    'Children Are a Heritage',
    'We treasure every child entrusted to our care. Each morning they walk through our doors is an opportunity to plant seeds of faith, curiosity, and compassion that will grow throughout their lifetime.',
    'Psalm 127:3',
    'Children are a heritage from the Lord, offspring a reward from him.',
    'scripture',
    true,
    false
  ),
  (
    'Growing in Wisdom and Grace',
    'Just as Jesus grew in wisdom and stature, we provide an environment where children can develop intellectually, socially, emotionally, and spiritually — becoming all God created them to be.',
    'Luke 2:52',
    'And Jesus grew in wisdom and stature, and in favor with God and man.',
    'message',
    true,
    true
  );
