/*
# Protect public form submissions with reCAPTCHA

1. New Tables
- `form_submission_blocks`: a log of form submissions that were blocked by the reCAPTCHA check.
  - `id` (uuid, primary key)
  - `form_type` (text): which form was used (contact, enrollment, prayer, newsletter, admin_login)
  - `score` (numeric, nullable): the reCAPTCHA score returned by Google
  - `reason` (text): short description of why the submission was blocked
  - `created_at` (timestamptz)

2. Security
- Enable RLS on `form_submission_blocks`.
- Only the server-side submission function may write to the log.
- Signed-in admins may read the log. Public visitors cannot read or write it.
- Remove the public INSERT policies on `contact_messages`, `enrollment_inquiries`,
  `prayer_requests`, and `newsletter_subscribers`. Submissions now go through the
  protected submission function, which writes with server privileges after the check passes.
- Admin read/update/delete policies on those tables are left unchanged.

3. Important Notes
- Existing data is not modified.
- The public anon role can no longer insert directly into these four tables.
*/

CREATE TABLE IF NOT EXISTS form_submission_blocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  form_type text NOT NULL,
  score numeric,
  reason text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE form_submission_blocks ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON form_submission_blocks TO authenticated;
GRANT SELECT, INSERT ON form_submission_blocks TO service_role;

DROP POLICY IF EXISTS "Authenticated users can view blocked submissions" ON form_submission_blocks;
CREATE POLICY "Authenticated users can view blocked submissions"
ON form_submission_blocks FOR SELECT
TO authenticated
USING (true);

DROP POLICY IF EXISTS "Anyone can submit contact message" ON contact_messages;
DROP POLICY IF EXISTS "Anyone can submit enrollment inquiry" ON enrollment_inquiries;
DROP POLICY IF EXISTS "Anyone can submit prayer requests" ON prayer_requests;
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON newsletter_subscribers;

REVOKE INSERT ON contact_messages FROM anon;
REVOKE INSERT ON enrollment_inquiries FROM anon;
REVOKE INSERT ON prayer_requests FROM anon;
REVOKE INSERT ON newsletter_subscribers FROM anon;
