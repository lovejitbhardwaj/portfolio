type SectionHeadingProps = {
  title: string;
  subtitle?: string;
};

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div>
      <div className="text-xs font-semibold tracking-[0.22em] text-zinc-400 uppercase">
        {title}
      </div>
      {subtitle ? <div className="mt-2 text-sm text-zinc-300">{subtitle}</div> : null}
    </div>
  );
}
