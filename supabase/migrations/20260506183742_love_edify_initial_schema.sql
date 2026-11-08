/*
  # Love Edify Child Care Services - Initial Schema

  ## Overview
  Sets up the core database tables for the Love Edify website backend.

  ## New Tables

  ### 1. `inspirational_posts`
  Stores devotional messages, scripture cards, and uplifting content managed via the admin dashboard.
  - `id` - unique identifier
  - `title` - post title
  - `content` - main body text
  - `scripture_reference` - optional Bible verse reference (e.g. "Proverbs 22:6")
  - `scripture_text` - the actual verse text
  - `category` - type of post (devotional, scripture, message, newsletter)
  - `published` - whether post is publicly visible
  - `featured` - whether to feature on the Inspirational Corner page
  - `created_at` / `updated_at` - timestamps

  ### 2. `newsletter_subscribers`
  Stores email addresses for the newsletter mailing list.
  - `id` - unique identifier
  - `email` - subscriber email (unique)
  - `name` - optional subscriber name
  - `subscribed_at` - when they subscribed
  - `active` - subscription status

  ### 3. `prayer_requests`
  Stores prayer request submissions from families.
  - `id` - unique identifier
  - `name` - requester name
  - `email` - optional contact email
  - `request` - the prayer request text
  - `is_private` - whether to keep confidential (not display publicly)
  - `is_answered` - admin can mark as answered
  - `created_at` - submission timestamp

  ### 4. `enrollment_inquiries`
  Stores enrollment form submissions.
  - `id` - unique identifier
  - `parent_name` - parent/guardian name
  - `email` - contact email
  - `phone` - contact phone
  - `child_name` - child's name
  - `child_dob` - child's date of birth
  - `program_interest` - which program they're interested in
  - `start_date` - desired start date
  - `message` - additional notes
  - `status` - inquiry status (new, contacted, enrolled, declined)
  - `created_at` - submission timestamp

  ### 5. `contact_messages`
  Stores general contact form submissions.
  - `id` - unique identifier
  - `name` - sender name
  - `email` - sender email
  - `phone` - optional phone
  - `subject` - message subject
  - `message` - message body
  - `read` - whether admin has read it
  - `created_at` - submission timestamp

  ## Security
  - RLS enabled on all tables
  - Public INSERT allowed for submissions (prayer requests, enrollment, contact, newsletter)
  - Public SELECT allowed only for non-private, published content
  - Admin access via service role
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
  USING (published = true);

CREATE POLICY "Service role can insert posts"
  ON inspirational_posts FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can update posts"
  ON inspirational_posts FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can delete posts"
  ON inspirational_posts FOR DELETE
  TO service_role
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
  WITH CHECK (true);

CREATE POLICY "Service role can view subscribers"
  ON newsletter_subscribers FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Service role can update subscribers"
  ON newsletter_subscribers FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can delete subscribers"
  ON newsletter_subscribers FOR DELETE
  TO service_role
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
  WITH CHECK (true);

CREATE POLICY "Anyone can read non-private prayer requests"
  ON prayer_requests FOR SELECT
  USING (is_private = false);

CREATE POLICY "Service role can update prayer requests"
  ON prayer_requests FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can delete prayer requests"
  ON prayer_requests FOR DELETE
  TO service_role
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
  WITH CHECK (true);

CREATE POLICY "Service role can view enrollment inquiries"
  ON enrollment_inquiries FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Service role can update enrollment inquiries"
  ON enrollment_inquiries FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can delete enrollment inquiries"
  ON enrollment_inquiries FOR DELETE
  TO service_role
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
  WITH CHECK (true);

CREATE POLICY "Service role can view contact messages"
  ON contact_messages FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Service role can update contact messages"
  ON contact_messages FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can delete contact messages"
  ON contact_messages FOR DELETE
  TO service_role
  USING (true);

-- Seed some inspirational posts
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
