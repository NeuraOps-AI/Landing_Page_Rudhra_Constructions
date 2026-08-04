import type { SVGProps } from "react";

type LineIconProps = SVGProps<SVGSVGElement> & { name: string };

export function LineIcon({ name, ...props }: LineIconProps) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  const paths: Record<string, React.ReactNode> = {
    handshake: <><path d="m8.5 12 2 2a2 2 0 0 0 3 0l3.7-4"/><path d="m3 8 4-3 4 2 2-1 4 2 4-1 2 5-3 2-6 6-2-1-2 1-2-2-2-1-2-2-2-1Z"/></>,
    home: <><path d="m3 11 9-8 9 8"/><path d="M5 10v11h14V10M9 21v-7h6v7"/></>,
    award: <><circle cx="12" cy="9" r="6"/><path d="m8 14-2 7 6-3 6 3-2-7M10 9l1.2 1.2L14 7.5"/></>,
    people: <><circle cx="9" cy="8" r="3"/><circle cx="17" cy="10" r="2.5"/><path d="M3 20v-2c0-4 2.5-6 6-6s6 2 6 6v2M15 14c3 0 5 1.7 5 5v1"/></>,
    shield: <><path d="M12 2 20 5v6c0 5-3.2 9-8 11-4.8-2-8-6-8-11V5Z"/><path d="m8.5 12 2.2 2.2 4.8-5"/></>,
    bulb: <><path d="M9 18h6M10 22h4"/><path d="M8 14a7 7 0 1 1 8 0c-1 .8-1 2-1 2H9s0-1.2-1-2Z"/></>,
    building: <><path d="M4 21V7h10v14M14 11h6v10M2 21h20"/><path d="M7 10h2m-2 4h2m-2 4h2m8-4h1m-1 4h1"/></>,
    eye: <><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></>,
    diamond: <><path d="m12 21 9-11-4-6H7l-4 6Z"/><path d="m3 10 9 11 9-11M7 4l5 17 5-17M3 10h18"/></>,
    location: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    phone: <path d="M4 3h4l2 5-2.5 1.8a16 16 0 0 0 6.7 6.7L16 14l5 2v4c0 1-1 2-2 2C9.6 22 2 14.4 2 5c0-1 1-2 2-2Z"/>,
    mail: <><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m3 6 9 7 9-7"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21c0-5 3-8 8-8s8 3 8 8"/></>,
    message: <><path d="M4 4h16v12H8l-4 4Z"/><path d="M8 8h8M8 12h5"/></>,
    send: <><path d="m3 11 18-8-8 18-2-8Z"/><path d="m11 13 4-4"/></>,
    pool: <><path d="M4 14V6a2 2 0 0 1 4 0v8M8 9h6"/><path d="M2 16c2 0 2 1 4 1s2-1 4-1 2 1 4 1 2-1 4-1 2 1 4 1M2 20c2 0 2 1 4 1s2-1 4-1 2 1 4 1 2-1 4-1 2 1 4 1"/></>,
    dumbbell: <><path d="M6 8v8M3 10v4M18 8v8M21 10v4M6 12h12"/></>,
    leaf: <><path d="M20 4C11 4 5 9 5 16c7 1 13-3 15-12Z"/><path d="M4 21c3-5 7-8 12-11"/></>,
    power: <><path d="M12 2v10"/><path d="M7 5.5a8 8 0 1 0 10 0"/></>,
    water: <path d="M12 2S5 10 5 15a7 7 0 0 0 14 0c0-5-7-13-7-13Z"/>,
    car: <><path d="m4 16 1-5 2-3h10l2 3 1 5v4h-3v-2H7v2H4Z"/><circle cx="7" cy="15" r="1"/><circle cx="17" cy="15" r="1"/></>,
  };

  return <svg {...common} {...props}>{paths[name] ?? paths.home}</svg>;
}
