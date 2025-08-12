export const openLeadModal = () => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("open-lead-modal"));
};
