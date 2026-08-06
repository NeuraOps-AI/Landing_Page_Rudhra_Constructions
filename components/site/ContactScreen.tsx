import type { ReactNode } from "react";
import { ContactForm } from "./ContactForm";
import { LineIcon } from "./LineIcon";

const contactDetails: Array<{ id: string; icon: string; title: string; content: ReactNode }> = [
  {
    id: "primary-phone",
    icon: "phone",
    title: "Phone Number",
    content: <>+91 83094 75836</>,
  },
  {
    id: "secondary-phone",
    icon: "phone",
    title: "Phone Number",
    content: <>+91 99498 36096</>,
  },
  {
    id: "business-email",
    icon: "mail",
    title: "Business Email",
    content: <>sales@rudhraconstructions.com</>,
  },
  {
    id: "business-address",
    icon: "location",
    title: "Business Address",
    content: <>RUDHRA HOUSE<br />3rd AND 4th FLOORS, PLOT NO. 8&amp;9,<br />Bachupally, Kakatiya Hills, ANAND NAIDU NAGAR,<br />Pragathi Nagar, Hyderabad, Telangana 500090</>,
  },
];

type ContactScreenProps = {
  headingLevel?: "h1" | "h2";
  headingId?: string;
};

export function ContactScreen({ headingLevel = "h1", headingId }: ContactScreenProps) {
  const heading = <>Rudhra Constructions Pvt Ltd</>;

  return (
    <div className="contact-layout">
      <section className="contact-copy">
        <div className="section-heading">
          <p>Contact Us</p>
          {headingLevel === "h1" ? <h1 id={headingId}>{heading}</h1> : <h2 id={headingId}>{heading}</h2>}
          <span />
        </div>
        <p className="contact-lead">Connect with us today to enhance your living experience!<br />Your dream home awaits — reach out now!</p>
        <div className="contact-detail-list">
          {contactDetails.map((detail) => (
            <article key={detail.id}>
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
