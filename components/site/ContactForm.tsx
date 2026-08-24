"use client";

import { FormEvent, useState } from "react";
import { createCrmLead } from "@/lib/crm";
import { useCrmProjects } from "./CrmProjectsProvider";
import { LineIcon } from "./LineIcon";
import { PremiumSelect } from "./PremiumSelect";

export function ContactForm() {
  const { projects, loading } = useCrmProjects();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [interest, setInterest] = useState("");
  const [interestError, setInterestError] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    if (!interest) {
      setInterestError(true);
      return;
    }

    const project = projects.find((item) => item.name === interest);
    if (!project) {
      setInterestError(true);
      return;
    }

    const formData = new FormData(form);
    setStatus("submitting");
    setStatusMessage("");
    try {
      await createCrmLead({
        name: String(formData.get("name") ?? ""),
        phone: String(formData.get("phone") ?? ""),
        projectId: project.id,
      });
      setStatus("success");
      setStatusMessage("Thank you. Our team will contact you shortly.");
      form.reset();
      setInterest("");
      setInterestError(false);
    } catch (error) {
      setStatus("error");
      setStatusMessage(error instanceof Error ? error.message : "Unable to submit your message. Please try again.");
    }
  };

  return (
    <form className="contact-form-card" onSubmit={submit}>
      <h2>Send Us a Message</h2>
      <p>Fill in the details below and our team will get back to you shortly.</p>
      <div className="form-two-column">
        <label><LineIcon name="user" /><span className="sr-only">Full name</span><input name="name" placeholder="Full Name" autoComplete="name" required /></label>
        <label><LineIcon name="phone" /><span className="sr-only">Phone number</span><input name="phone" type="tel" placeholder="Phone Number" autoComplete="tel" inputMode="numeric" pattern="(?:\+?91[ -]?)?[0-9]{10}" title="Enter a valid 10-digit phone number" required /></label>
      </div>
      <label><LineIcon name="mail" /><span className="sr-only">Email address</span><input type="email" name="email" placeholder="Email Address" autoComplete="email" required /></label>
      <PremiumSelect
        name="interest"
        value={interest}
        options={projects.map((project) => project.name)}
        placeholder={loading ? "Loading active projects…" : "Select a project"}
        invalid={interestError}
        onChange={(value) => {
          setInterest(value);
          setInterestError(false);
        }}
      />
      <label className="items-start"><LineIcon name="message" /><span className="sr-only">Message</span><textarea name="message" placeholder="Your Message" rows={4} required /></label>
      <label className="form-consent"><input type="checkbox" name="consent" required /><span>I agree to receive communications from Rudhra Constructions.</span></label>
      <button type="submit" className="primary-button" disabled={status === "submitting"}><LineIcon name="send" />{status === "submitting" ? "Sending…" : "Send Message"}</button>
      {status !== "idle" && status !== "submitting" ? <p className={`form-status ${status === "error" ? "is-error" : "is-success"}`} role={status === "error" ? "alert" : "status"}>{statusMessage}</p> : null}
    </form>
  );
}
