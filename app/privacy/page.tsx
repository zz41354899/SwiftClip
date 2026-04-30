import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChevronRight } from "lucide-react";

export const metadata = {
  title: "Privacy Policy — SwiftClip",
  description: "How SwiftClip collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <div className="pt-24 min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-6 py-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-zinc-400 mb-10">
            <Link href="/" className="hover:text-zinc-600 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-zinc-600 font-medium">Privacy Policy</span>
          </div>

          <h1 className="text-4xl font-bold text-zinc-900 tracking-tight mb-3">Privacy Policy</h1>
          <p className="text-sm text-zinc-400 mb-12">Last updated: April 30, 2026</p>

          <div className="prose-zinc space-y-10 text-[15px] text-zinc-600 leading-[1.8]">
            <section>
              <h2 className="text-xl font-semibold text-zinc-900 mb-3">1. Overview</h2>
              <p>
                SwiftClip (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is an open-source library of Remotion video templates. This Privacy Policy explains what information we collect when you visit <strong className="text-zinc-800">swiftclip</strong>, how we use it, and what rights you have regarding your data.
              </p>
              <p className="mt-3">
                Because SwiftClip is a static website with no user accounts or server-side data processing, our data collection is minimal. We are committed to your privacy and will never sell your personal information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900 mb-3">2. Information We Collect</h2>
              <h3 className="text-base font-semibold text-zinc-800 mt-5 mb-2">2.1 Automatically Collected Data</h3>
              <p>
                When you visit our website, our hosting provider may automatically collect standard web-server log data, including:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>IP address (anonymised where possible)</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Referring URL</li>
                <li>Pages visited and time of visit</li>
              </ul>
              <p className="mt-3">This data is used solely for security monitoring and aggregate traffic analysis. It is not linked to any personally identifiable information.</p>

              <h3 className="text-base font-semibold text-zinc-800 mt-6 mb-2">2.2 Analytics</h3>
              <p>
                We may use privacy-respecting analytics tools (e.g. Plausible or Vercel Analytics) that do not set cookies and do not collect personally identifiable information. Aggregate page-view counts help us understand which templates are most popular.
              </p>

              <h3 className="text-base font-semibold text-zinc-800 mt-6 mb-2">2.3 Information You Provide</h3>
              <p>
                SwiftClip has no sign-up form or user account system. If you contact us directly (e.g. via GitHub Issues), any information you voluntarily share is used only to respond to your inquiry.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900 mb-3">3. Cookies</h2>
              <p>
                SwiftClip does not set any first-party cookies. Third-party services embedded on the site (e.g. GitHub badges) may set their own cookies subject to their respective privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900 mb-3">4. Third-Party Services</h2>
              <p>Our website may link to or embed content from the following third parties:</p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li><strong className="text-zinc-800">GitHub</strong> — source code hosting and contribution. Subject to <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">GitHub's Privacy Statement</a>.</li>
                <li><strong className="text-zinc-800">Remotion</strong> — documentation links. Subject to <a href="https://remotion.dev" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Remotion's privacy policy</a>.</li>
                <li><strong className="text-zinc-800">Vercel</strong> — website hosting. Subject to <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Vercel's Privacy Policy</a>.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900 mb-3">5. Data Retention</h2>
              <p>
                We do not store personal data on our own servers. Any log data held by our hosting provider is governed by their retention policies (typically 30–90 days).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900 mb-3">6. Your Rights</h2>
              <p>Depending on your jurisdiction, you may have the right to:</p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>Access the personal data we hold about you</li>
                <li>Request correction or deletion of your data</li>
                <li>Object to or restrict processing</li>
                <li>Lodge a complaint with your local data protection authority</li>
              </ul>
              <p className="mt-3">Because we collect very little data, most requests can be satisfied by contacting our hosting provider directly.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900 mb-3">7. Children's Privacy</h2>
              <p>
                SwiftClip is not directed at children under 13. We do not knowingly collect personal information from children. If you believe a child has submitted personal information to us, please contact us and we will delete it promptly.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900 mb-3">8. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated &quot;Last updated&quot; date. Continued use of the site after changes constitutes your acceptance of the new policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900 mb-3">9. Contact</h2>
              <p>
                If you have any questions about this Privacy Policy, please open an issue on our{" "}
                <a href="https://github.com/zz41354899/SwiftClip" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                  GitHub repository
                </a>.
              </p>
            </section>
          </div>

          {/* Footer nav */}
          <div className="mt-16 pt-8 border-t border-zinc-100 flex gap-6 text-sm">
            <Link href="/terms" className="text-zinc-500 hover:text-zinc-900 transition-colors">Terms of Service</Link>
            <Link href="/" className="text-zinc-500 hover:text-zinc-900 transition-colors">Back to home</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
