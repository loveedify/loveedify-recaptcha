/*
  # Add Gallery Photos Table

  ## Summary
  Creates a new table for managing daycare photo gallery images displayed on the About page.

  ## New Tables

  ### `gallery_photos`
  Stores individual photos for the public-facing gallery slideshow.

  - `id` (uuid, PK) - Unique identifier
  - `title` (text) - Optional photo title
  - `caption` (text) - Optional descriptive caption shown in the slideshow
  - `image_url` (text, NOT NULL) - Full URL of the hosted image
  - `display_order` (integer) - Controls sort order in the gallery; lower numbers appear first
  - `published` (boolean) - Whether this photo is visible to the public
  - `created_at` (timestamptz) - Record creation timestamp

  ## Security

  - RLS enabled on `gallery_photos`
  - Policy 1: Anyone (public) can SELECT photos where published = true
  - Policy 2: Authenticated admin users can SELECT all photos (including unpublished)
  - Policy 3: Authenticated users can INSERT new photos
  - Policy 4: Authenticated users can UPDATE existing photos
  - Policy 5: Authenticated users can DELETE photos

  ## Notes

  - Image URLs reference externally hosted images (Unsplash, Wix, etc.)
  - display_order defaults to 0; ties are broken by created_at
*/

CREATE TABLE IF NOT EXISTS gallery_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  caption text NOT NULL DEFAULT '',
  image_url text NOT NULL,
  display_order integer NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE gallery_photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published gallery photos"
  ON gallery_photos FOR SELECT
  TO anon
  USING (published = true);

CREATE POLICY "Authenticated can view all gallery photos"
  ON gallery_photos FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can insert gallery photos"
  ON gallery_photos FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated can update gallery photos"
  ON gallery_photos FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated can delete gallery photos"
  ON gallery_photos FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);

CREATE INDEX IF NOT EXISTS gallery_photos_display_order_idx ON gallery_photos (display_order, created_at);

INSERT INTO gallery_photos (title, caption, image_url, display_order, published) VALUES
  ('Classroom Learning', 'Children engaged in hands-on learning activities', 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&q=80', 1, true),
  ('Story Time', 'Our teachers bring stories to life every day', 'https://images.unsplash.com/photo-1524503033411-c9566986fc8f?w=1200&q=80', 2, true),
  ('Art & Creativity', 'Nurturing creativity through art and expression', 'https://images.unsplash.com/photo-1560541718-5f1a2a7c1ddd?w=1200&q=80', 3, true),
  ('Outdoor Play', 'Healthy outdoor time every day', 'https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=1200&q=80', 4, true),
  ('Music & Movement', 'Learning through music and joyful movement', 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=1200&q=80', 5, true),
  ('Reading Corner', 'A love of reading starts early', 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&q=80', 6, true);
