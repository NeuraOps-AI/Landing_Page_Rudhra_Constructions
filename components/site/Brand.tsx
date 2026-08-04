import Image from "next/image";
import Link from "next/link";

export function Brand() {
  return (
    <Link href="/" className="focus-ring block w-fit rounded-sm" aria-label="Rudhra Constructions home">
      <Image
        src="/images/logo/logo-rcpl-navbar-transparent.png"
        alt="Rudhra Constructions"
        width={623}
        height={250}
        priority
        className="h-[58px] w-auto object-contain sm:h-[64px]"
      />
    </Link>
  );
}
