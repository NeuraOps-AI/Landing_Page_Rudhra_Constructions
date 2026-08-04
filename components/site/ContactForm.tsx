"use client";

import { FormEvent, useState } from "react";
import { LineIcon } from "./LineIcon";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setSubmitted(true);
    form.reset();
  };

  return (
    <form className="contact-form-card" onSubmit={submit}>
      <h2>Send Us a Message</h2>
      <p>Fill in the details below and our team will get back to you shortly.</p>
      <div className="form-two-column">
        <label><LineIcon name="user" /><span className="sr-only">Full name</span><input name="name" placeholder="Full Name" autoComplete="name" required /></label>
        <label><LineIcon name="phone" /><span className="sr-only">Phone number</span><input name="phone" placeholder="Phone Number" autoComplete="tel" inputMode="tel" required /></label>
      </div>
      <label><LineIcon name="mail" /><span className="sr-only">Email address</span><input type="email" name="email" placeholder="Email Address" autoComplete="email" required /></label>
      <label><LineIcon name="building" /><span className="sr-only">Project interest</span><select name="interest" defaultValue="" required><option value="" disabled>I’m interested in</option><option>Premium Villas</option><option>Luxury Apartments</option><option>Commercial Spaces</option><option>Architecture & Construction</option></select></label>
      <label className="items-start"><LineIcon name="message" /><span className="sr-only">Message</span><textarea name="message" placeholder="Your Message" rows={4} required /></label>
      <label className="form-consent"><input type="checkbox" name="consent" required /><span>I agree to receive communications from Rudhra Constructions.</span></label>
      <button type="submit" className="primary-button"><LineIcon name="send" />Send Message</button>
      <p className={`form-success ${submitted ? "is-visible" : ""}`} role="status">Thank you. Our team will contact you shortly.</p>
    </form>
  );
}
