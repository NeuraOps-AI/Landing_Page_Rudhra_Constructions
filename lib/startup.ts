export const STARTUP_COMPLETE_EVENT = "rudhra:startup-complete";

export const markStartupComplete = () => {
  document.documentElement.dataset.startupComplete = "true";
  window.dispatchEvent(new Event(STARTUP_COMPLETE_EVENT));
};

export const hasStartupCompleted = () =>
  document.documentElement.dataset.startupComplete === "true";
