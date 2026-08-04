"use client";

import { FormEvent, useState } from "react";
import { LineIcon } from "./LineIcon";

export function ProjectEnquiryForm() {
  const [sent, setSent] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!event.currentTarget.checkValidity()) {
      event.currentTarget.reportValidity();
      return;
    }
    setSent(true);
  };

  return (
    <form className="project-enquiry-card" onSubmit={submit}>
      <h2>Interested in This Project?</h2>
      <p>Fill in your details and our team will get back to you shortly.</p>
      <label><LineIcon name="user" /><span><small>Full Name</small><input name="name" defaultValue="John Doe" required /></span></label>
      <label><LineIcon name="phone" /><span><small>Phone Number</small><input name="phone" defaultValue="+91 98765 43210" required /></span></label>
      <label><LineIcon name="mail" /><span><small>Email Address</small><input type="email" name="email" defaultValue="john.doe@email.com" required /></span></label>
      <label><LineIcon name="building" /><span><small>I’m interested in</small><select name="project" defaultValue="Rudhra Villas"><option>Rudhra Villas</option><option>Rudhra Heights</option><option>Rudhra Greens</option></select></span></label>
      <label className="items-start"><LineIcon name="message" /><span><small>Your Message</small><textarea name="message" defaultValue="I would like to know more about Rudhra Villas." rows={3} /></span></label>
      <button className="primary-button" type="submit">Send Enquiry <LineIcon name="send" /></button>
      <div className="enquiry-or"><span>or</span></div>
      <a className="whatsapp-link" href="https://wa.me/919100012345">Chat with us on WhatsApp <strong>WA</strong></a>
      <p className={`form-success ${sent ? "is-visible" : ""}`} role="status">Enquiry received. We’ll contact you shortly.</p>
    </form>
  );
}
