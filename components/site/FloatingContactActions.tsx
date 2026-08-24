"use client";

import { openLeadPopup } from "@/lib/lead-popup";
import { LineIcon } from "./LineIcon";

const primaryPhone = "+918309475836";
const whatsappMessage = "Hello Rudhra Constructions, I would like to know more about your projects.";
const instagramUrl = "https://www.instagram.com/rudhraconstructionsofficial?igsh=cXhyamQ4d2lpb2Jl";

export function FloatingContactActions() {
  return (
    <aside className="floating-contact-actions" aria-label="Quick contact actions">
      <a
        href="#enquire"
        className="floating-contact-action is-enquiry"
        onClick={openLeadPopup}
        aria-label="Open project enquiry form"
      >
        <span>Enquire Now</span>
        <i><LineIcon name="lead-message" /></i>
      </a>
      <a
        className="floating-contact-action is-call"
        href={`tel:${primaryPhone}`}
        aria-label="Call Rudhra Constructions at +91 83094 75836"
      >
        <span>Call Now</span>
        <i><LineIcon name="phone" /></i>
      </a>
      <a
        className="floating-contact-action is-whatsapp"
        href={`https://wa.me/918309475836?text=${encodeURIComponent(whatsappMessage)}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Rudhra Constructions on WhatsApp"
      >
        <span>WhatsApp</span>
        <i><LineIcon name="whatsapp" /></i>
      </a>
      <a
        className="floating-contact-action is-instagram"
        href={instagramUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Follow Rudhra Constructions on Instagram"
      >
        <span>Instagram</span>
        <i><LineIcon name="instagram" /></i>
      </a>
    </aside>
  );
}
