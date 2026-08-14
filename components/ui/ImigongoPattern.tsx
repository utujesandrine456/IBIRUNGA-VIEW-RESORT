type ImigongoPatternProps = {
  className?: string;
};

/** Imigongo zigzag pattern as a full footer background */
export function ImigongoFooterArt({ className }: ImigongoPatternProps) {
  return (
    <div className={className} aria-hidden="true">
      <svg
        viewBox="0 0 1440 600"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <pattern id="imigongo-zigzag" width="48" height="22" patternUnits="userSpaceOnUse">
            <path
              d="M0 11 L12 0 L24 11 L36 0 L48 11"
              fill="none"
              stroke="#c19a6b"
              strokeWidth="1.5"
              opacity="0.35"
            />
            <path
              d="M0 22 L12 11 L24 22 L36 11 L48 22"
              fill="none"
              stroke="#c19a6b"
              strokeWidth="1.5"
              opacity="0.25"
            />
          </pattern>
        </defs>

        <rect width="1440" height="600" fill="url(#imigongo-zigzag)" />
      </svg>

      {/* Soft overlay keeps footer text readable */}
      <div className="absolute inset-0 bg-footer/85" />
    </div>
  );
}
