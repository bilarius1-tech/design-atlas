/** Default canonical host after Phase 5 cutover. Override with DESIGN_ATLAS_API_BASE. */
export const DEFAULT_API_BASE = "https://design.vaybik.ru";

export type EnvMap = Record<string, string | undefined>;

export function getApiBase(env: EnvMap = process.env): string {
  const raw = env.DESIGN_ATLAS_API_BASE?.trim() || DEFAULT_API_BASE;
  return raw.replace(/\/$/, "");
}

export async function apiGet(
  pathname: string,
  env: EnvMap = process.env,
  fetchImpl: typeof fetch = fetch,
): Promise<unknown> {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const url = `${getApiBase(env)}${path}`;
  const response = await fetchImpl(url, {
    method: "GET",
    headers: { accept: "application/json" },
  });
  const text = await response.text();
  let body: unknown = text;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = { error: "invalid_json", message: text.slice(0, 500) };
  }
  if (!response.ok) {
    const message =
      typeof body === "object" && body && "message" in body
        ? String((body as { message: unknown }).message)
        : `${response.status} ${response.statusText}`;
    throw new Error(message);
  }
  return body;
}

export const TOOL_DEFINITIONS = [
  {
    name: "list_styles",
    description: "List published Design Atlas visual styles (id, title, status).",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "get_style",
    description: "Get metadata for one published style.",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "string", description: "Style id, for example swiss-international" },
      },
      required: ["id"],
      additionalProperties: false,
    },
  },
  {
    name: "get_tokens",
    description:
      "Get tokens. Pass styleId for a catalog style, themeId for a project theme (vaybik), or shell=true for the Atlas chrome.",
    inputSchema: {
      type: "object",
      properties: {
        styleId: { type: "string" },
        themeId: { type: "string" },
        shell: { type: "boolean" },
      },
      additionalProperties: false,
    },
  },
  {
    name: "list_components",
    description: "List Atlas shell UI components and their documented states.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "get_component",
    description: "Get one shell component (states, variants, markdown spec).",
    inputSchema: {
      type: "object",
      properties: { name: { type: "string", description: "Component id, for example button" } },
      required: ["name"],
      additionalProperties: false,
    },
  },
  {
    name: "search_guidelines",
    description: "Search styles, themes, components, and templates by a query string.",
    inputSchema: {
      type: "object",
      properties: { q: { type: "string" } },
      required: ["q"],
      additionalProperties: false,
    },
  },
  {
    name: "get_prompt",
    description: "Get style guideline markdown including Agent and Constructor prompts (RU/EN).",
    inputSchema: {
      type: "object",
      properties: { styleId: { type: "string" } },
      required: ["styleId"],
      additionalProperties: false,
    },
  },
  {
    name: "get_template",
    description: "Get a page template used in Studio previews.",
    inputSchema: {
      type: "object",
      properties: { id: { type: "string" } },
      required: ["id"],
      additionalProperties: false,
    },
  },
  {
    name: "get_theme",
    description: "Get a project theme. Use themeId=vaybik for Vaybik studio products.",
    inputSchema: {
      type: "object",
      properties: { id: { type: "string" } },
      required: ["id"],
      additionalProperties: false,
    },
  },
] as const;

export type ToolName = (typeof TOOL_DEFINITIONS)[number]["name"];

export async function callTool(
  name: string,
  args: Record<string, unknown> = {},
  env: EnvMap = process.env,
  fetchImpl: typeof fetch = fetch,
): Promise<unknown> {
  const get = (path: string) => apiGet(path, env, fetchImpl);

  switch (name) {
    case "list_styles":
      return get("/api/v1/styles");
    case "get_style":
      return get(`/api/v1/styles/${encodeURIComponent(String(args.id ?? ""))}`);
    case "get_tokens":
      if (args.shell === true) return get("/api/v1/shell/tokens");
      if (typeof args.themeId === "string" && args.themeId) {
        return get(`/api/v1/themes/${encodeURIComponent(args.themeId)}`);
      }
      if (typeof args.styleId === "string" && args.styleId) {
        return get(`/api/v1/styles/${encodeURIComponent(args.styleId)}/tokens`);
      }
      throw new Error("get_tokens requires styleId, themeId, or shell=true");
    case "list_components":
      return get("/api/v1/components");
    case "get_component":
      return get(`/api/v1/components/${encodeURIComponent(String(args.name ?? ""))}`);
    case "search_guidelines":
      return get(`/api/v1/search?q=${encodeURIComponent(String(args.q ?? ""))}`);
    case "get_prompt":
      return get(`/api/v1/styles/${encodeURIComponent(String(args.styleId ?? ""))}/guidelines`);
    case "get_template":
      return get(`/api/v1/templates/${encodeURIComponent(String(args.id ?? ""))}`);
    case "get_theme":
      return get(`/api/v1/themes/${encodeURIComponent(String(args.id ?? ""))}`);
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}
