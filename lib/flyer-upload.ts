import { supabase } from '@/lib/supabase';

const FLYER_BUCKET = 'media';
const FLYER_FOLDER = 'flyers';
const FLYER_MAX_BYTES = 5 * 1024 * 1024;
const FLYER_EXTENSIONS: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

export function validateFlyerFile(file: File): string | null {
  if (!FLYER_EXTENSIONS[file.type]) return 'Please choose a JPG, PNG, or WebP image.';
  if (file.size > FLYER_MAX_BYTES) return 'That image is larger than 5 MB. Please choose a smaller file.';
  return null;
}

export async function uploadFlyerImage(file: File): Promise<{ url: string } | { error: string }> {
  const validationError = validateFlyerFile(file);
  if (validationError) return { error: validationError };

  const path = `${FLYER_FOLDER}/${Date.now()}-${crypto.randomUUID()}.${FLYER_EXTENSIONS[file.type]}`;
  const { error } = await supabase.storage
    .from(FLYER_BUCKET)
    .upload(path, file, { contentType: file.type, cacheControl: '3600', upsert: false });

  if (error) return { error: 'The flyer could not be uploaded. Please try again.' };

  const { data } = supabase.storage.from(FLYER_BUCKET).getPublicUrl(path);
  return { url: data.publicUrl };
}
