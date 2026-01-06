export type InstallStep = {
  id: string;
  title: string;
  summary: string;
  actions?: string[];
  commands?: string[];
  paths?: string[];
  files?: string[];
  env?: string[];
  moves?: string[];
  assets?: string[];
  checks?: string[];
  notes?: string;
};

const renderStepBlock = (
  label: string,
  items?: string[],
  asCode = false
) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="glass-panel rounded-xl border border-border/50 p-3">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </p>
      <ul className="mt-2 grid gap-1 text-sm text-muted-foreground">
        {items.map((item, index) => (
          <li key={`${label}-${index}`} className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent/60" />
            {asCode ? (
              <code className="text-xs text-accent break-all">{item}</code>
            ) : (
              <span>{item}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export function InstallStepCard({ step }: { step: InstallStep }) {
  return (
    <div className="glass-panel rounded-2xl border border-border/60 p-5">
      <div className="flex flex-col gap-2">
        <h4 className="text-lg font-semibold text-foreground">{step.title}</h4>
        <p className="text-sm text-muted-foreground">{step.summary}</p>
      </div>
      <div className="mt-3 grid gap-3 lg:grid-cols-2">
        {renderStepBlock("Actions", step.actions)}
        {renderStepBlock("Commands", step.commands, true)}
        {renderStepBlock("Paths", step.paths, true)}
        {renderStepBlock("Files", step.files, true)}
        {renderStepBlock("Env", step.env, true)}
        {renderStepBlock("Moves", step.moves, true)}
        {renderStepBlock("Assets", step.assets)}
        {renderStepBlock("Checks", step.checks)}
      </div>
      {step.notes ? (
        <div className="glass-panel mt-3 rounded-xl border border-border/50 p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Notes
          </p>
          <p className="mt-2 text-sm text-muted-foreground">{step.notes}</p>
        </div>
      ) : null}
    </div>
  );
}
