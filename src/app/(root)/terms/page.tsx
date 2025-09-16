import React from "react";

export const metadata = {
  title: "Terms & Conditions — Math Star",
  description: "Terms and Conditions for Math Star. Please read carefully.",
};

export default function TermsPage() {
  return (

    <div className="">
      <main className="max-w-7xl mx-auto p-8 prose space-y-12 mt-20">
        <h1 className="text-4xl font-bold font-Quicksand">Terms & Conditions</h1>
        <p><strong>Effective date:</strong> September 15, 2025</p>

        <section>
          <h2>1. Introduction</h2>
          <p>
            Welcome to <strong>Math Star</strong>. These Terms &amp; Conditions ("Terms")
            govern your access to and use of the Math Star website, applications and
            services (together, the "Service"). By using the Service you agree to be bound
            by these Terms.
          </p>
        </section>

        <section>
          <h2>2. Who we are / Contact</h2>
          <p>
            Math Star is operated by <em>[Your Company Name]</em>, registered in Germany.
            <br />
            Address: <em>[Street, City, Postal Code, Germany]</em>
            <br />
            Contact: <a href="mailto:hello@mathstar.example">hello@mathstar.example</a>
          </p>
        </section>

        <section>
          <h2>3. Definitions</h2>
          <ul>
            <li><strong>Account</strong> — Your user account for the Service.</li>
            <li><strong>Subscription</strong> — A paid recurring plan that grants access to paid features.</li>
            <li><strong>Free Trial</strong> — A limited-time trial offered prior to paid subscription billing.</li>
          </ul>
        </section>

        <section>
          <h2>4. Access & Eligibility</h2>
          <p>
            You must be at least 16 years old to use the Service. If you are under the
            applicable age in Germany for consenting to online terms, you may only use the
            Service with parental or guardian consent.
          </p>
        </section>

        <section>
          <h2>5. Account Registration</h2>
          <p>
            To use parts of the Service you must register for an Account. You are
            responsible for keeping your login credentials secure and for all activity
            that occurs under your Account.
          </p>
        </section>

        <section>
          <h2>6. Subscriptions, Payments & Free Trial</h2>
          <p>
            Certain features require a paid Subscription. Subscription fees, billing
            intervals and trial terms are displayed during signup and in your Account.
            Payment is processed by our payment provider (e.g., Stripe). By subscribing
            you authorize our payment provider to charge the payment method you provide.
          </p>
          <p>
            <strong>Free Trial:</strong> If you are offered a Free Trial, the trial period
            (e.g., 3 days) will be stated at signup. Unless you cancel before the trial
            ends, your chosen payment method will be charged automatically when the trial
            period ends.
          </p>
        </section>

        <section>
          <h2>7. Cancellation & Refunds</h2>
          <p>
            You may cancel your Subscription at any time through your Account. Cancellation
            prevents renewal but does not automatically entitle you to a refund for the
            current billing period unless otherwise stated. Refunds are handled according
            to our refund policy and applicable law.
          </p>
        </section>

        <section>
          <h2>8. Changes to the Service & Pricing</h2>
          <p>
            Math Star may modify or discontinue the Service (or features) and may change pricing.
            Reasonable notice will be provided where required by law.
          </p>
        </section>

        <section>
          <h2>9. User Conduct</h2>
          <p>
            You agree not to misuse the Service. Prohibited actions include:
          </p>
          <ul>
            <li>Decompiling, reverse engineering or attempting to extract source code.</li>
            <li>Using the Service for illegal purposes.</li>
            <li>Uploading harmful or infringing content.</li>
          </ul>
        </section>

        <section>
          <h2>10. Intellectual Property</h2>
          <p>
            All content, trademarks and intellectual property on the Service are owned or
            licensed by Math Star. You may not reproduce or distribute content without prior written consent.
          </p>
        </section>

        <section>
          <h2>11. Third-Party Services</h2>
          <p>
            We use third-party providers for payments, analytics and other services (for
            example Stripe). These providers have their own terms and privacy policies,
            which you should review.
          </p>
        </section>

        <section>
          <h2>12. Privacy & Data Protection</h2>
          <p>
            Our Privacy Policy explains how we collect and use personal data. Where we
            process personal data, we comply with the EU General Data Protection
            Regulation (GDPR) and applicable German data protection laws. Please review
            the Privacy Policy for full details.
          </p>
        </section>

        <section>
          <h2>13. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Math Star and its affiliates are not
            liable for indirect, incidental, special, consequential or punitive damages.
            The total liability for direct damages arising from these Terms shall be
            limited to the amount you paid in the 12 months preceding the claim, or €100,
            whichever is greater, except where not permitted by law.
          </p>
        </section>

        <section>
          <h2>14. Termination</h2>
          <p>
            Math Star may suspend or terminate your Account for violations of these Terms
            or for other legitimate reasons. Upon termination, your access to the Service
            will end; certain data may be retained as required by law.
          </p>
        </section>

        <section>
          <h2>15. Governing Law & Dispute Resolution</h2>
          <p>
            These Terms are governed by the laws of Germany. Any disputes shall be subject
            to the exclusive jurisdiction of the competent courts in <em>[City, Germany]</em>,
            unless mandatory law provides otherwise.
          </p>
        </section>

        <section>
          <h2>16. Changes to these Terms</h2>
          <p>
            Math Star may update these Terms from time to time. Material changes will be notified
            to you in advance (e.g., by email or prominent notice). Continued use of the Service
            after changes constitutes acceptance of the updated Terms.
          </p>
        </section>

        <section>
          <h2>17. Miscellaneous</h2>
          <ul>
            <li>If any provision is invalid, the rest remain in force.</li>
            <li>These Terms and any documents expressly incorporated by reference form the entire agreement.</li>
          </ul>
        </section>

        <section>
          <h2>18. Contact</h2>
          <p>
            For questions about these Terms, please contact:
            <br />
            <a href="mailto:hello@mathstar.example">hello@mathstar.example</a>
          </p>
        </section>

        <footer>
          <p className="text-sm text-gray-600 mt-8">
            <em>Note:</em> This document is a general template and does not constitute
            legal advice. For full compliance with German law (including consumer rights,
            distance selling rules, and GDPR specifics) please consult a qualified lawyer
            in Germany before publishing.
          </p>
        </footer>
      </main>
    </div>
  );
}
