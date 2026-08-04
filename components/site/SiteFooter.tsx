import Link from "next/link";
import { Brand } from "./Brand";
import { BenefitStrip } from "./BenefitStrip";
import { LineIcon } from "./LineIcon";

const columns = [
  { title: "Company", links: [["About Us", "/about"], ["Why Rudhra", "/#why-rudhra"], ["Our Team", "/about#team"], ["Careers", "/contact"], ["News & Media", "/about"]] },
  { title: "Projects", links: [["Ongoing Projects", "/projects"], ["Completed Projects", "/projects"], ["Upcoming Projects", "/projects"], ["Residential Villas", "/projects/rudhra-villas"], ["Commercial Spaces", "/projects"], ["Gated Communities", "/projects"]] },
  { title: "Services", links: [["Architecture Design", "/contact"], ["Interior Design", "/contact"], ["Construction", "/contact"], ["Project Management", "/contact"], ["Turnkey Solutions", "/contact"], ["Consultation", "/contact"]] },
  { title: "Resources", links: [["Brochure Download", "/projects/rudhra-villas"], ["Gallery", "/projects/rudhra-villas#gallery"], ["FAQs", "/contact"], ["Blog", "/about"], ["Policies", "/contact"]] },
];

export function SiteFooter({ showBenefits = true }: { showBenefits?: boolean }) {
  return (
    <footer className="site-footer">
      {showBenefits && <div className="site-footer-benefits"><BenefitStrip compact /></div>}
      <div className="site-footer-body">
        <div className="site-footer-grid">
          <div className="footer-brand-column">
            <Brand />
            <p className="footer-tagline">Crafting spaces that inspire.<br />Creating legacies that endure.</p>
            <div className="footer-contact-list">
              <p><LineIcon name="location" /><span>Rudhra Constructions Pvt. Ltd.<br />6-3-248/A/2, Road No. 1, Banjara Hills,<br />Hyderabad, Telangana – 500034.</span></p>
              <p><LineIcon name="phone" /><span>+91 91000 12345<br />+91 91000 67890</span></p>
              <p><LineIcon name="mail" /><span>info@rudhraconstructions.com<br />projects@rudhraconstructions.com</span></p>
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
            {["Instagram", "X", "Facebook", "LinkedIn", "YouTube"].map((name) => <a key={name} href="#" aria-label={name}>{name.slice(0, 1)}</a>)}
          </div>
        </div>
      </div>
    </footer>
  );
}
