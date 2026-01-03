import Link from "next/link";
import { ArrowRight, Flag, MapPin, Milestone } from "lucide-react";

import { Callout } from "@/components/ui/Callout";
import { Card } from "@/components/ui/Card";
import { IconBadge } from "@/components/ui/IconBadge";
import { Section } from "@/components/ui/Section";

const roadmap = [
  {
    title: "Short term",
    description: "Consolidate the base topology and align critical flows.",
    points: [
      "Initial dependency map",
      "Pilots with operations teams",
      "Fast integration feedback",
    ],
    icon: Flag,
  },
  {
    title: "Mid term",
    description: "Expand the 512 Network and strengthen governance.",
    points: [
      "Domain-based segmentation",
      "Shared policies",
      "Workflows with automatic feedback",
    ],
    icon: Milestone,
  },
  {
    title: "Long term",
    description: "Scale the fabric to multi-product ecosystems.",
    points: [
      "Federation across teams",
      "Optimization recommendations",
      "Assisted autonomous operations",
    ],
    icon: MapPin,
  },
];

const docs = [
  {
    title: "Layered architecture",
    description: "Overview of the HyperHive layers.",
    href: "/architecture",
  },
  {
    title: "512rede and topology",
    description: "How the network creates operational context.",
    href: "/512rede",
  },
  {
    title: "Feature catalog",
    description: "What exists today and how it connects.",
    href: "/features",
  },
];

export default function RoadmapPage() {
  return (
    <div>
      <Section
        eyebrow="Roadmap / Docs"
        title="Next steps and references"
        description="A pragmatic view of what comes next and where to deepen the technical narrative."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {roadmap.map((item) => (
              <Card className="flex h-full flex-col gap-4">
                <IconBadge>
                  <item.icon className="h-5 w-5" />
                </IconBadge>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </Card>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Docs"
        title="Read, compare, plan"
        description="Short links to keep the conversation aligned with what is already defined."
      >
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-4">
            {docs.map((doc) => (
                <Card className="flex items-center justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-base font-semibold text-foreground">
                      {doc.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {doc.description}
                    </p>
                  </div>
                  <Link
                    href={doc.href}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:text-foreground"
                  >
                    Open
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Card>
            ))}
          </div>
            <Callout
              title="Need a deeper technical dive?"
              description="Send context and we will share the full narrative without overpromise."
              icon={<ArrowRight className="h-5 w-5" />}
              className="h-full"
            />
        </div>
      </Section>
    </div>
  );
}
