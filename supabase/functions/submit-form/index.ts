import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const MIN_SCORE = 0.5;

type FormConfig = {
  table: string;
  fields: string[];
  required: string[];
  maxLength: number;
};

const FORMS: Record<string, FormConfig> = {
  contact: {
    table: "contact_messages",
    fields: ["name", "email", "phone", "subject", "message"],
    required: ["name", "email", "subject", "message"],
    maxLength: 5000,
  },
  enrollment: {
    table: "enrollment_inquiries",
    fields: [
      "parent_name",
      "email",
      "phone",
      "child_name",
      "child_dob",
      "program_interest",
      "start_date",
      "message",
    ],
    required: ["parent_name", "email", "child_name", "program_interest"],
    maxLength: 5000,
  },
  prayer: {
    table: "prayer_requests",
    fields: ["name", "email", "request", "is_private"],
    required: ["request"],
    maxLength: 5000,
  },
  newsletter: {
    table: "newsletter_subscribers",
    fields: ["email", "name"],
    required: ["email"],
    maxLength: 320,
  },
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitizeData(config: FormConfig, raw: unknown): Record<string, unknown> | null {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const input = raw as Record<string, unknown>;
  const output: Record<string, unknown> = {};

  for (const field of config.fields) {
    const value = input[field];
    if (field === "is_private") {
      output[field] = value === true;
      continue;
    }
    if (value === undefined || value === null || value === "") {
      output[field] = null;
      continue;
    }
    if (typeof value !== "string") return null;
    const trimmed = value.trim();
    if (trimmed.length > config.maxLength) return null;
    output[field] = trimmed === "" ? null : trimmed;
  }

  for (const field of config.required) {
    if (typeof output[field] !== "string" || output[field] === "") return null;
  }

  if (typeof output.email === "string" && !EMAIL_PATTERN.test(output.email)) return null;

  return output;
}

async function verifyRecaptcha(token: string, action: string) {
  const secret = Deno.env.get("RECAPTCHA_SECRET_KEY");
  if (!secret) throw new Error("RECAPTCHA_SECRET_KEY is not configured");

  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token }),
  });

  if (!response.ok) throw new Error(`reCAPTCHA verification failed (${response.status})`);

  const result = await response.json();
  if (typeof result?.success !== "boolean") throw new Error("Unexpected reCAPTCHA response");

  return {
    passed: result.success === true && result.action === action && typeof result.score === "number" && result.score >= MIN_SCORE,
    score: typeof result.score === "number" ? result.score : null,
    reason: !result.success
      ? `rejected by reCAPTCHA: ${(result["error-codes"] ?? []).join(", ") || "unknown"}`
      : result.action !== action
        ? "action mismatch"
        : typeof result.score === "number" && result.score < MIN_SCORE
          ? "low score"
          : "passed",
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);

    const body = await req.json().catch(() => null);
    const formType = typeof body?.formType === "string" ? body.formType : "";
    const token = typeof body?.recaptchaToken === "string" ? body.recaptchaToken : "";

    if (!token) return jsonResponse({ error: "Missing verification token" }, 400);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const isAdminLogin = formType === "admin_login";
    const config = FORMS[formType];
    if (!isAdminLogin && !config) return jsonResponse({ error: "Unknown form" }, 400);

    const data = isAdminLogin ? {} : sanitizeData(config, body?.data);
    if (!data) return jsonResponse({ error: "Please check the form and try again." }, 400);

    const check = await verifyRecaptcha(token, formType);

    if (!check.passed) {
      await supabase.from("form_submission_blocks").insert({
        form_type: formType,
        score: check.score,
        reason: check.reason,
      });
      return jsonResponse(
        { error: "We could not verify this submission. Please try again or call the center directly." },
        403,
      );
    }

    if (isAdminLogin) return jsonResponse({ ok: true });

    const { error: dbError } = await supabase.from(config.table).insert(data);

    if (dbError) {
      if (dbError.code === "23505") {
        return jsonResponse({ error: "duplicate", code: "duplicate" }, 409);
      }
      console.error("Insert failed:", dbError.message);
      return jsonResponse({ error: "Something went wrong. Please try again or call us directly." }, 500);
    }

    return jsonResponse({ ok: true });
  } catch (err) {
    console.error("submit-form error:", err);
    return jsonResponse({ error: "Something went wrong. Please try again or call us directly." }, 500);
  }
});
