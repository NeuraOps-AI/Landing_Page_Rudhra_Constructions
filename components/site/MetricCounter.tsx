"use client";

import { useEffect, useRef, useState } from "react";

type MetricCounterProps = {
  value: number;
  suffix?: string;
};

export function MetricCounter({ value, suffix = "+" }: MetricCounterProps) {
  const counterRef = useRef<HTMLElement>(null);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const element = counterRef.current;
    if (!element) return;

    let animationFrame = 0;
    let hasAnimated = false;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const runCounter = () => {
      if (hasAnimated) return;
      hasAnimated = true;

      if (reduceMotion) {
        setDisplayValue(value);
        return;
      }

      const duration = value >= 1000 ? 1900 : 1500;
      const startTime = performance.now();

      const update = (time: number) => {
        const progress = Math.min((time - startTime) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 4);
        setDisplayValue(Math.round(value * easedProgress));

        if (progress < 1) animationFrame = window.requestAnimationFrame(update);
      };

      animationFrame = window.requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        runCounter();
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(animationFrame);
    };
  }, [value]);

  return (
    <dt ref={counterRef} className="metric-number" aria-label={`${value}${suffix}`}>
      <span aria-hidden="true">{displayValue}</span>
      <sup aria-hidden="true">{suffix}</sup>
    </dt>
  );
}
