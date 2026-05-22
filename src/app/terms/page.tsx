import type { Metadata } from "next";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Terms of Service — The Scene Co.",
  description: "Terms and conditions for using The Scene Co. website and services.",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-24 sm:py-32 max-w-3xl">
      <h1 className="font-headline text-4xl md:text-5xl font-bold text-white mb-8">Terms of Service</h1>
      <p className="text-muted-foreground mb-8">Last updated: May 2026</p>

      <div className="space-y-6 text-muted-foreground">
        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Services</h2>
          <p>The Scene Co. provides custom website development, e-commerce solutions, POS systems, and SaaS products. All services are delivered according to the agreed scope, timeline, and pricing outlined in the project proposal.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Payment Terms</h2>
          <p>Payment is structured in milestones: 40% upfront deposit before work begins, 30% upon design approval, and 30% on final delivery. For projects over ₹1,00,000, an additional milestone at 50% development completion may apply. Late payments incur a 2% fee after a 7-day grace period.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Free Hosting & Domain</h2>
          <p>All packages include 1 year of free frontend hosting on Cloudflare Pages and 1 year of free domain registration (.com or .in). After the first year, hosting and domain renewal fees apply at standard rates.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Intellectual Property</h2>
          <p>Upon full payment, you own the complete source code and design of your website. We retain the right to showcase your project in our portfolio unless otherwise agreed.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Revisions</h2>
          <p>Each project includes 2 rounds of revisions at the design stage. Additional revisions beyond the included rounds are billed at our standard hourly rate.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Limitation of Liability</h2>
          <p>We are not liable for any indirect, incidental, or consequential damages arising from the use of our services. Our total liability is limited to the amount paid for the specific service in question.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Contact</h2>
          <p>For any questions about these terms, contact us at hello@thescene.co.in.</p>
        </section>
      </div>
    </div>
  );
}
