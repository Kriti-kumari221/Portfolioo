import { useEffect } from "react";

/**
 * Shared behaviour for full-screen overlays:
 * locks page scroll while open and closes on the Escape key.
 */
export function useModal(isOpen: boolean, onClose: () => void) {
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);
}
