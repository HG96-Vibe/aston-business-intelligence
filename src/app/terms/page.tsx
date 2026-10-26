import type { Metadata } from "next";
import { site } from "@/lib/site";
import { LegalPage } from "@/components/legal";

export const metadata: Metadata = { title: "Terms of use" };

export default function TermsPage() {
  return (
    <LegalPage title="Website terms of use" updated="26 October 2026">
      <p>
        This website is operated by {site.name} Ltd, company number {site.companyNumber}, registered office {site.registeredOffice}. By using the site you agree to these terms.
      </p>

      <h2>Information on this site</h2>
      <p>Content is provided for general information about our services. It is not advice and should not be relied on as such. We try to keep it accurate but make no warranty that it is complete or up to date.</p>

      <h2>Engaging our services</h2>
      <p>Any consultancy or project work is governed by a separate written agreement, proposal or statement of work. Nothing on this site constitutes an offer capable of acceptance.</p>

      <h2>Intellectual property</h2>
      <p>The text, design and graphics on this site belong to {site.name} Ltd unless stated otherwise. You may view and print pages for your own reference but may not reproduce them commercially without permission.</p>

      <h2>Links</h2>
      <p>Links to third-party sites are provided for convenience. We are not responsible for their content or privacy practices.</p>

      <h2>Liability</h2>
      <p>To the extent permitted by law, we exclude liability for any loss arising from use of this site. Nothing in these terms limits liability for death or personal injury caused by negligence, fraud, or anything else that cannot be excluded by law.</p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of England and Wales and subject to the exclusive jurisdiction of its courts.</p>

      <h2>Contact</h2>
      <p>Questions about these terms: {site.emails.hello}.</p>
    </LegalPage>
  );
}
