import type { Metadata } from "next";
import { site } from "@/lib/site";
import { PageHero, Section } from "@/components/ui";
import { ContactForm } from "./contact-form";
import { Availability } from "@/components/offers";
import { commercial } from "@/lib/offers";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Aston Business Intelligence. We reply to every enquiry within one working day.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us what's"
        em="slow, broken or unclear."
        intro="A 30-minute conversation is usually enough to tell you whether we can help and what it would involve. No pitch deck."
      />
      <Section>
        <div id="book" className="mb-12 grid scroll-mt-24 gap-6 rounded-md border border-accent/30 bg-accent-soft p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
          <div>
            <p className="marker">Fastest route</p>
            <h2 className="mt-3 text-2xl text-ink">Book a 30-minute conversation</h2>
            <p className="mt-2 max-w-xl font-light text-muted">Pick a slot that suits you. We&apos;ll ask about the problem, tell you whether we can help, and if so what it would cost. No preparation needed.</p>
            <div className="mt-4"><Availability /></div>
          </div>
          {commercial.bookingUrl ? (
            <a href={commercial.bookingUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-md bg-gold px-5 py-3 text-sm font-semibold text-ink hover:bg-gold-strong">Open the calendar ↗</a>
          ) : (
            <p className="rounded-md border border-line bg-paper px-4 py-3 text-sm text-muted">Online booking is being set up — use the form below and we&apos;ll offer times within one working day.</p>
          )}
        </div>
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
          <ContactForm />
          <aside className="grid content-start gap-8 text-sm">
            <div>
              <p className="eyebrow">Email</p>
              <a href={`mailto:${site.emails.hello}`} className="mt-2 block text-lg font-medium text-ink hover:underline">
                {site.emails.hello}
              </a>
              <p className="mt-1 text-muted">For new enquiries and general questions.</p>
            </div>
            <div>
              <p className="eyebrow">Careers</p>
              <p className="mt-2 text-body">
                Use the form on our <a href="/careers" className="underline">careers page</a> to join the talent pool.
              </p>
            </div>
            <div>
              <p className="eyebrow">Registered office</p>
              <p className="mt-2 text-body">{site.name} Ltd</p>
              <p className="text-body">{site.registeredOffice}</p>
              <p className="mt-1 text-muted">Company no. {site.companyNumber}</p>
            </div>
            <div>
              <p className="eyebrow">Response time</p>
              <p className="mt-2 text-body">Within one working day, Monday to Friday.</p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
