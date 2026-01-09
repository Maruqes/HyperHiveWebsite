import { Section } from "@/components/ui/Section";

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <Section
        eyebrow="Legal"
        title="Terms"
        description="HyperHive is a proof of concept and is not intended for production use."
      >
        <div className="glass-panel rounded-3xl border border-border/70 bg-[rgba(5,8,16,0.6)] p-6 sm:p-8">
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>
              By accessing this website or using HyperHive, you acknowledge that
              it is an experimental project provided "as is" without warranties
              of any kind, express or implied.
            </p>
            <p>
              HyperHive is a proof of concept. It must not be used to run
              critical, sensitive, or production workloads. You assume all risks
              related to deployment, operation, security, and data handling.
            </p>
            <p>
              We are not responsible for data loss, downtime, security incidents,
              or any damages arising from the use or misuse of this project. You
              are solely responsible for backups, monitoring, and compliance.
            </p>
            <p>
              This project may change or be discontinued at any time. Continued
              use indicates acceptance of the latest terms. The software is
              licensed under the terms in the GitHub LICENSE file.
            </p>
            <p className="text-xs text-muted-foreground">
              Last updated: 2025-01-09
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}
