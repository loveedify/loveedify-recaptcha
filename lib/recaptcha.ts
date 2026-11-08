'use client';

export const RECAPTCHA_SITE_KEY = '6LdFmxUuAAAAAC20NukomGmTJoxZzJ0o19c-1Fd1';

type Grecaptcha = {
  ready: (callback: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
};

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

let scriptPromise: Promise<void> | null = null;

function loadRecaptchaScript(): Promise<void> {
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.onload = () => {
      if (!window.grecaptcha) {
        reject(new Error('reCAPTCHA did not initialize'));
        return;
      }
      window.grecaptcha.ready(() => resolve());
    };
    script.onerror = () => {
      scriptPromise = null;
      script.remove();
      reject(new Error('reCAPTCHA failed to load'));
    };
    document.head.appendChild(script);
  });

  return scriptPromise;
}

export async function getRecaptchaToken(action: string): Promise<string> {
  await loadRecaptchaScript();
  if (!window.grecaptcha) throw new Error('reCAPTCHA is not available');
  return window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action });
}
