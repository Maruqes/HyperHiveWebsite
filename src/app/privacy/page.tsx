import { Section } from "@/components/ui/Section";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Section
        eyebrow="Legal"
        title="Privacy"
        description="This site is a proof of concept. Use it at your own risk."
      >
        <div className="glass-panel rounded-3xl border border-border/70 bg-[color:var(--surface-overlay)] p-6 sm:p-8">
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>
              HyperHive is an experimental project and this website is provided
              for informational purposes only. It is not a commercial service and
              is not intended for production use.
            </p>
            <p>
              We do not require accounts and do not ask for personal data on this
              site. Basic technical data (for example IP address, browser type,
              and request logs) may be processed by the hosting platform for
              security, reliability, and troubleshooting.
            </p>
            <p>
              If you run the software yourself, any data you process remains in
              your environment. You are responsible for compliance, security,
              backups, and data handling.
            </p>
            <p>
              External links (such as GitHub) are governed by their own privacy
              policies. This page may change without notice.
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
