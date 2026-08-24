"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { FALLBACK_CRM_PROJECTS, fetchActiveCrmProjects, type CrmProject } from "@/lib/crm";

type CrmProjectsContextValue = {
  projects: CrmProject[];
  loading: boolean;
  usingFallback: boolean;
};

const CrmProjectsContext = createContext<CrmProjectsContextValue>({
  projects: FALLBACK_CRM_PROJECTS,
  loading: true,
  usingFallback: true,
});

export function CrmProjectsProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<CrmProject[]>(FALLBACK_CRM_PROJECTS);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    fetchActiveCrmProjects(controller.signal)
      .then((activeProjects) => {
        setProjects(activeProjects);
        setUsingFallback(false);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setProjects(FALLBACK_CRM_PROJECTS);
        setUsingFallback(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, []);

  const value = useMemo(() => ({ projects, loading, usingFallback }), [loading, projects, usingFallback]);
  return <CrmProjectsContext.Provider value={value}>{children}</CrmProjectsContext.Provider>;
}

export function useCrmProjects() {
  return useContext(CrmProjectsContext);
}
