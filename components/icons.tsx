import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const defaults = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  strokeWidth: 1.7,
  viewBox: "0 0 48 48",
};

export function BuildingIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props} aria-hidden="true">
      <path d="M10 42V13h18v29M28 22h10v20M6 42h36" />
      <path d="M15 19h3m5 0h1m-9 7h3m5 0h1m-9 7h3m5 0h1m9-4h2m-2 6h2" />
      <path d="M31 9h10v10M35 12l6-3-3 6 3 4-5-1-3 4-1-5-5-2 5-2 3-5Z" />
    </svg>
  );
}

export function HomeIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props} aria-hidden="true">
      <path d="m6 23 18-16 18 16" />
      <path d="M10 20v22h28V20M19 42V29h10v13M16 23l8-7 8 7" />
    </svg>
  );
}

export function PlanIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props} aria-hidden="true">
      <path d="M7 7h34v34H7zM13 7v7m7-7v4m13-4v9m8 3h-6m6 9h-9m-14 7h10v6" />
      <path d="M14 20h10v10H14zM28 18h7v9M12 35h3m12-24h3" />
    </svg>
  );
}

export function PeopleIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props} aria-hidden="true">
      <circle cx="24" cy="17" r="7" />
      <circle cx="10" cy="22" r="5" />
      <circle cx="38" cy="22" r="5" />
      <path d="M13 41v-3c0-6 4.9-10 11-10s11 4 11 10v3M2 40v-2c0-4.6 3.1-8 8-8 2 0 3.8.6 5.1 1.6M46 40v-2c0-4.6-3.1-8-8-8-2 0-3.8.6-5.1 1.6" />
    </svg>
  );
}

export function PlayIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props} aria-hidden="true">
      <path d="M7.6 4.7a1 1 0 0 1 1.53-.84l10.05 7.3a1.03 1.03 0 0 1 0 1.67l-10.05 7.3a1 1 0 0 1-1.53-.84V4.7Z" />
    </svg>
  );
}

export function PauseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props} aria-hidden="true">
      <path d="M6 4.5A1.5 1.5 0 0 1 7.5 3h2A1.5 1.5 0 0 1 11 4.5v15A1.5 1.5 0 0 1 9.5 21h-2A1.5 1.5 0 0 1 6 19.5v-15Zm7 0A1.5 1.5 0 0 1 14.5 3h2A1.5 1.5 0 0 1 18 4.5v15a1.5 1.5 0 0 1-1.5 1.5h-2a1.5 1.5 0 0 1-1.5-1.5v-15Z" />
    </svg>
  );
}

export function FullscreenIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props} aria-hidden="true">
      <path d="M8.2 3.75H3.75V8.2M15.8 3.75h4.45V8.2M20.25 15.8v4.45H15.8M8.2 20.25H3.75V15.8" />
    </svg>
  );
}

export function ArrowIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props} aria-hidden="true">
      <path d="M5 19 19 5M8 5h11v11" />
    </svg>
  );
}
