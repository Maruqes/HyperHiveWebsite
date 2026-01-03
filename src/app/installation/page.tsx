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
    <section className="py-20 sm:py-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6">
        <div className="flex max-w-2xl flex-col gap-4">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Installation
          </span>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Choose your network model
          </h2>
          <p className="text-base text-muted-foreground sm:text-lg">
            Do you want a 512rede internal fabric or an external LAN install?
            Each choice opens its own tutorial.
          </p>
        </div>

        <div className="rounded-3xl border border-border/70 bg-[rgba(8,12,22,0.85)] p-6 shadow-[0_24px_60px_rgba(5,8,16,0.45)]">
          <div className="grid gap-6 lg:grid-cols-2">
            {installChoices.map((choice) => (
              <Link
                key={choice.id}
                href={choice.href}
                className="group rounded-2xl border border-border/70 bg-[rgba(5,8,16,0.75)] p-5 transition hover:border-accent/60 hover:shadow-[0_18px_36px_rgba(56,144,136,0.2)]"
              >
                <div className="flex flex-col gap-3">
                  <h3 className="text-xl font-semibold text-foreground">
                    {choice.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {choice.description}
                  </p>
                  <ul className="grid gap-2 text-sm text-muted-foreground">
                    {choice.points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
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

          <div className="mt-6 rounded-2xl border border-border/70 bg-white/5 p-4 text-sm text-muted-foreground">
            Not sure? See the 512rede diagram first:{" "}
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
