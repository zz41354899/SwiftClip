import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MessageSquare, ArrowRight, Star, Heart, Code2, Lightbulb } from "lucide-react";

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-zinc-50 selection:bg-indigo-100 flex flex-col">
      <Navbar />

      <main className="flex-1 pt-20 sm:pt-32 pb-24">
        {/* Header */}
        <section className="relative px-4 sm:px-6 py-16 sm:py-20 overflow-hidden border-b border-zinc-200 bg-white">
          <div className="absolute inset-0 hero-grid opacity-30 pointer-events-none" />
          <div className="relative max-w-4xl mx-auto text-center z-10">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-600 text-xs font-semibold mb-6">
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              Join the movement
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-zinc-900 tracking-tight mb-8">
              Build the future of <br className="hidden sm:block"/> video together.
            </h1>
            <p className="text-lg sm:text-xl text-zinc-500 font-light max-w-2xl mx-auto leading-relaxed mb-10">
              SwiftClip is open-source and powered by developers. Join our community to share templates, ask questions, and contribute to the core library.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="https://github.com" className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 h-14 rounded-full bg-zinc-900 text-white font-semibold hover:bg-black hover:scale-105 active:scale-95 transition-all shadow-xl shadow-zinc-200">
                <Star className="w-4 h-4 fill-white" />
                Star on GitHub
              </a>
              <a href="https://line.me" className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 h-14 rounded-full bg-white border border-zinc-200 text-zinc-900 font-semibold hover:bg-zinc-50 transition-colors">
                <MessageSquare className="w-4 h-4 text-indigo-500" />
                Join LINE
              </a>
            </div>
          </div>
        </section>

        {/* Ways to get involved */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="mb-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight mb-4">Ways to get involved</h2>
            <p className="text-zinc-500 max-w-xl mx-auto">Whether you&apos;re a beginner or a Remotion pro, there&apos;s a place for you in the SwiftClip community.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white border border-zinc-200 rounded-3xl p-7 hover:border-zinc-300 hover:shadow-lg hover:shadow-zinc-100 transition-all duration-300">
              <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-zinc-900 mb-2">Contribute a template</h3>
              <p className="text-sm text-zinc-500 leading-relaxed mb-5">Build a new Remotion composition and submit a PR. All accepted templates are shipped to the gallery.</p>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700">
                Open GitHub <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="bg-white border border-zinc-200 rounded-3xl p-7 hover:border-zinc-300 hover:shadow-lg hover:shadow-zinc-100 transition-all duration-300">
              <div className="w-11 h-11 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center mb-5">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-zinc-900 mb-2">Chat on LINE</h3>
              <p className="text-sm text-zinc-500 leading-relaxed mb-5">Stuck on a composition? Share a render? Join our LINE group to get help and connect with other developers.</p>
              <a href="https://line.me" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-600 hover:text-violet-700">
                Open LINE <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="bg-white border border-zinc-200 rounded-3xl p-7 hover:border-zinc-300 hover:shadow-lg hover:shadow-zinc-100 transition-all duration-300">
              <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-5">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-zinc-900 mb-2">Request a template</h3>
              <p className="text-sm text-zinc-500 leading-relaxed mb-5">Have an idea for a composition that doesn&apos;t exist yet? Open an issue and the community will vote on it.</p>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600 hover:text-amber-700">
                Open issue <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* Stats bar */}
        <section className="border-t border-zinc-200 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { value: "29+", label: "Templates" },
              { value: "MIT", label: "License" },
              { value: "100%", label: "Open Source" },
              { value: "0", label: "Dependencies†" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight">{value}</p>
                <p className="text-sm text-zinc-400 mt-1">{label}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-zinc-400 pb-6 px-6">† Each template only requires the <code className="bg-zinc-100 px-1 rounded">remotion</code> package.</p>
        </section>

        {/* GitHub CTA banner */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
          <div className="relative overflow-hidden rounded-3xl bg-zinc-900 px-8 py-12 sm:py-16 text-center">
            <div className="absolute inset-0 hero-grid opacity-10 pointer-events-none" />
            <Star className="w-10 h-10 text-zinc-400 mx-auto mb-5" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">SwiftClip is open source</h2>
            <p className="text-zinc-400 max-w-md mx-auto mb-8 text-sm leading-relaxed">Every template, every animation, every line of code is on GitHub. Fork it, extend it, make it yours.</p>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-zinc-900 text-sm font-semibold hover:bg-zinc-100 transition-colors"
            >
              <Star className="w-4 h-4" />
              Star on GitHub
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
