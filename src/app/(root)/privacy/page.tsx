import React from "react";

export const metadata = {
  title: "Privacy Policy — Math Star",
  description: "Privacy Policy for Math Star. Learn how we collect, use and protect your data.",
};

export default function PrivacyPage() {
  return (
    <div>
      <main className="max-w-7xl mx-auto p-8 prose space-y-12 mt-20">
        <h1 className="text-4xl font-bold font-Quicksand">Privacy Policy</h1>
        <p><strong>Effective date:</strong> September 21, 2025</p>

        <section>
          <h2>1. Introduction</h2>
          <p>
            Math Star respects your privacy and is committed to protecting your personal information.
            This Privacy Policy explains how we collect, use, and disclose information when you use our services.
          </p>
        </section>

        <section>
          <h2>2. Information We Collect</h2>
          <ul>
            <li><strong>Account Information:</strong> Name, email, password, and profile details.</li>
            <li><strong>Usage Data:</strong> How you interact with our platform, exercises completed, progress data.</li>
            <li><strong>Payment Data:</strong> Billing and payment details for subscriptions.</li>
          </ul>
        </section>

        <section>
          <h2>3. How We Use Your Data</h2>
          <ul>
            <li>To provide and improve our services.</li>
            <li>To communicate updates, offers, or support messages.</li>
            <li>To comply with legal obligations.</li>
          </ul>
        </section>

        <section>
          <h2>4. Data Sharing</h2>
          <p>
            We do not sell your personal information. We may share data with:
          </p>
          <ul>
            <li>Service providers (e.g., payment processors, analytics tools).</li>
            <li>Legal authorities if required by law.</li>
          </ul>
        </section>

        <section>
          <h2>5. Security</h2>
          <p>
            We implement reasonable technical and organizational measures to protect your personal data from unauthorized access, alteration, or disclosure.
          </p>
        </section>

        <section>
          <h2>6. Your Rights</h2>
          <p>
            You have rights under the GDPR, including accessing, correcting, or deleting your personal information.
            Contact us if you wish to exercise these rights.
          </p>
        </section>

        <section>
          <h2>7. Changes to This Privacy Policy</h2>
          <p>
            Math Star may update this Privacy Policy occasionally. We will notify users of material changes via email or website notice.
          </p>
        </section>

        <section>
          <h2>8. Contact</h2>
          <p>
            For questions about this Privacy Policy, contact us at:
            <br />
            <a href="mailto:hello@mathstar.example">hello@mathstar.example</a>
          </p>
        </section>

        <footer>
          <p className="text-sm text-gray-600 mt-8">
            <em>Note:</em> This document is a template and does not constitute legal advice. Consult a qualified lawyer for full compliance.
          </p>
        </footer>
      </main>
    </div>
  );
}
