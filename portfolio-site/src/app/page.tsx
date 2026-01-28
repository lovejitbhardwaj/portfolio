import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AboutSection } from "@/components/sections/AboutSection";
import { AssistantSection } from "@/components/sections/AssistantSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main id="top" className="mx-auto w-full max-w-6xl px-4">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <AssistantSection />
        <ContactSection />
        <SiteFooter />
      </main>
    </div>
  );
}
