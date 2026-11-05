import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

import { portalApi } from "./api";
import type { Progress } from "./api";

interface ProgressState {
  progress: Progress | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

const ProgressContext = createContext<ProgressState | null>(null);

/** Participant progress (lock state + marks), shared by the sidebar and the pages. */
export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<Progress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    const { data, error: err } = await portalApi.progress();
    if (data) {
      setProgress(data);
      setError(null);
    } else {
      setError(err);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const value = useMemo(
    () => ({ progress, loading, error, refresh }),
    [progress, loading, error, refresh]
  );
  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useProgress(): ProgressState {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used inside <ProgressProvider>");
  return ctx;
}
