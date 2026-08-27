import EventHero from "../components/pages/events/EventHero";
import GallerySection from "../components/pages/projects/GallerySection";
import ProjectShowcase from "@/components/pages/home/ProjectShowcase";

export default function Projects() {
  return (
    <div className="overflow-x-clip bg-base text-ink">
      <EventHero
        image="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1800&q=80"
        eyebrow="Projects · DevOps Cameroon"
        title="Open-source"
        accentTitle="projects"
        bottomLeft={
          <p className="max-w-[260px] text-[13px] leading-relaxed text-white/72">
            Tools the community actually uses. Every project started from a real
            problem a Cameroonian team had.
          </p>
        }
        bottomRight={
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 flex-none items-center justify-center bg-accent text-ink">
              ◎
            </div>
            <div>
              <b className="block font-sans text-sm font-bold text-white">
                5 active repos
              </b>
              <span className="text-xs text-white/60">
                All open source, all built in the open
              </span>
            </div>
          </div>
        }
      />
      <GallerySection />
      <ProjectShowcase />
    </div>
  );
}
