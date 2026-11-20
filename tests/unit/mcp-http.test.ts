import { handleMcpHttp, optionsResponse } from "@/features/mcp-http/create-handler";
import {
  getClaudeMcpCommand,
  getCursorInstallLink,
  getMcpCursorMcpJson,
} from "@/features/mcp-http/cursor";
import { checkRateLimit, resetRateLimitForTests } from "@/features/mcp-http/rate-limit";
import { afterEach, describe, expect, it } from "vitest";

const MCP_URL = "https://design.vaybik.ru/mcp";

function mcpRequest(body: unknown, init?: RequestInit) {
  const headers = new Headers({
    accept: "application/json, text/event-stream",
    "content-type": "application/json",
    "mcp-protocol-version": "2025-03-26",
  });
  if (init?.headers) {
    new Headers(init.headers).forEach((value, key) => headers.set(key, value));
  }
  return new Request(MCP_URL, {
    ...init,
    method: init?.method ?? "POST",
    headers,
    body: JSON.stringify(body),
  });
}

async function readJson(response: Response): Promise<Record<string, unknown>> {
  const text = await response.text();
  // Streamable HTTP may return a single JSON object or an SSE frame.
  if (text.startsWith("event:") || text.includes("data:")) {
    const dataLines = text
      .split("\n")
      .filter((line) => line.startsWith("data:"))
      .map((line) => line.slice(5).trim());
    const payload = dataLines.join("");
    return JSON.parse(payload) as Record<string, unknown>;
  }
  return JSON.parse(text) as Record<string, unknown>;
}

afterEach(() => {
  resetRateLimitForTests();
});

describe("MCP HTTP helpers", () => {
  it("builds the one-line Cursor config and official deeplink", () => {
    const json = getMcpCursorMcpJson(MCP_URL);
    expect(JSON.parse(json)).toEqual({
      mcpServers: { "design-atlas": { url: MCP_URL } },
    });
    const link = getCursorInstallLink(MCP_URL);
    expect(link.startsWith("cursor://anysphere.cursor-deeplink/mcp/install?name=design-atlas&config=")).toBe(
      true,
    );
    const encoded = new URL(link).searchParams.get("config");
    expect(encoded).toBeTruthy();
    expect(JSON.parse(Buffer.from(encoded!, "base64").toString("utf8"))).toEqual({ url: MCP_URL });
    expect(getClaudeMcpCommand(MCP_URL)).toBe(
      "claude mcp add --transport http design-atlas https://design.vaybik.ru/mcp",
    );
  });

  it("answers OPTIONS with CORS headers", () => {
    const response = optionsResponse();
    expect(response.status).toBe(204);
    expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
    expect(response.headers.get("Access-Control-Allow-Methods")).toContain("POST");
  });
});

describe("MCP HTTP rate limit", () => {
  it("allows a burst and then returns retry-after", () => {
    const now = 1_000_000;
    for (let i = 0; i < 120; i += 1) {
      expect(checkRateLimit("1.1.1.1", now + i, 120, 60_000).ok).toBe(true);
    }
    const blocked = checkRateLimit("1.1.1.1", now + 120, 120, 60_000);
    expect(blocked.ok).toBe(false);
    if (!blocked.ok) expect(blocked.retryAfterSec).toBeGreaterThan(0);
  });
});

describe("MCP Streamable HTTP handler", () => {
  it("initializes, lists tools, and returns get_design_spec", async () => {
    const init = await handleMcpHttp(
      mcpRequest({
        jsonrpc: "2.0",
        id: 1,
        method: "initialize",
        params: {
          protocolVersion: "2025-03-26",
          capabilities: {},
          clientInfo: { name: "vitest", version: "1.0.0" },
        },
      }),
    );
    expect(init.status).toBe(200);
    const initBody = await readJson(init);
    const result = initBody.result as {
      protocolVersion?: string;
      serverInfo?: { name?: string };
      capabilities?: { tools?: unknown };
    };
    expect(initBody.error).toBeUndefined();
    expect(result.serverInfo?.name).toBe("design-atlas");
    expect(result.protocolVersion).toBeTruthy();
    expect(result.capabilities?.tools).toBeTruthy();

    const listed = await handleMcpHttp(
      mcpRequest({
        jsonrpc: "2.0",
        id: 2,
        method: "tools/list",
        params: {},
      }),
    );
    expect(listed.status).toBe(200);
    const listBody = await readJson(listed);
    const tools = (listBody.result as { tools: { name: string }[] }).tools;
    const names = tools.map((tool) => tool.name);
    expect(names).toContain("get_design_spec");
    expect(names).toContain("list_styles");

    const called = await handleMcpHttp(
      mcpRequest({
        jsonrpc: "2.0",
        id: 3,
        method: "tools/call",
        params: {
          name: "get_design_spec",
          arguments: { styleId: "swiss-international", lang: "ru" },
        },
      }),
    );
    expect(called.status).toBe(200);
    const callBody = await readJson(called);
    expect(callBody.error).toBeUndefined();
    const callResult = callBody.result as {
      isError?: boolean;
      content: { type: string; text: string }[];
    };
    expect(callResult.isError).toBeFalsy();
    const payload = JSON.parse(callResult.content[0]!.text) as {
      markdown: string;
      tokens: { colors?: { accent?: string } };
    };
    expect(payload.markdown).toContain("Внедри эту дизайн-систему в текущий проект");
    expect(payload.markdown).not.toContain("design.vaybik.ru");
    expect(payload.tokens?.colors?.accent).toBe("#D10512");
  }, 20_000);

  it("returns 405 for a session GET and CORS on POST errors", async () => {
    const get = await handleMcpHttp(new Request(MCP_URL, { method: "GET" }));
    expect(get.status).toBe(405);
    expect(get.headers.get("Access-Control-Allow-Origin")).toBe("*");
  });
});
