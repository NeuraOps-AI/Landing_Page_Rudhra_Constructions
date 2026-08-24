import Link from "next/link";
import { Brand } from "./Brand";
import { BenefitStrip } from "./BenefitStrip";
import { LineIcon } from "./LineIcon";

const columns = [
  { title: "Company", links: [["About Us", "/about"], ["Our Team", "/about#team"], ["News & Blog", "/news-blog"], ["Jobs", "/jobs"]] },
  { title: "Projects", links: [["Ongoing Projects", "/projects"], ["Completed Projects", "/projects"], ["Upcoming Projects", "/projects"], ["Residential Villas", "/projects/royal-village-2"], ["Commercial Spaces", "/projects/rudhra-empire"], ["Gated Communities", "/projects/park-avenue"]] },
  { title: "Resources", links: [["Project Portfolio", "/projects"], ["Gallery", "/projects/park-avenue#gallery"], ["FAQs", "/contact"], ["Policies", "/contact"]] },
];

const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/rudhraconstructionsofficial?igsh=cXhyamQ4d2lpb2Jl" },
  { name: "X", href: "#" },
  { name: "Facebook", href: "#" },
  { name: "LinkedIn", href: "#" },
  { name: "YouTube", href: "#" },
];

export function SiteFooter({ showBenefits = true }: { showBenefits?: boolean }) {
  return (
    <footer className="site-footer">
      {showBenefits && <div className="site-footer-benefits"><BenefitStrip compact /></div>}
      <div className="site-footer-body">
        <div className="site-footer-grid">
          <div className="footer-brand-column">
            <div className="footer-brand-surface"><Brand /></div>
            <p className="footer-tagline">Crafting spaces that inspire.<br />Creating legacies that endure.</p>
            <div className="footer-contact-list">
              <p><LineIcon name="location" /><span>RUDHRA HOUSE<br />3rd AND 4th FLOORS, PLOT NO. 8&amp;9,<br />Bachupally, Kakatiya Hills, ANAND NAIDU NAGAR,<br />Pragathi Nagar, Hyderabad, Telangana 500090</span></p>
              <p><LineIcon name="phone" /><span>+91 83094 75836<br />+91 99498 36096</span></p>
              <p><LineIcon name="mail" /><span>sales@rudhraconstructions.com</span></p>
            </div>
          </div>
          {columns.map((column) => (
            <div key={column.title} className="footer-link-column">
              <h3>{column.title}</h3>
              <ul>{column.links.map(([label, href]) => <li key={label}><Link href={href}>{label}</Link></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="site-footer-bottom">
          <p>© 2026 Rudhra Constructions Pvt. Ltd.<br />All Rights Reserved.</p>
          <div className="footer-socials" aria-label="Social media links">
            <span>Follow Us</span>
            {socialLinks.map(({ name, href }) => (
              <a
                key={name}
                href={href}
                aria-label={name}
                target={href === "#" ? undefined : "_blank"}
                rel={href === "#" ? undefined : "noreferrer"}
              >
                {name.slice(0, 1)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
