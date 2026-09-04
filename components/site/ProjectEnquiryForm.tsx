"use client";

import { FormEvent, useMemo, useState } from "react";
import { createCrmLead } from "@/lib/crm";
import { trackLead } from "@/lib/analytics";
import { useCrmProjects } from "./CrmProjectsProvider";
import { LineIcon } from "./LineIcon";
import { PremiumSelect } from "./PremiumSelect";

type ProjectEnquiryFormProps = {
  projectName: string;
};

export function ProjectEnquiryForm({ projectName }: ProjectEnquiryFormProps) {
  const { projects } = useCrmProjects();
  const matchedProject = useMemo(
    () => projects.find((project) => project.name.trim().toLowerCase() === projectName.trim().toLowerCase()),
    [projectName, projects],
  );
  const [selectedProjectName, setSelectedProjectName] = useState(projectName);
  const [projectError, setProjectError] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const activeProjectName = matchedProject?.name
    ?? (projects.some((project) => project.name === selectedProjectName) ? selectedProjectName : projects[0]?.name ?? "");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const crmProject = matchedProject ?? projects.find((project) => project.name === activeProjectName);
    if (!crmProject) {
      setProjectError(true);
      return;
    }

    const formData = new FormData(form);
    setStatus("submitting");
    setStatusMessage("");
    try {
      await createCrmLead({
        name: String(formData.get("name") ?? ""),
        phone: String(formData.get("phone") ?? ""),
        projectId: crmProject.id,
      });
      trackLead("project_enquiry_form", crmProject.name);
      setStatus("success");
      setStatusMessage("Enquiry received. We’ll contact you shortly.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setStatusMessage(error instanceof Error ? error.message : "Unable to submit your enquiry. Please try again.");
    }
  };

  return (
    <form className="project-enquiry-card" onSubmit={submit}>
      <h2>Interested in This Project?</h2>
      <p>Fill in your details and our team will get back to you shortly.</p>
      <label><LineIcon name="user" /><span><small>Full Name</small><input name="name" placeholder="Enter your name" autoComplete="name" required /></span></label>
      <label><LineIcon name="phone" /><span><small>Phone Number</small><input name="phone" type="tel" placeholder="Enter your phone number" autoComplete="tel" inputMode="numeric" pattern="(?:\+?91[ -]?)?[0-9]{10}" title="Enter a valid 10-digit phone number" required /></span></label>
      <label><LineIcon name="mail" /><span><small>Email Address</small><input type="email" name="email" placeholder="Enter your email address" autoComplete="email" required /></span></label>
      {matchedProject ? (
        <label><LineIcon name="building" /><span><small>I’m interested in</small><input name="project" value={matchedProject.name} readOnly /></span></label>
      ) : (
        <PremiumSelect
          name="project"
          value={activeProjectName}
          options={projects.map((project) => project.name)}
          placeholder="Select an active project"
          invalid={projectError}
          onChange={(value) => { setSelectedProjectName(value); setProjectError(false); }}
        />
      )}
      <label className="items-start"><LineIcon name="message" /><span><small>Your Message</small><textarea name="message" placeholder={`I would like to know more about ${projectName}.`} rows={3} /></span></label>
      <button className="primary-button" type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Sending…" : "Send Enquiry"} <LineIcon name="send" /></button>
      <div className="enquiry-or"><span>or</span></div>
      <a className="whatsapp-link" href="https://wa.me/918309475836">Chat with us on WhatsApp <span aria-hidden="true"><LineIcon name="whatsapp" /></span></a>
      {status !== "idle" && status !== "submitting" ? <p className={`form-status ${status === "error" ? "is-error" : "is-success"}`} role={status === "error" ? "alert" : "status"}>{statusMessage}</p> : null}
    </form>
  );
}
