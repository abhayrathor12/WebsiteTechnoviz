import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  /** id of the element that names the dialog (for screen readers) */
  labelledBy?: string;
  size?: "small" | "large";
  /** show the ✕ button in the corner */
  showClose?: boolean;
  children: ReactNode;
}

/** Popup window with a dark backdrop. Closes on Esc and on a click outside. */
export default function Modal({
  open,
  onClose,
  labelledBy,
  size = "small",
  showClose = false,
  children,
}: ModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus the main button (or the card) so Enter / Esc work right away
    const card = cardRef.current;
    const primary = card?.querySelector<HTMLElement>("[data-autofocus]");
    (primary ?? card)?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="mp-modal" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        ref={cardRef}
        className={`mp-modal-card mp-modal-card--${size}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
      >
        {showClose && (
          <button className="mp-modal-close" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        )}
        {children}
      </div>
    </div>
  );
}
