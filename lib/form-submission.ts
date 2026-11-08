'use client';

import { getRecaptchaToken } from '@/lib/recaptcha';

const GENERIC_ERROR = 'Something went wrong. Please try again or call us directly.';

export type ProtectedSubmitResult =
  | { ok: true }
  | { ok: false; code?: string; message: string };

export async function submitProtectedForm(
  formType: string,
  data: Record<string, unknown> = {}
): Promise<ProtectedSubmitResult> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  try {
    const recaptchaToken = await getRecaptchaToken(formType);

    const response = await fetch(`${supabaseUrl}/functions/v1/submit-form`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${anonKey}`,
        apikey: anonKey ?? '',
      },
      body: JSON.stringify({ formType, recaptchaToken, data }),
    });

    const body = await response.json().catch(() => null);

    if (response.ok && body?.ok === true) return { ok: true };

    return {
      ok: false,
      code: typeof body?.code === 'string' ? body.code : undefined,
      message: typeof body?.error === 'string' ? body.error : GENERIC_ERROR,
    };
  } catch {
    return { ok: false, message: GENERIC_ERROR };
  }
}
