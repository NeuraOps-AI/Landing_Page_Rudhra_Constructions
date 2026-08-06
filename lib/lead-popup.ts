export const OPEN_LEAD_POPUP_EVENT = "rudhra:open-lead-popup";

export const openLeadPopup = () => {
  window.dispatchEvent(new Event(OPEN_LEAD_POPUP_EVENT));
};
