import { benefits } from "@/data/site";
import { LineIcon } from "./LineIcon";

export function BenefitStrip({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`benefit-strip ${compact ? "is-compact" : ""}`} aria-label="Why choose Rudhra Constructions">
      <div className="benefit-grid">
        {benefits.map((benefit) => (
          <article key={benefit.title} className="benefit-item">
            <span className="benefit-icon"><LineIcon name={benefit.icon} /></span>
            <div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
