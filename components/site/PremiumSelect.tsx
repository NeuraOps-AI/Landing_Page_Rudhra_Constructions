"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { LineIcon } from "./LineIcon";

type PremiumSelectProps = {
  name: string;
  value: string;
  options: string[];
  placeholder: string;
  invalid?: boolean;
  onChange: (value: string) => void;
};

export function PremiumSelect({ name, value, options, placeholder, invalid = false, onChange }: PremiumSelectProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const listboxId = useId();
  const errorId = `${listboxId}-error`;

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, []);

  useEffect(() => {
    if (!open) return;
    const frame = window.requestAnimationFrame(() => optionRefs.current[activeIndex]?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [activeIndex, open]);

  const openMenu = (direction: 1 | -1 = 1) => {
    const selectedIndex = options.indexOf(value);
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : direction === 1 ? 0 : options.length - 1);
    setOpen(true);
  };

  const choose = (index: number) => {
    onChange(options[index]);
    setActiveIndex(index);
    setOpen(false);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  };

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      openMenu(event.key === "ArrowDown" ? 1 : -1);
    }
    if (event.key === "Escape") setOpen(false);
  };

  const handleOptionKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const direction = event.key === "ArrowDown" ? 1 : -1;
      setActiveIndex((index + direction + options.length) % options.length);
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      setActiveIndex(event.key === "Home" ? 0 : options.length - 1);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      choose(index);
    } else if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    } else if (event.key === "Tab") {
      setOpen(false);
    }
  };

  return (
    <div ref={rootRef} className={`premium-select ${open ? "is-open" : ""} ${invalid ? "is-invalid" : ""}`}>
      <input type="hidden" name={name} value={value} />
      <div className="premium-select-field">
        <LineIcon name="building" />
        <button
          ref={triggerRef}
          type="button"
          className="premium-select-trigger"
          role="combobox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-haspopup="listbox"
          aria-invalid={invalid || undefined}
          aria-describedby={invalid ? errorId : undefined}
          onClick={() => open ? setOpen(false) : openMenu()}
          onKeyDown={handleTriggerKeyDown}
        >
          <span className={value ? "" : "is-placeholder"}>{value || placeholder}</span>
          <svg className="premium-select-chevron" viewBox="0 0 12 8" aria-hidden="true"><path d="m1 1 5 5 5-5" /></svg>
        </button>
      </div>
      <div id={listboxId} className="premium-select-menu" role="listbox" aria-label={placeholder}>
        <span className="premium-select-menu-label">Select an option</span>
        {options.map((option, index) => (
          <button
            key={option}
            ref={(element) => { optionRefs.current[index] = element; }}
            type="button"
            role="option"
            aria-selected={value === option}
            tabIndex={activeIndex === index ? 0 : -1}
            className={activeIndex === index ? "is-active" : ""}
            onMouseEnter={() => setActiveIndex(index)}
            onClick={() => choose(index)}
            onKeyDown={(event) => handleOptionKeyDown(event, index)}
          >
            <span>{option}</span>
            <strong aria-hidden="true">✓</strong>
          </button>
        ))}
      </div>
      {invalid && <p id={errorId} className="premium-select-error">Please select a project.</p>}
    </div>
  );
}
