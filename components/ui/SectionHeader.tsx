type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  light?: boolean;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
}: SectionHeaderProps) {
  return (
    <div
      className={`mb-12 max-w-2xl ${align === "center" ? "mx-auto text-center" : "text-left"}`}
    >
      {eyebrow ? (
        <p
          className={`mb-3 text-sm font-semibold tracking-[0.2em] uppercase ${
            light ? "text-white/80" : "text-brown"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight ${
          light ? "text-white" : "text-brown-deep"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-4 text-base leading-relaxed ${
            light ? "text-white/75" : "text-muted"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
