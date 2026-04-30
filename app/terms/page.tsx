import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChevronRight } from "lucide-react";

export const metadata = {
  title: "Terms of Service — SwiftClip",
  description: "Terms governing your use of SwiftClip templates and website.",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <div className="pt-24 min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-6 py-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-zinc-400 mb-10">
            <Link href="/" className="hover:text-zinc-600 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-zinc-600 font-medium">Terms of Service</span>
          </div>

          <h1 className="text-4xl font-bold text-zinc-900 tracking-tight mb-3">Terms of Service</h1>
          <p className="text-sm text-zinc-400 mb-12">Last updated: April 30, 2026</p>

          <div className="prose-zinc space-y-10 text-[15px] text-zinc-600 leading-[1.8]">
            <section>
              <h2 className="text-xl font-semibold text-zinc-900 mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the SwiftClip website (<strong className="text-zinc-800">swiftclip.dev</strong>) or any of its templates, you agree to be bound by these Terms of Service. If you do not agree, please do not use the site or templates.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900 mb-3">2. License</h2>
              <p>
                All SwiftClip templates are released under the <strong className="text-zinc-800">MIT License</strong>. This means you are free to:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>Use templates in personal and commercial projects</li>
                <li>Modify templates to suit your needs</li>
                <li>Distribute copies or modified versions</li>
                <li>Sublicense templates as part of a larger work</li>
              </ul>
              <p className="mt-4">
                The only requirement is that the original MIT License notice is included in any distributed copy. The full license text is available in the{" "}
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                  GitHub repository
                </a>.
              </p>
              <div className="mt-5 bg-zinc-50 border border-zinc-200 rounded-xl px-5 py-4 text-sm font-mono text-zinc-500">
                MIT License — Copyright © 2026 SwiftClip contributors
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900 mb-3">3. Website Use</h2>
              <p>You agree to use the SwiftClip website only for lawful purposes. You must not:</p>
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li>Attempt to gain unauthorised access to any part of the website or its underlying systems</li>
                <li>Use automated scraping tools in a manner that disrupts service availability</li>
                <li>Transmit any malicious code or harmful content</li>
                <li>Misrepresent your identity or affiliation with SwiftClip</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900 mb-3">4. Intellectual Property</h2>
              <p>
                The SwiftClip name, logo, and website design are the property of their respective creators. Template <em>code</em> is MIT-licensed (see §2). All other website content — including written copy, graphics, and UI design — may not be reproduced without permission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900 mb-3">5. Third-Party Dependencies</h2>
              <p>
                SwiftClip templates are built on <a href="https://remotion.dev" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Remotion</a>, which has its own license. Commercial use of Remotion beyond a certain revenue threshold requires a Remotion company license. Please review{" "}
                <a href="https://remotion.dev/license" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                  remotion.dev/license
                </a>{" "}
                before using SwiftClip templates in a commercial product.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900 mb-3">6. Disclaimer of Warranties</h2>
              <p>
                SwiftClip templates and the website are provided <strong className="text-zinc-800">&quot;as is&quot;</strong> without warranty of any kind, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not guarantee that templates will be error-free or meet your specific requirements.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900 mb-3">7. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, SwiftClip and its contributors shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the templates or website, even if advised of the possibility of such damages.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900 mb-3">8. Contributions</h2>
              <p>
                By submitting a Pull Request or Issue to the SwiftClip repository, you agree that your contribution will be licensed under the MIT License and that you have the right to grant that license. You retain copyright over your contributions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900 mb-3">9. Changes to Terms</h2>
              <p>
                We reserve the right to update these Terms at any time. Continued use of the website or templates after changes are posted constitutes acceptance of the updated Terms. We will update the &quot;Last updated&quot; date at the top of this page.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900 mb-3">10. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with applicable law. Any disputes arising under these Terms shall be resolved through good-faith negotiation or, if necessary, binding arbitration.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-900 mb-3">11. Contact</h2>
              <p>
                Questions about these Terms? Open an issue on our{" "}
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                  GitHub repository
                </a>.
              </p>
            </section>
          </div>

          {/* Footer nav */}
          <div className="mt-16 pt-8 border-t border-zinc-100 flex gap-6 text-sm">
            <Link href="/privacy" className="text-zinc-500 hover:text-zinc-900 transition-colors">Privacy Policy</Link>
            <Link href="/" className="text-zinc-500 hover:text-zinc-900 transition-colors">Back to home</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
