import Link from "next/link";

const installChoices = [
  {
    id: "internal",
    title: "Internal 512rede (separated fabric)",
    description:
      "Creates a dedicated cluster trust domain. The master routes and serves DHCP for 512rede.",
    points: [
      "Storage and node traffic stay off the home LAN",
      "Clear boundaries between public and internal traffic",
      "Matches the 512rede diagram",
    ],
    href: "/installation/internal",
    cta: "Open internal tutorial",
  },
  {
    id: "external",
    title: "External LAN (home router)",
    description:
      "All servers connect to the home router via ethernet. No separate fabric.",
    points: [
      "Simpler wiring and quicker start",
      "Less isolation between services and LAN",
      "Master does not run DHCP or routing",
    ],
    href: "/installation/external",
    cta: "Open external tutorial",
  },
];

export default function InstallationLandingPage() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6">
        <div className="flex max-w-2xl flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            Installation
          </span>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Choose your network model
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Pick the model that matches your wiring. Each option opens a focused tutorial.
          </p>
        </div>

        <div className="glass-panel rounded-3xl border border-border/70 p-6 shadow-[0_18px_48px_var(--shadow-soft)]">
          <div className="grid gap-5 lg:grid-cols-2">
            {installChoices.map((choice) => (
              <Link
                key={choice.id}
                href={choice.href}
                className="group rounded-2xl border border-border/70 bg-[color:var(--surface-overlay)] p-6 transition hover:border-accent/60"
              >
                <div className="flex flex-col gap-3">
                  <h2 className="text-xl font-semibold text-foreground">
                    {choice.title}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {choice.description}
                  </p>
                  <ul className="grid gap-2 text-sm text-muted-foreground">
                    {choice.points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent/70" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                    {choice.cta}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-border/70 bg-[color:var(--surface-overlay-soft)] p-4 text-sm text-muted-foreground">
            Not sure? Start with the 512rede diagram:{" "}
            <Link href="/512rede" className="font-semibold text-accent">
              View 512rede
            </Link>
            .
          </div>
        </div>
      </div>
    </section>
  );
}
