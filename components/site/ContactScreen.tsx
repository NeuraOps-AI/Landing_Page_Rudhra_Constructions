import type { ReactNode } from "react";
import { ContactForm } from "./ContactForm";
import { LineIcon } from "./LineIcon";

const contactDetails: Array<{ icon: string; title: string; content: ReactNode }> = [
  {
    icon: "location",
    title: "Visit Us",
    content: <>Rudhra Constructions Pvt. Ltd.<br />6-3-248/A/2, Road No. 1, Banjara Hills,<br />Hyderabad, Telangana – 500034.</>,
  },
  {
    icon: "phone",
    title: "Call Us",
    content: <>+91 91000 12345<br />+91 91000 67890</>,
  },
  {
    icon: "mail",
    title: "Email Us",
    content: <>info@rudhraconstructions.com<br />projects@rudhraconstructions.com</>,
  },
  {
    icon: "clock",
    title: "Business Hours",
    content: <>Mon – Sat: 9:30 AM – 6:30 PM<br />Sunday: By Appointment</>,
  },
];

type ContactScreenProps = {
  headingLevel?: "h1" | "h2";
  headingId?: string;
};

export function ContactScreen({ headingLevel = "h1", headingId }: ContactScreenProps) {
  const heading = <>Let&apos;s Build Something<br />Extraordinary Together.</>;

  return (
    <div className="contact-layout">
      <section className="contact-copy">
        <div className="section-heading">
          <p>Contact Us</p>
          {headingLevel === "h1" ? <h1 id={headingId}>{heading}</h1> : <h2 id={headingId}>{heading}</h2>}
          <span />
        </div>
        <p className="contact-lead">Have a project in mind or need more information?<br />We&apos;d love to hear from you.</p>
        <div className="contact-detail-list">
          {contactDetails.map((detail) => (
            <article key={detail.title}>
              <span><LineIcon name={detail.icon} /></span>
              <div><h3>{detail.title}</h3><p>{detail.content}</p></div>
            </article>
          ))}
        </div>
      </section>
      <ContactForm />
    </div>
  );
}
