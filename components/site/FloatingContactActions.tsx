"use client";

import { openLeadPopup } from "@/lib/lead-popup";
import { LineIcon } from "./LineIcon";

const primaryPhone = "+918309475836";
const whatsappMessage = "Hello Rudhra Constructions, I would like to know more about your projects.";

export function FloatingContactActions() {
  return (
    <aside className="floating-contact-actions" aria-label="Quick contact actions">
      <button
        type="button"
        className="floating-contact-action is-enquiry"
        onClick={openLeadPopup}
        aria-label="Open project enquiry form"
      >
        <strong>Enquire Now</strong>
        <LineIcon name="message" />
      </button>
      <a
        className="floating-contact-action is-call"
        href={`tel:${primaryPhone}`}
        aria-label="Call Rudhra Constructions at +91 83094 75836"
      >
        <span>Call Now</span>
        <LineIcon name="phone" />
      </a>
      <a
        className="floating-contact-action is-whatsapp"
        href={`https://wa.me/918309475836?text=${encodeURIComponent(whatsappMessage)}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Rudhra Constructions on WhatsApp"
      >
        <span>WhatsApp</span>
        <LineIcon name="whatsapp" />
      </a>
    </aside>
  );
}
