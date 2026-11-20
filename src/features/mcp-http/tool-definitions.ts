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
    name: "get_design_spec",
    description:
      "Get a self-contained design specification (markdown + tokens JSON) to apply a published style to the user's current project. No other files are required.",
    inputSchema: {
      type: "object",
      properties: {
        styleId: { type: "string", description: "Style id, for example swiss-international" },
        lang: { type: "string", description: "ru (default) or en" },
        surface: { type: "string", description: "agent (default) or constructor" },
      },
      required: ["styleId"],
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
