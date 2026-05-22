import type { Metadata } from "next";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Privacy Policy — The Scene Co.",
  description: "Our privacy policy explains how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-24 sm:py-32 max-w-3xl">
      <h1 className="font-headline text-4xl md:text-5xl font-bold text-white mb-8">Privacy Policy</h1>
      <p className="text-muted-foreground mb-8">Last updated: May 2026</p>

      <div className="space-y-6 text-muted-foreground">
        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Information We Collect</h2>
          <p>We collect information you provide directly, such as when you fill out a contact form, request a quote, or communicate with us. This may include your name, email address, phone number, and project details.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">How We Use Your Information</h2>
          <p>We use the information we collect to respond to your inquiries, provide quotes, deliver our services, and improve our website. We do not sell or share your personal information with third parties for marketing purposes.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Data Storage</h2>
          <p>Your data is stored securely in Cloudflare D1 database, which is encrypted and backed up regularly. We retain your information only as long as necessary to provide our services.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Cookies</h2>
          <p>Our website uses essential cookies for functionality (such as admin session management). We do not use tracking or advertising cookies without your consent.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Your Rights</h2>
          <p>You have the right to access, correct, or delete your personal data at any time. Contact us at hello@thescene.co.in to exercise these rights.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Contact</h2>
          <p>For any privacy-related questions, contact us at hello@thescene.co.in.</p>
        </section>
      </div>
    </div>
  );
}
