import type { Metadata } from "next";
import { site } from "@/lib/site";
import { LegalPage } from "@/components/legal";

export const metadata: Metadata = { title: "Privacy policy" };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" updated="26 October 2026">
      <p>
        {site.name} Ltd (&ldquo;ABI&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is the data controller for personal data collected through this website. We are registered in England and Wales under company number {site.companyNumber}, registered office {site.registeredOffice}. You can contact us about privacy at {site.emails.hello}.
      </p>

      <h2>What we collect and why</h2>
      <p><strong>Contact form.</strong> Name, email, company, phone (optional) and your message. We use this to reply to your enquiry and, if you become a client, to manage our relationship. Legal basis: our legitimate interest in responding to enquiries, and performance of a contract where one follows.</p>
      <p><strong>Careers form.</strong> Name, email, LinkedIn URL, area of interest, experience level, your message and your CV. We use this to assess suitability for work with ABI and to contact you about opportunities. Legal basis: our legitimate interest in recruiting, and steps taken at your request prior to entering a contract. We keep applications for 12 months unless you ask us to delete them sooner.</p>
      <p><strong>Website usage.</strong> Our hosting provider records standard server logs (IP address, browser, pages requested) for security and performance.</p>

      <h2 id="cookies">Cookies and similar storage</h2>
      <p><strong>Essential.</strong> We store your display preference (day or night mode) and your cookie choice in your browser&rsquo;s local storage. These are necessary for the site to work as you&rsquo;ve asked and need no consent.</p>
      <p><strong>Analytics (optional).</strong> If you accept analytics in the banner, we may set cookies to measure how the site is used &mdash; pages visited, approximate location, device type. We use this to improve the site, never for advertising. You can withdraw consent at any time using the &ldquo;Cookie settings&rdquo; link in the footer; we will then stop setting analytics cookies and you can delete existing ones in your browser.</p>
      <p>We do not use advertising or cross-site tracking cookies.</p>

      <h2>Who we share it with</h2>
      <ul>
        <li>Vercel Inc. — website hosting (servers in the EU/US under standard contractual clauses).</li>
        <li>Resend — delivery of form submissions to our inbox.</li>
        <li>Our email and document providers, to store and respond to your message.</li>
        <li>Professional advisers, regulators or law enforcement where required by law.</li>
      </ul>
      <p>We do not sell personal data.</p>

      <h2>International transfers</h2>
      <p>Some providers process data outside the UK. Where they do, transfers are covered by the UK International Data Transfer Agreement or the UK Addendum to EU Standard Contractual Clauses.</p>

      <h2>How long we keep it</h2>
      <p>Enquiries: up to 2 years after our last contact. Applications: 12 months. Client records: for the duration of the engagement and 6 years afterwards for legal and accounting purposes.</p>

      <h2>Your rights</h2>
      <p>Under UK GDPR you can ask us to access, correct, delete or restrict the personal data we hold about you, object to our processing, or ask for a copy in a portable format. Email {site.emails.hello} and we will respond within one month. You can also complain to the Information Commissioner&rsquo;s Office at ico.org.uk.</p>

      <h2>Changes</h2>
      <p>We will update this page if our practices change and show the date of the latest version above.</p>
    </LegalPage>
  );
}
