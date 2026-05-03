import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { LogoMarquee } from "@/components/LogoMarquee";
import { WorkflowSection } from "@/components/WorkflowSection";
import { ShowcaseSection } from "@/components/ShowcaseSection";
import { TemplateShowcase } from "@/components/TemplateShowcase";
import { FeatureSection } from "@/components/FeatureSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-background text-black min-h-screen">
      <Navbar />
      <HeroSection />
      <LogoMarquee />
      <WorkflowSection />
      <ShowcaseSection />
      <TemplateShowcase />
      <FeatureSection />
      <CTASection />
      <Footer />
    </main>
  );
}
