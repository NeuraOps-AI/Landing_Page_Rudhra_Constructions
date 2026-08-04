import { ArrowIcon } from "./icons";

type PrimaryCTAProps = {
  href: string;
  children: React.ReactNode;
};

export function PrimaryCTA({ href, children }: PrimaryCTAProps) {
  return (
    <a
      href={href}
      className="focus-ring focus-dark group mx-auto flex min-h-14 w-full items-center justify-center gap-6 rounded-xl bg-[linear-gradient(105deg,#5794e8_0%,#1760ba_100%)] px-8 py-4 font-serif text-lg tracking-[0.03em] text-white shadow-[0_14px_30px_rgba(37,105,188,0.24)] transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgba(37,105,188,0.31)] sm:w-fit sm:min-w-[350px] sm:text-xl"
    >
      {children}
      <ArrowIcon className="size-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
    </a>
  );
}
