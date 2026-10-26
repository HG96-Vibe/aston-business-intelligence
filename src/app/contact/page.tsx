import type { Metadata } from "next";
import { site } from "@/lib/site";
import { PageHero, Section } from "@/components/ui";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Aston Business Intelligence. We reply to every enquiry within one working day.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us what's slow, broken or unclear"
        intro="A 30-minute conversation is usually enough to tell you whether we can help and what it would involve. No pitch deck."
      />
      <Section>
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
