import { useState } from "react";
import SectionHeading from "@/components/pages/events/SectionHeading";
import EmptyState from "@/components/ui/EmptyState";

const DEFAULT_ORGANIZERS = [
  {
    name: "DevOps Cameroon",
    role: "Community Organizers · Core team",
    initials: "DC",
    photo: "/images/org1.png",
  },
  {
    name: "Volunteer Crew",
    role: "Oversight, logistics & AV",
    initials: "VC",
    photo: "/images/org2.png",
  },
  {
    name: "Cloud Partners",
    role: "Sponsors & cloud credits",
    initials: "CP",
    photo: "/images/org3.png",
  },
  {
    name: "Logistics Team",
    role: "Venue, catering & setup",
    initials: "LT",
    photo: "/images/org4.png",
  },
  {
    name: "Marketing & Comms",
    role: "Social, press & outreach",
    initials: "MC",
    photo: "/images/org5.png",
  },
  {
    name: "Tech Operations",
    role: "Infra, AV & on-site support",
    initials: "TO",
    photo: "/images/IMG2.png",
  },
];

export default function OrganizersSection({ organizers = DEFAULT_ORGANIZERS }) {
  const [active, setActive] = useState(-1);

  return (
    <section aria-label="Organizers" className="bg-base py-16 lg:py-24">
      <div className="mx-auto max-w-[1160px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Organizers"
          sub="The crew running this edition."
        />
      </div>

      {organizers.length === 0 ? (
        <div className="mx-auto mt-10 max-w-[1160px] px-4 sm:px-6 lg:px-8">
          <EmptyState
            title="Organizers coming soon"
            description="The team behind this edition will be introduced as the event details are finalized."
          />
        </div>
      ) : (
        <div className="mx-auto mt-10 max-w-[1160px] overflow-x-auto px-4 scrollbar-none sm:px-6  lg:px-8">
          <div className="flex gap-[2px]">
            {organizers.map((o, i) => (
              <article
                key={o.name}
                aria-label={`${o.name} — ${o.role}`}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(-1)}
                className={`relative h-[420px] w-[220px] flex-none cursor-pointer overflow-hidden bg-[#e9e9e7] transition-[box-shadow] duration-300 ${
                  active === i
                    ? "z-10 shadow-[0_20px_50px_-18px_rgba(22,26,32,0.35)]"
                    : ""
                }`}
              >
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(61,220,132,0.22),rgba(61,220,132,0)_60%)] transition-opacity duration-500 ${
                    active === i ? "opacity-100" : "opacity-0"
                  }`}
                />
                <div
                  className={`absolute inset-x-0 top-0 z-10 flex justify-center pt-10 text-center transition-opacity duration-300 ${
                    active === i ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="text-center">
                    <p className="mb-1 font-mono text-[11px] font-medium tracking-wide text-ink-3">
                      {o.role}
                    </p>
                    <p className="font-sans text-[17px] font-semibold leading-tight tracking-tight text-ink">
                      {o.name}
                    </p>
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-[70%]">
                  {o.photo ? (
                    <img
                      src={o.photo}
                      alt=""
                      className={`h-full w-full object-cover object-center brightness-[1.08] contrast-[1.06] saturate-[1.05] transition-[filter] duration-[400ms] ${
                        active === i ? "grayscale-0" : "grayscale"
                      }`}
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent to-accent/70">
                      <span className="font-sans text-5xl font-extrabold uppercase tracking-tight text-accent-ink">
                        {o.initials}
                      </span>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
