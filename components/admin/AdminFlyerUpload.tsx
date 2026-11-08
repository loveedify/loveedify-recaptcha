'use client';

import { useRef, useState } from 'react';
import { ImagePlus, Loader2, Trash2, AlertCircle } from 'lucide-react';
import { uploadFlyerImage } from '@/lib/flyer-upload';

type Props = {
  value: string;
  onChange: (url: string) => void;
};

export default function AdminFlyerUpload({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    setUploading(true);
    setError('');
    const result = await uploadFlyerImage(file);
    setUploading(false);

    if ('error' in result) {
      setError(result.error);
      return;
    }
    onChange(result.url);
  }

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
        aria-label="Choose flyer image"
      />

      {value ? (
        <div className="relative rounded-2xl overflow-hidden border border-cream-100 bg-cream">
          <img src={value} alt="Current flyer preview" className="w-full max-h-72 object-contain block" />
          {uploading && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
              <Loader2 className="w-6 h-6 text-forest-500 animate-spin" />
            </div>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-full rounded-2xl border-2 border-dashed border-cream-100 bg-cream hover:border-forest-400 transition-colors py-10 flex flex-col items-center gap-2 disabled:opacity-60"
        >
          {uploading ? (
            <Loader2 className="w-6 h-6 text-forest-500 animate-spin" />
          ) : (
            <ImagePlus className="w-6 h-6 text-forest-500" />
          )}
          <span className="font-inter text-sm text-charcoal">
            {uploading ? 'Uploading flyer...' : 'Choose a flyer image'}
          </span>
          <span className="font-inter text-xs text-muted-gray">JPG, PNG, or WebP up to 5 MB</span>
        </button>
      )}

      <div className="flex flex-wrap items-center gap-2">
        {value && (
          <>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="btn-secondary text-sm px-4 py-2 inline-flex items-center gap-1.5 disabled:opacity-60"
            >
              <ImagePlus className="w-4 h-4" />
              Replace image
            </button>
            <button
              type="button"
              onClick={() => onChange('')}
              disabled={uploading}
              className="text-sm px-4 py-2 inline-flex items-center gap-1.5 rounded-xl text-red-600 hover:bg-red-50 transition-colors disabled:opacity-60"
            >
              <Trash2 className="w-4 h-4" />
              Remove
            </button>
          </>
        )}
      </div>

      {error && (
        <p className="flex items-center gap-1.5 text-red-500 text-sm font-inter">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
