import { Shield } from 'lucide-react';

export default function RecaptchaNotice() {
  return (
    <p className="flex items-center justify-center gap-1.5 text-muted-gray text-xs font-inter text-center">
      <Shield className="w-3 h-3 shrink-0" />
      <span>
        Protected by reCAPTCHA. The Google{' '}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-forest-500 transition-colors"
        >
          Privacy Policy
        </a>{' '}
        and{' '}
        <a
          href="https://policies.google.com/terms"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-forest-500 transition-colors"
        >
          Terms of Service
        </a>{' '}
        apply.
      </span>
    </p>
  );
}
