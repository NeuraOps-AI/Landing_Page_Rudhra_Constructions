"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { OPEN_LEAD_POPUP_EVENT } from "@/lib/lead-popup";
import { LineIcon } from "./LineIcon";

type LeadProject = {
  name: string;
  status: "Ongoing" | "Upcoming";
};

type LeadCapturePopupProps = {
  projects: LeadProject[];
};

export function LeadCapturePopup({ projects }: LeadCapturePopupProps) {
  const ongoingProjects = projects.filter((project) => project.status === "Ongoing");
  const firstOngoingProject = ongoingProjects[0]?.name ?? "";
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [interest, setInterest] = useState(() => firstOngoingProject);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [interestError, setInterestError] = useState(false);
  const firstPromptShown = useRef(false);
  const footerPromptShown = useRef(false);
  const submittedRef = useRef(false);
  const firstProjectRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const openFromAction = () => {
      submittedRef.current = false;
      setStep(0);
      setSubmitted(false);
      setInterest(firstOngoingProject);
      setName("");
      setPhone("");
      setInterestError(false);
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
  }, [firstOngoingProject]);

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

  const submitStep = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (step === 0) {
      const missingInterest = !interest;
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
    submittedRef.current = true;
    setSubmitted(true);
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
              {step === 1 ? <strong className="lead-selection-summary">{interest}</strong> : null}
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
                      {ongoingProjects.map((project, index) => (
                        <label key={project.name} className={interest === project.name ? "is-selected" : ""}>
                          <input
                            ref={index === 0 ? firstProjectRef : undefined}
                            type="radio"
                            name="lead-project"
                            value={project.name}
                            checked={interest === project.name}
                            onChange={() => { setInterest(project.name); setInterestError(false); }}
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
                <button type="submit" className="lead-popup-next">{step === 0 ? "Continue" : "Request a Callback"}<LineIcon name="arrow-right" /></button>
                {step === 1 ? <button type="button" className="lead-popup-back" onClick={() => setStep(0)}><LineIcon name="arrow-left" /> Back</button> : null}
              </div>
            </form>
            <p className="lead-popup-privacy"><LineIcon name="lead-shield" />Your information is secure with us.</p>
          </>
        ) : (
          <div className="lead-popup-success" role="status">
            <span><LineIcon name="lead-shield" /></span>
            <p>Callback Requested</p>
            <h2 id="lead-popup-title">Thank you, {name.split(" ")[0]}.</h2>
            <div>Our team will contact you shortly about <strong>{interest}</strong>.</div>
            <button type="button" className="lead-popup-next" onClick={close}>Continue Exploring <LineIcon name="arrow-right" /></button>
          </div>
        )}
      </div>
    </div>
  );
}
