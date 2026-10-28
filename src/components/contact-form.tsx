"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { services, budgetRanges } from "@/data/services";
import { trackEvent } from "@/lib/analytics/track";

type Status = "idle" | "submitting" | "success" | "error";

interface FormState {
  name: string;
  email: string;
  website: string;
  service: string;
  budget: string;
  message: string;
  consent: boolean;
  company_website: string; // honeypot — real users never see or fill this
}

const initialState: FormState = {
  name: "",
  email: "",
  website: "",
  service: "",
  budget: "",
  message: "",
  consent: false,
  company_website: "",
};

export function ContactForm({ defaultService = "" }: { defaultService?: string }) {
  const [form, setForm] = useState<FormState>({ ...initialState, service: defaultService });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data: { ok?: boolean; error?: string } = await response.json().catch(() => ({}));

      if (response.ok && data.ok) {
        setStatus("success");
        trackEvent("contact_submit", { service: form.service || "unspecified" });
        setForm({ ...initialState });
      } else {
        setStatus("error");
        setErrorMessage(
          data.error ??
            "Something went wrong sending your message. Please try again in a moment."
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage(
        "We could not reach the server. Check your connection and try again."
      );
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-xl border border-green-200 bg-green-50 p-8 text-center"
        role="status"
      >
        <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" aria-hidden="true" />
        <h2 className="mt-4 text-xl font-semibold text-ink">
          Message received — thank you!
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-ink-soft">
          We read every inquiry personally and reply within 2 business days, usually
          sooner. Check your spam folder if you have not heard from us by then.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-6"
          onClick={() => setStatus("idle")}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate={false} className="rounded-xl border border-line bg-surface p-6 shadow-sm sm:p-8">
      {/* Honeypot — hidden from humans, irresistible to bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company_website">Company website</label>
        <input
          id="company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.company_website}
          onChange={(event) => update("company_website", event.target.value)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="text-sm font-medium text-ink">
            Name <span className="text-accent" aria-hidden="true">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            required
            maxLength={100}
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            className="mt-1.5 h-11 w-full rounded-lg border border-line bg-surface px-4 text-sm text-ink focus:border-accent focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="text-sm font-medium text-ink">
            Email <span className="text-accent" aria-hidden="true">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            required
            maxLength={200}
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
            className="mt-1.5 h-11 w-full rounded-lg border border-line bg-surface px-4 text-sm text-ink focus:border-accent focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="contact-website" className="text-sm font-medium text-ink">
            Business or website URL <span className="text-ink-faint">(optional)</span>
          </label>
          <input
            id="contact-website"
            type="url"
            maxLength={300}
            placeholder="https://…"
            value={form.website}
            onChange={(event) => update("website", event.target.value)}
            className="mt-1.5 h-11 w-full rounded-lg border border-line bg-surface px-4 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="contact-service" className="text-sm font-medium text-ink">
            Requested service <span className="text-accent" aria-hidden="true">*</span>
          </label>
          <select
            id="contact-service"
            required
            value={form.service}
            onChange={(event) => update("service", event.target.value)}
            className="mt-1.5 h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm text-ink focus:border-accent focus:outline-none"
          >
            <option value="" disabled>
              Select a service…
            </option>
            {services.map((service) => (
              <option key={service.slug} value={service.slug}>
                {service.name} — ${service.price}
              </option>
            ))}
            <option value="other">Something else / not sure</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="contact-budget" className="text-sm font-medium text-ink">
            Budget range <span className="text-ink-faint">(optional)</span>
          </label>
          <select
            id="contact-budget"
            value={form.budget}
            onChange={(event) => update("budget", event.target.value)}
            className="mt-1.5 h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm text-ink focus:border-accent focus:outline-none sm:max-w-xs"
          >
            <option value="">Prefer not to say</option>
            {budgetRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="contact-message" className="text-sm font-medium text-ink">
            Project description <span className="text-accent" aria-hidden="true">*</span>
          </label>
          <textarea
            id="contact-message"
            required
            minLength={20}
            maxLength={3000}
            rows={6}
            value={form.message}
            onChange={(event) => update("message", event.target.value)}
            placeholder="What do you need done? Include your website URL if you have one, and any deadlines."
            className="mt-1.5 w-full resize-y rounded-lg border border-line bg-surface p-4 text-sm leading-6 text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
          />
          <p className="mt-1 text-xs text-ink-faint">
            {form.message.length}/3000 characters
          </p>
        </div>
        <div className="sm:col-span-2">
          <label className="flex items-start gap-2.5 text-sm text-ink-soft">
            <input
              type="checkbox"
              required
              checked={form.consent}
              onChange={(event) => update("consent", event.target.checked)}
              className="mt-0.5 h-4 w-4 accent-[#7c3aed]"
            />
            <span>
              I agree that my details are used to respond to my inquiry, as described
              in the{" "}
              <a href="/privacy-policy" className="font-medium text-accent hover:underline">
                privacy policy
              </a>
              . <span className="text-accent" aria-hidden="true">*</span>
            </span>
          </label>
        </div>
      </div>

      {status === "error" && (
        <p
          role="alert"
          className="mt-5 rounded-lg border border-red-200 bg-red-50 p-3.5 text-sm text-red-800"
        >
          {errorMessage}
        </p>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={status === "submitting"}>
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              Send message
              <Send className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </Button>
        <p className="text-xs text-ink-faint">
          We reply within 2 business days. Your details are never shared or published.
        </p>
      </div>
    </form>
  );
}
 