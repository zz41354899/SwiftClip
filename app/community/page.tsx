import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MessageSquare, ArrowRight, Star, Heart, Code2, Lightbulb } from "lucide-react";

export const metadata = {
  title: "Community — SwiftClip",
  description: "Join the SwiftClip community. Contribute templates, chat with fellow video makers, and help shape the project.",
};

function CommunityContent() {
  return (
    <main className="flex-1 pt-20 sm:pt-32 pb-24">
      <section className="relative px-4 sm:px-6 py-16 sm:py-20 overflow-hidden border-b border-zinc-200 bg-white">
        <div className="absolute inset-0 hero-grid opacity-30 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center z-10">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-600 text-xs font-semibold mb-6">
            <Heart className="w-3.5 h-3.5 text-rose-500" />
            Open source community
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-zinc-900 tracking-tight mb-8">
            Join the <br className="hidden sm:block" /> SwiftClip Community
          </h1>
          <p className="text-lg sm:text-xl text-zinc-500 font-light max-w-2xl mx-auto leading-relaxed mb-10">
            Get help, share templates, and build the future of video with code.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://github.com/zz41354899/SwiftClip" className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 h-14 rounded-full bg-zinc-900 text-white font-semibold hover:bg-black hover:scale-105 active:scale-95 transition-all shadow-xl shadow-zinc-200">
              <Star className="w-4 h-4 fill-white" />
              Star on GitHub
            </a>
            <a href="https://line.me/ti/g2/FO-LwoDfH0RrlsJ2hylmAyfA04-ZYNQBUWY-ow?utm_source=invitation&utm_medium=link_copy&utm_campaign=default" className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 h-14 rounded-full bg-white border border-zinc-200 text-zinc-900 font-semibold hover:bg-zinc-50 transition-colors">
              <MessageSquare className="w-4 h-4 text-indigo-500" />
              Join LINE group
            </a>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="mb-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight mb-4">Ways to contribute</h2>
          <p className="text-zinc-500 max-w-xl mx-auto">SwiftClip grows with the community. Here&apos;s how you can help.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white border border-zinc-200 rounded-3xl p-7 hover:border-zinc-300 hover:shadow-lg hover:shadow-zinc-100 transition-all duration-300">
            <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-zinc-900 mb-2">Submit a template</h3>
            <p className="text-sm text-zinc-500 leading-relaxed mb-5">Build a Remotion composition and open a pull request. Every template is welcome.</p>
            <a href="https://github.com/zz41354899/SwiftClip" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700">
              Open a PR <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="bg-white border border-zinc-200 rounded-3xl p-7 hover:border-zinc-300 hover:shadow-lg hover:shadow-zinc-100 transition-all duration-300">
            <div className="w-11 h-11 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center mb-5">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-zinc-900 mb-2">Join the chat</h3>
            <p className="text-sm text-zinc-500 leading-relaxed mb-5">Ask questions, share ideas, and connect with other video makers.</p>
            <a href="https://line.me/ti/g2/FO-LwoDfH0RrlsJ2hylmAyfA04-ZYNQBUWY-ow?utm_source=invitation&utm_medium=link_copy&utm_campaign=default" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-600 hover:text-violet-700">
              Join LINE group <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="bg-white border border-zinc-200 rounded-3xl p-7 hover:border-zinc-300 hover:shadow-lg hover:shadow-zinc-100 transition-all duration-300">
            <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-5">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-zinc-900 mb-2">Request a template</h3>
            <p className="text-sm text-zinc-500 leading-relaxed mb-5">Got an idea? Open an issue and describe what you&apos;d like to see built.</p>
            <a href="https://github.com/zz41354899/SwiftClip/issues/new" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600 hover:text-amber-700">
              Open an issue <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {[
            { value: "30+", label: "Templates" },
            { value: "MIT", label: "MIT license" },
            { value: "100%", label: "Open source" },
            { value: "0", label: "Zero config" },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight">{value}</p>
              <p className="text-sm text-zinc-400 mt-1">{label}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-zinc-400 pb-6 px-6">Stats are approximate and updated periodically.</p>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="relative overflow-hidden rounded-3xl bg-zinc-900 px-8 py-12 sm:py-16 text-center">
          <div className="absolute inset-0 hero-grid opacity-10 pointer-events-none" />
          <Star className="w-10 h-10 text-zinc-400 mx-auto mb-5" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Completely open source</h2>
          <p className="text-zinc-400 max-w-md mx-auto mb-8 text-sm leading-relaxed">SwiftClip is built in public. Fork it, extend it, and make it your own.</p>
          <a
            href="https://github.com/zz41354899/SwiftClip"
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
  );
}

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-zinc-50 selection:bg-indigo-100 flex flex-col">
      <Navbar />
      <CommunityContent />
      <Footer />
    </div>
  );
}
