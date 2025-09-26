export const openDiagnosticModal = () => {
  window.dispatchEvent(new CustomEvent('open-diagnostic-modal'));
};