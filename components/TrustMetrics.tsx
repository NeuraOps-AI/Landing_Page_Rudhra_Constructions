import type { ComponentType, SVGProps } from "react";
import { BuildingIcon, HomeIcon, PlanIcon } from "./icons";
import { PrimaryCTA } from "./PrimaryCTA";
import { MetricCounter } from "./site/MetricCounter";

type Metric = {
  value: number;
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

// Editable content values for the trust section.
export const trustMetrics: Metric[] = [
  { value: 23, label: "Years of Excellence", Icon: BuildingIcon },
  { value: 1500, label: "Homes Delivered", Icon: HomeIcon },
  { value: 30, label: "Premium Projects", Icon: PlanIcon },
];

export function TrustMetrics({ metrics = trustMetrics }: { metrics?: Metric[] }) {
  return (
    <section id="why-rudhra" className="metrics-gradient relative overflow-hidden px-[4vw] py-14 sm:py-16 lg:py-[72px]" aria-labelledby="trust-heading">
      <div className="relative mx-auto max-w-[1120px]">
        <div className="mb-9 flex items-center justify-center gap-4 sm:mb-11 sm:gap-7">
          <span className="h-px w-9 bg-white/45 sm:w-16" aria-hidden="true" />
          <h2 id="trust-heading" className="text-center text-[13px] font-semibold uppercase tracking-[0.15em] text-white [text-shadow:0_1px_10px_rgba(9,47,87,0.28)] sm:text-[16px] sm:tracking-[0.17em]">
            Built on Trust. Driven by Purpose.
          </h2>
          <span className="h-px w-9 bg-white/45 sm:w-16" aria-hidden="true" />
        </div>

        <dl className="grid grid-cols-1 gap-y-8 sm:grid-cols-3 sm:gap-y-0">
          {metrics.map(({ value, label, Icon }, index) => (
            <div
              key={label}
              className={`metric-item flex min-w-0 flex-col items-center px-3 text-center sm:px-7 lg:flex-row lg:items-center lg:justify-center lg:gap-5 lg:text-left ${
                index > 0 ? "lg:border-l lg:border-white/25" : ""
              }`}
            >
              <Icon className="mb-3 size-10 shrink-0 text-white/90 [filter:drop-shadow(0_2px_8px_rgba(12,52,91,0.2))] sm:size-12 lg:mb-0" />
              <div>
                <MetricCounter value={value} />
                <dd className="mt-2 max-w-[125px] text-[10px] font-semibold uppercase leading-[1.55] tracking-[0.06em] text-[#102b4c] sm:text-[12px]">
                  {label}
                </dd>
              </div>
            </div>
          ))}
        </dl>

        <div className="mx-auto mt-11 max-w-[430px] sm:mt-12">
          <PrimaryCTA href="#projects">Explore Rudhra</PrimaryCTA>
        </div>
      </div>
    </section>
  );
}
