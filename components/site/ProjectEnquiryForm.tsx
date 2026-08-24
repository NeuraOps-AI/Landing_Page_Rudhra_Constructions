"use client";

import { FormEvent, useState } from "react";
import { LineIcon } from "./LineIcon";

type ProjectEnquiryFormProps = {
  projectName: string;
};

export function ProjectEnquiryForm({ projectName }: ProjectEnquiryFormProps) {
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
      <label><LineIcon name="user" /><span><small>Full Name</small><input name="name" placeholder="Enter your name" autoComplete="name" required /></span></label>
      <label><LineIcon name="phone" /><span><small>Phone Number</small><input name="phone" type="tel" placeholder="Enter your phone number" autoComplete="tel" required /></span></label>
      <label><LineIcon name="mail" /><span><small>Email Address</small><input type="email" name="email" placeholder="Enter your email address" autoComplete="email" required /></span></label>
      <label><LineIcon name="building" /><span><small>I’m interested in</small><input name="project" value={projectName} readOnly /></span></label>
      <label className="items-start"><LineIcon name="message" /><span><small>Your Message</small><textarea name="message" placeholder={`I would like to know more about ${projectName}.`} rows={3} /></span></label>
      <button className="primary-button" type="submit">Send Enquiry <LineIcon name="send" /></button>
      <div className="enquiry-or"><span>or</span></div>
      <a className="whatsapp-link" href="https://wa.me/918309475836">Chat with us on WhatsApp <span aria-hidden="true"><LineIcon name="whatsapp" /></span></a>
      <p className={`form-success ${sent ? "is-visible" : ""}`} role="status">Enquiry received. We’ll contact you shortly.</p>
    </form>
  );
}
