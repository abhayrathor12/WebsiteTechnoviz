import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { AlertTriangle, CheckCircle2, Info, Trash2 } from "lucide-react";

import Modal from "./components/Modal";

export type DialogTone = "info" | "success" | "warn" | "danger";

export interface DialogOptions {
  title: string;
  message: ReactNode;
  tone?: DialogTone;
  confirmText?: string;
  cancelText?: string;
}

interface DialogApi {
  /** Popup with OK / Cancel. Resolves true when confirmed. */
  confirm: (options: DialogOptions) => Promise<boolean>;
  /** Popup with a single OK button. */
  alert: (options: DialogOptions) => Promise<void>;
}

interface OpenDialog extends DialogOptions {
  kind: "confirm" | "alert";
}

const ICONS: Record<DialogTone, ReactNode> = {
  info: <Info size={26} />,
  success: <CheckCircle2 size={26} />,
  warn: <AlertTriangle size={26} />,
  danger: <Trash2 size={24} />,
};

const DialogContext = createContext<DialogApi | null>(null);

/** Replaces window.alert / window.confirm with styled popups. */
export function DialogProvider({ children }: { children: ReactNode }) {
  const [dialog, setDialog] = useState<OpenDialog | null>(null);
  const resolver = useRef<((value: boolean) => void) | null>(null);

  const open = useCallback((kind: OpenDialog["kind"], options: DialogOptions) => {
    resolver.current?.(false); // a new popup replaces an open one
    return new Promise<boolean>((resolve) => {
      resolver.current = resolve;
      setDialog({ ...options, kind });
    });
  }, []);

  const close = useCallback((result: boolean) => {
    resolver.current?.(result);
    resolver.current = null;
    setDialog(null);
  }, []);

  const api = useMemo<DialogApi>(
    () => ({
      confirm: (options) => open("confirm", options),
      alert: async (options) => {
        await open("alert", options);
      },
    }),
    [open]
  );

  const tone = dialog?.tone ?? "info";

  return (
    <DialogContext.Provider value={api}>
      {children}
      <Modal open={dialog !== null} onClose={() => close(false)} labelledBy="mp-dialog-title">
        {dialog && (
          <div className="mp-dialog">
            <div className={`mp-dialog-icon is-${tone}`} aria-hidden>
              {ICONS[tone]}
            </div>
            <h2 id="mp-dialog-title">{dialog.title}</h2>
            <div className="mp-dialog-message">{dialog.message}</div>
            <div className="mp-dialog-actions">
              {dialog.kind === "confirm" && (
                <button className="mp-btn mp-btn--ghost" onClick={() => close(false)}>
                  {dialog.cancelText ?? "Cancel"}
                </button>
              )}
              <button
                className={`mp-btn ${tone === "danger" ? "mp-btn--danger" : "mp-btn--primary"} mp-btn--inline`}
                onClick={() => close(true)}
                data-autofocus
              >
                {dialog.confirmText ?? "OK"}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </DialogContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useDialog(): DialogApi {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error("useDialog must be used inside <DialogProvider>");
  return ctx;
}
