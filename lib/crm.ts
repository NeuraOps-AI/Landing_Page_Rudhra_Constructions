export type CrmProject = {
  id: string;
  name: string;
};

export type CreateCrmLeadInput = {
  name: string;
  phone: string;
  projectId: string;
};

const DEFAULT_CRM_API_BASE = "https://dev-api.rudhra.neuraops.in/api/v1/integrations";
const CRM_API_BASE = (
  process.env.NEXT_PUBLIC_RUDHRA_CRM_API_URL ?? DEFAULT_CRM_API_BASE
).replace(/\/$/, "");

export const CRM_PROJECTS_URL = `${CRM_API_BASE}/projects`;
export const CRM_LEADS_URL = `${CRM_API_BASE}/leads`;

export const FALLBACK_CRM_PROJECTS: CrmProject[] = [
  { id: "ccee6bcb-a325-4e3a-b5fc-3f3f632986d1", name: "Park Avenue" },
  { id: "624d1c00-6b58-4265-9c1e-765548c77b20", name: "Royal Village 2" },
  { id: "a77864ee-3870-47ec-aff3-a8dc26596111", name: "Rudhra Estates" },
];

type JsonRecord = Record<string, unknown>;

const isRecord = (value: unknown): value is JsonRecord =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const readString = (record: JsonRecord, keys: string[]) => {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
};

const findProjectList = (payload: unknown): unknown[] => {
  if (Array.isArray(payload)) return payload;
  if (!isRecord(payload)) return [];

  const directCandidates = [payload.projects, payload.items, payload.results];
  for (const candidate of directCandidates) {
    if (Array.isArray(candidate)) return candidate;
  }

  if (Array.isArray(payload.data)) return payload.data;
  if (isRecord(payload.data)) {
    const nestedCandidates = [payload.data.projects, payload.data.items, payload.data.results];
    for (const candidate of nestedCandidates) {
      if (Array.isArray(candidate)) return candidate;
    }
  }

  return [];
};

const isActiveProject = (record: JsonRecord) => {
  if (record.is_active === false || record.active === false) return false;
  const status = readString(record, ["status", "project_status"]).toLowerCase();
  return !["inactive", "archived", "deleted", "cancelled", "canceled"].includes(status);
};

export function normalizeCrmProjects(payload: unknown): CrmProject[] {
  const projects = findProjectList(payload)
    .filter(isRecord)
    .filter(isActiveProject)
    .map((project) => ({
      id: readString(project, ["id", "project_id", "projectId", "uuid"]),
      name: readString(project, ["name", "project_name", "projectName", "title"]),
    }))
    .filter((project) => project.id && project.name);

  return Array.from(new Map(projects.map((project) => [project.id, project])).values());
}

const readApiError = async (response: Response) => {
  try {
    const payload: unknown = await response.json();
    if (isRecord(payload)) {
      return readString(payload, ["detail", "message", "error"]);
    }
  } catch {
    // The CRM can return an empty or non-JSON error response.
  }
  return "";
};

export async function fetchActiveCrmProjects(signal?: AbortSignal): Promise<CrmProject[]> {
  const response = await fetch(CRM_PROJECTS_URL, {
    method: "GET",
    headers: { Accept: "application/json" },
    cache: "no-store",
    signal,
  });

  if (!response.ok) {
    const message = await readApiError(response);
    throw new Error(message || `Unable to load active projects (${response.status})`);
  }

  const projects = normalizeCrmProjects(await response.json());
  if (!projects.length) throw new Error("The CRM returned no active projects.");
  return projects;
}

export function formatCrmPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  const localNumber = digits.length === 12 && digits.startsWith("91") ? digits.slice(2) : digits;
  if (localNumber.length === 10) return `+91 ${localNumber.slice(0, 5)} ${localNumber.slice(5)}`;
  return phone.trim();
}

export async function createCrmLead(input: CreateCrmLeadInput, signal?: AbortSignal) {
  const phoneDigits = input.phone.replace(/\D/g, "");
  const localPhoneDigits = phoneDigits.length === 12 && phoneDigits.startsWith("91") ? phoneDigits.slice(2) : phoneDigits;
  if (input.name.trim().length < 2) throw new Error("Please enter your full name.");
  if (localPhoneDigits.length !== 10) throw new Error("Please enter a valid 10-digit phone number.");
  if (!input.projectId) throw new Error("Please select a project.");

  const response = await fetch(CRM_LEADS_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: input.name.trim(),
      phone: formatCrmPhone(input.phone),
      project_id: input.projectId,
    }),
    signal,
  });

  if (!response.ok) {
    const message = await readApiError(response);
    throw new Error(message || "Unable to submit enquiry. Please try again.");
  }

  try {
    return await response.json() as unknown;
  } catch {
    return null;
  }
}
