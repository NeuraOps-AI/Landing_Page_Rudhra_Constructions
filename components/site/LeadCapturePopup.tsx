"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { OPEN_LEAD_POPUP_EVENT } from "@/lib/lead-popup";
import { createCrmLead } from "@/lib/crm";
import { trackLead } from "@/lib/analytics";
import { useCrmProjects } from "./CrmProjectsProvider";
import { LineIcon } from "./LineIcon";

export function LeadCapturePopup() {
  const { projects } = useCrmProjects();
  const firstProjectId = projects[0]?.id ?? "";
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [projectId, setProjectId] = useState(() => firstProjectId);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [interestError, setInterestError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const firstPromptShown = useRef(false);
  const footerPromptShown = useRef(false);
  const submittedRef = useRef(false);
  const firstProjectRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const activeProjectId = projects.some((project) => project.id === projectId) ? projectId : firstProjectId;
  const selectedProject = projects.find((project) => project.id === activeProjectId);

  useEffect(() => {
    const openFromAction = () => {
      submittedRef.current = false;
      setStep(0);
      setSubmitted(false);
      setProjectId(firstProjectId);
      setName("");
      setPhone("");
      setInterestError(false);
      setSubmitting(false);
      setSubmitError("");
      setOpen(true);
    };
    const openFromHash = () => {
      if (window.location.hash === "#enquire") openFromAction();
    };
    document.addEventListener(OPEN_LEAD_POPUP_EVENT, openFromAction);
    window.addEventListener("hashchange", openFromHash);
    openFromHash();
    return () => {
      document.removeEventListener(OPEN_LEAD_POPUP_EVENT, openFromAction);
      window.removeEventListener("hashchange", openFromHash);
    };
  }, [firstProjectId]);

  useEffect(() => {
    const afterFeaturedProjects = document.querySelector(".lifestyle-carousel-section");
    const homeFooter = document.querySelector(".full-video-hero") ? document.querySelector(".site-footer") : null;
    if (!afterFeaturedProjects && !homeFooter) return;

    const firstPromptObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || firstPromptShown.current || submittedRef.current) return;
        firstPromptShown.current = true;
        setOpen(true);
        firstPromptObserver.disconnect();
      },
      { threshold: 0.08, rootMargin: "0px 0px -18%" },
    );

    const footerPromptObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || !firstPromptShown.current || footerPromptShown.current || submittedRef.current) return;
        footerPromptShown.current = true;
        setOpen(true);
        footerPromptObserver.disconnect();
      },
      { threshold: 0.12 },
    );

    if (afterFeaturedProjects) firstPromptObserver.observe(afterFeaturedProjects);
    if (homeFooter) footerPromptObserver.observe(homeFooter);
    return () => {
      firstPromptObserver.disconnect();
      footerPromptObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const handleKeyboard = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        if (window.location.hash === "#enquire") {
          window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
        }
      }
    };
    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener("keydown", handleKeyboard);
      previouslyFocused?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open || submitted) return;
    const frame = window.requestAnimationFrame(() => {
      if (step === 0) firstProjectRef.current?.focus();
      else nameRef.current?.focus();
    });
    return () => window.cancelAnimationFrame(frame);
  }, [open, step, submitted]);

  const close = () => {
    setOpen(false);
    if (window.location.hash === "#enquire") {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    }
  };

  const submitStep = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError("");

    if (step === 0) {
      const missingInterest = !activeProjectId;
      setInterestError(missingInterest);
      if (missingInterest) return;
      setStep(1);
      return;
    }

    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setSubmitting(true);
    try {
      await createCrmLead({ name, phone, projectId: activeProjectId });
      trackLead("lead_popup", selectedProject?.name);
      submittedRef.current = true;
      setSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Unable to submit enquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return <span className="lead-popup-mount" aria-hidden="true" hidden />;

  return (
    <div className="lead-popup-backdrop">
      <div className="lead-popup-dialog" role="dialog" aria-modal="false" aria-labelledby="lead-popup-title">
        <button type="button" className="lead-popup-close" onClick={close} aria-label="Close enquiry popup"><LineIcon name="close" /></button>

        {!submitted ? (
          <>
            <header className="lead-popup-header">
              <p>Rudhra Constructions</p>
              <div className="lead-popup-progress" aria-hidden="true">
                <span className="is-active" />
                <span className={step === 1 ? "is-active" : ""} />
              </div>
              <span aria-live="polite">Step {step + 1} of 2</span>
              <h2 id="lead-popup-title">{step === 0 ? "Choose Your Project" : "Let’s Connect"}</h2>
              <div>{step === 0 ? "Select an ongoing Rudhra project." : "Share your details and our project team will contact you shortly."}</div>
              {step === 1 ? <strong className="lead-selection-summary">{selectedProject?.name}</strong> : null}
            </header>

            <form className="lead-popup-form" onSubmit={submitStep}>
              {step === 0 ? (
                <div className="lead-project-select lead-project-select-only">
                    <label id="lead-project-label">Select an ongoing project</label>
                    <div
                      className={`lead-project-radio-grid ${interestError ? "is-invalid" : ""}`}
                      role="radiogroup"
                      aria-labelledby="lead-project-label"
                      aria-describedby={interestError ? "lead-project-error" : undefined}
                    >
                      {projects.map((project, index) => (
                        <label key={project.id} className={activeProjectId === project.id ? "is-selected" : ""}>
                          <input
                            ref={index === 0 ? firstProjectRef : undefined}
                            type="radio"
                            name="lead-project"
                            value={project.id}
                            checked={activeProjectId === project.id}
                            onChange={() => { setProjectId(project.id); setInterestError(false); }}
                          />
                          <span className="lead-radio-mark" aria-hidden="true"><i /></span>
                          <strong>{project.name}</strong>
                        </label>
                      ))}
                    </div>
                    {interestError ? <small id="lead-project-error">Please select an ongoing project.</small> : null}
                </div>
              ) : (
                <div className="lead-contact-fields">
                  <label className="lead-field-group">
                    <span>Full name</span>
                    <span className="lead-popup-input">
                      <LineIcon name="lead-user" />
                      <input ref={nameRef} name="lead-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Enter your full name" autoComplete="name" minLength={2} required />
                    </span>
                  </label>

                  <label className="lead-field-group">
                    <span>Phone number</span>
                    <span className="lead-popup-input lead-phone-input">
                      <LineIcon name="lead-phone" />
                      <b>+91</b>
                      <input
                        name="lead-phone"
                        type="tel"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value.replace(/\D/g, "").slice(0, 10))}
                        placeholder="Enter your phone number"
                        autoComplete="tel"
                        inputMode="numeric"
                        pattern="[0-9]{10}"
                        title="Enter a valid 10-digit phone number"
                        required
                      />
                    </span>
                  </label>
                </div>
              )}

              <div className="lead-popup-actions">
                <button type="submit" className="lead-popup-next" disabled={submitting}>{step === 0 ? "Continue" : submitting ? "Submitting…" : "Request a Callback"}<LineIcon name="arrow-right" /></button>
                {step === 1 ? <button type="button" className="lead-popup-back" onClick={() => setStep(0)} disabled={submitting}><LineIcon name="arrow-left" /> Back</button> : null}
              </div>
              {submitError ? <p className="form-status is-error" role="alert">{submitError}</p> : null}
            </form>
            <p className="lead-popup-privacy"><LineIcon name="lead-shield" />Your information is secure with us.</p>
          </>
        ) : (
          <div className="lead-popup-success" role="status">
            <span><LineIcon name="lead-shield" /></span>
            <p>Callback Requested</p>
            <h2 id="lead-popup-title">Thank you, {name.split(" ")[0]}.</h2>
            <div>Our team will contact you shortly about <strong>{selectedProject?.name}</strong>.</div>
            <button type="button" className="lead-popup-next" onClick={close}>Continue Exploring <LineIcon name="arrow-right" /></button>
          </div>
        )}
      </div>
    </div>
  );
}
