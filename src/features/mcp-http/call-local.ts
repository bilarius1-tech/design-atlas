import { ApiError } from "@/features/api-v1/service";
import {
  getComponent,
  getDesignSpec,
  getShellTokens,
  getStyle,
  getStyleGuidelines,
  getStyleTokens,
  getTemplate,
  getTheme,
  listComponents,
  listStyles,
  searchCatalog,
} from "@/features/api-v1/service";

/**
 * Dispatch an MCP tool against in-process /api/v1 services.
 * Used by the HTTP MCP endpoint so the container never loops out to its own public URL.
 */
export function callLocalTool(name: string, args: Record<string, unknown> = {}): unknown {
  switch (name) {
    case "list_styles":
      return listStyles();
    case "get_style":
      return getStyle(String(args.id ?? ""));
    case "get_tokens":
      if (args.shell === true) return getShellTokens();
      if (typeof args.themeId === "string" && args.themeId) {
        return getTheme(args.themeId);
      }
      if (typeof args.styleId === "string" && args.styleId) {
        return getStyleTokens(args.styleId);
      }
      throw new ApiError(
        "invalid_query",
        "get_tokens requires styleId, themeId, or shell=true",
        400,
      );
    case "list_components":
      return listComponents();
    case "get_component":
      return getComponent(String(args.name ?? ""));
    case "search_guidelines":
      return searchCatalog(String(args.q ?? ""));
    case "get_prompt":
      return getStyleGuidelines(String(args.styleId ?? ""));
    case "get_design_spec":
      return getDesignSpec(String(args.styleId ?? ""), {
        lang: typeof args.lang === "string" ? args.lang : undefined,
        surface: typeof args.surface === "string" ? args.surface : undefined,
      });
    case "get_template":
      return getTemplate(String(args.id ?? ""));
    case "get_theme":
      return getTheme(String(args.id ?? ""));
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

export function toolErrorMessage(error: unknown): string {
  if (error instanceof ApiError) return error.message;
  if (error instanceof Error) return error.message;
  return String(error);
}
