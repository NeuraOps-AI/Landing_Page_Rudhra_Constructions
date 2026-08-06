"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { OPEN_LEAD_POPUP_EVENT } from "@/lib/lead-popup";
import { LineIcon } from "./LineIcon";

type LeadProject = {
  name: string;
  status: "Ongoing" | "Upcoming";
};

type LeadCapturePopupProps = {
  projects: LeadProject[];
};

const steps = [
  { icon: "user", title: "What’s your full name?", description: "This helps us personalize your experience." },
  { icon: "phone", title: "What’s your phone number?", description: "Our project team will connect with you shortly." },
  { icon: "building", title: "Which project interests you?", description: "Choose from our ongoing and upcoming developments." },
];

export function LeadCapturePopup({ projects }: LeadCapturePopupProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("");
  const [interestError, setInterestError] = useState(false);
  const firstPromptShown = useRef(false);
  const footerPromptShown = useRef(false);
  const submittedRef = useRef(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const openFromAction = () => {
      submittedRef.current = false;
      setStep(0);
      setSubmitted(false);
      setName("");
      setPhone("");
      setInterest("");
      setInterestError(false);
      setOpen(true);
    };
    window.addEventListener(OPEN_LEAD_POPUP_EVENT, openFromAction);
    return () => window.removeEventListener(OPEN_LEAD_POPUP_EVENT, openFromAction);
  }, []);

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

    const focusFrame = window.requestAnimationFrame(() => fieldRef.current?.focus());
    const handleKeyboard = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", handleKeyboard);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyboard);
      previouslyFocused?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open || submitted) return;
    const frame = window.requestAnimationFrame(() => fieldRef.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [open, step, submitted]);

  const close = () => setOpen(false);

  const submitStep = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    if (step === 2 && !interest) {
      setInterestError(true);
      return;
    }
    if (step < 2) setStep((value) => value + 1);
    else {
      submittedRef.current = true;
      setSubmitted(true);
    }
  };

  const handleProjectKeyDown = (event: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowRight" && event.key !== "ArrowUp" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const direction = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (index + direction + projects.length) % projects.length;
    setInterest(projects[nextIndex].name);
    const radios = dialogRef.current?.querySelectorAll<HTMLInputElement>('input[name="lead-project"]');
    radios?.[nextIndex]?.focus();
  };

  if (!open) return null;

  const currentStep = steps[step];

  return (
    <div className="lead-popup-backdrop">
      <div ref={dialogRef} className="lead-popup-dialog" role="dialog" aria-modal="false" aria-labelledby="lead-popup-title">
        <button type="button" className="lead-popup-close" onClick={close} aria-label="Close enquiry popup">×</button>

        {!submitted ? (
          <>
            <header className="lead-popup-header">
              <p>Rudhra Constructions</p>
              <h2 id="lead-popup-title">Let’s Get Started</h2>
              <span aria-live="polite">Step {step + 1} of {steps.length}</span>
            </header>

            <div className="lead-popup-progress" aria-hidden="true">
              <i style={{ width: `${(step / (steps.length - 1)) * 100}%` }} />
              {steps.map((item, index) => <span key={item.title} className={index <= step ? "is-active" : ""} />)}
            </div>

            <form className="lead-popup-form" onSubmit={submitStep}>
              <div className="lead-popup-step-icon"><LineIcon name={currentStep.icon} /></div>
              <div className="lead-popup-copy">
                <h3>{currentStep.title}</h3>
                <p>{currentStep.description}</p>
              </div>

              {step === 0 && (
                <label className="lead-popup-input">
                  <LineIcon name="user" />
                  <span className="sr-only">Full name</span>
                  <input ref={fieldRef} name="lead-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Enter your full name" autoComplete="name" minLength={2} required />
                </label>
              )}

              {step === 1 && (
                <label className="lead-popup-input">
                  <LineIcon name="phone" />
                  <span className="sr-only">Phone number</span>
                  <input ref={fieldRef} name="lead-phone" type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Enter your phone number" autoComplete="tel" inputMode="tel" pattern="[0-9+() -]{10,18}" title="Enter a valid phone number" required />
                </label>
              )}

              {step === 2 && (
                <div className="lead-project-options" role="radiogroup" aria-label="Interested project" aria-describedby={interestError ? "lead-project-error" : undefined}>
                  {projects.map((project, index) => (
                    <label key={`${project.status}-${project.name}`} className={interest === project.name ? "is-selected" : ""}>
                      <input
                        ref={index === 0 ? fieldRef : undefined}
                        type="radio"
                        name="lead-project"
                        value={project.name}
                        checked={interest === project.name}
                        onChange={() => { setInterest(project.name); setInterestError(false); }}
                        onKeyDown={(event) => handleProjectKeyDown(event, index)}
                      />
                      <span><strong>{project.name}</strong><small>{project.status} project</small></span>
                      <i aria-hidden="true">✓</i>
                    </label>
                  ))}
                  {interestError && <p id="lead-project-error">Please select a project.</p>}
                </div>
              )}

              <div className="lead-popup-actions">
                {step > 0 && <button type="button" className="lead-popup-back" onClick={() => setStep((value) => value - 1)}>Back</button>}
                <button type="submit" className="lead-popup-next">{step === 2 ? "Send Enquiry" : "Next"}<span aria-hidden="true">→</span></button>
              </div>
            </form>
            <p className="lead-popup-privacy"><LineIcon name="shield" />Your information is safe with us.</p>
          </>
        ) : (
          <div className="lead-popup-success" role="status">
            <span><LineIcon name="shield" /></span>
            <p>Enquiry Received</p>
            <h2 id="lead-popup-title">Thank you, {name.split(" ")[0]}.</h2>
            <div>Our team will contact you shortly about <strong>{interest}</strong>.</div>
            <button type="button" className="lead-popup-next" onClick={close}>Continue Exploring <span aria-hidden="true">→</span></button>
          </div>
        )}
      </div>
    </div>
  );
}
