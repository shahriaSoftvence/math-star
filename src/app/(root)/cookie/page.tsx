import React from "react";

export const metadata = {
  title: "Cookie Policy — Math Star",
  description: "Cookie Policy for Math Star. Learn how we use cookies on our website.",
};

export default function CookiePage() {
  return (
    <div>
      <main className="max-w-7xl mx-auto p-8 prose space-y-12 mt-20">
        <h1 className="text-4xl font-bold font-Quicksand">Cookie Policy</h1>
        <p><strong>Effective date:</strong> September 21, 2025</p>

        <section>
          <h2>1. Introduction</h2>
          <p>
            Math Star uses cookies and similar technologies to enhance your experience on our platform.
            This Cookie Policy explains what cookies we use and how you can manage them.
          </p>
        </section>

        <section>
          <h2>2. What Are Cookies?</h2>
          <p>
            Cookies are small text files stored on your device by your browser.
            They help remember your preferences, login sessions, and track analytics.
          </p>
        </section>

        <section>
          <h2>3. Types of Cookies We Use</h2>
          <ul>
            <li><strong>Essential Cookies:</strong> Required for site functionality.</li>
            <li><strong>Performance & Analytics Cookies:</strong> Help us improve services and understand user behavior.</li>
            <li><strong>Functional Cookies:</strong> Remember preferences and user settings.</li>
            <li><strong>Marketing Cookies:</strong> Display personalized content or ads.</li>
          </ul>
        </section>

        <section>
          <h2>4. Managing Cookies</h2>
          <p>
            You can adjust your browser settings to block or delete cookies.
            Note that blocking certain cookies may affect site functionality.
          </p>
        </section>

        <section>
          <h2>5. Third-Party Cookies</h2>
          <p>
            We may use third-party services (like analytics or ads) that also use cookies.
            These providers have their own privacy policies.
          </p>
        </section>

        <section>
          <h2>6. Changes to this Cookie Policy</h2>
          <p>
            We may update this Cookie Policy from time to time. Changes will be posted on this page.
          </p>
        </section>

        <section>
          <h2>7. Contact</h2>
          <p>
            For questions about this Cookie Policy, contact us at:
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
