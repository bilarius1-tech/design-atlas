import { TOOL_DEFINITIONS } from "./tool-definitions";
import { createMcpHandler } from "mcp-handler";
import { z } from "zod";
import { callLocalTool, toolErrorMessage } from "./call-local";
import { checkRateLimit, clientIp } from "./rate-limit";

const REQUEST_TIMEOUT_MS = 15_000;

const CORS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Accept, Authorization, MCP-Protocol-Version, Mcp-Session-Id, Last-Event-ID",
  "Access-Control-Expose-Headers": "Mcp-Session-Id, MCP-Protocol-Version",
  "Access-Control-Max-Age": "86400",
};

function withCors(response: Response): Response {
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(CORS)) {
    headers.set(key, value);
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function jsonRpcError(status: number, message: string, extraHeaders?: Record<string, string>) {
  return withCors(
    new Response(
      JSON.stringify({ jsonrpc: "2.0", error: { code: -32000, message }, id: null }),
      {
        status,
        headers: { "Content-Type": "application/json", ...extraHeaders },
      },
    ),
  );
}

function schemaToZod(schema: {
  properties?: Record<string, { type?: string; description?: string }>;
  required?: readonly string[];
}) {
  const shape: Record<string, z.ZodType> = {};
  for (const [key, prop] of Object.entries(schema.properties ?? {})) {
    let field: z.ZodTypeAny = prop.type === "boolean" ? z.boolean() : z.string();
    if (prop.description) field = field.describe(prop.description);
    if (!schema.required?.includes(key)) field = field.optional();
    shape[key] = field;
  }
  return z.object(shape);
}

export const mcpTransportHandler = createMcpHandler(
  (server) => {
    for (const tool of TOOL_DEFINITIONS) {
      server.registerTool(
        tool.name,
        {
          description: tool.description,
          inputSchema: schemaToZod(tool.inputSchema),
        },
        async (args) => {
          try {
            const result = callLocalTool(tool.name, args as Record<string, unknown>);
            return {
              content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
            };
          } catch (error) {
            return {
              content: [{ type: "text" as const, text: toolErrorMessage(error) }],
              isError: true,
            };
          }
        },
      );
    }
  },
  {
    serverInfo: { name: "design-atlas", version: "1.0.0" },
    instructions:
      "Read-only Design Atlas. No API key. Prefer get_design_spec(styleId) — it returns a complete markdown spec and tokens JSON to apply to the user's current project. Call list_styles first if the style id is unknown. Do not invent a palette, and do not load Google Fonts or external CDNs.",
    maxSubscriptions: 0,
    verboseLogs: false,
    telemetry: false,
  },
);

function withTimeout(request: Request): Promise<Response> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error("MCP request timed out"));
    }, REQUEST_TIMEOUT_MS);
    mcpTransportHandler(request).then(
      (response) => {
        clearTimeout(timer);
        resolve(response);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      },
    );
  });
}

export function optionsResponse(): Response {
  return new Response(null, { status: 204, headers: CORS });
}

export async function handleMcpHttp(request: Request): Promise<Response> {
  if (request.method === "OPTIONS") return optionsResponse();

  const limited = checkRateLimit(clientIp(request));
  if (!limited.ok) {
    return jsonRpcError(429, "Rate limit exceeded", {
      "Retry-After": String(limited.retryAfterSec),
    });
  }

  try {
    return withCors(await withTimeout(request));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    const status = message.includes("timed out") ? 504 : 500;
    return jsonRpcError(status, message);
  }
}
