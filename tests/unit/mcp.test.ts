import { describe, expect, it, vi } from "vitest";
import { callTool, getApiBase, TOOL_DEFINITIONS } from "../../packages/mcp/src/client";
import { createStdioParser, handleMessage } from "../../packages/mcp/src/stdio";

describe("MCP client", () => {
  it("defaults the API base to design.vaybik.ru", () => {
    expect(getApiBase({})).toBe("https://design.vaybik.ru");
    expect(getApiBase({ DESIGN_ATLAS_API_BASE: "https://example.com/" })).toBe(
      "https://example.com",
    );
  });

  it("lists the documented tools", () => {
    const names = TOOL_DEFINITIONS.map((tool) => tool.name);
    expect(names).toEqual(
      expect.arrayContaining([
        "list_styles",
        "get_tokens",
        "get_component",
        "search_guidelines",
        "get_theme",
      ]),
    );
  });

  it("calls the JSON API through fetch", async () => {
    const fetchImpl = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      expect(url).toBe("https://design.vaybik.ru/api/v1/themes/vaybik");
      return new Response(JSON.stringify({ kind: "theme", data: { id: "vaybik" } }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }) as unknown as typeof fetch;

    const result = await callTool("get_theme", { id: "vaybik" }, {}, fetchImpl);
    expect(result).toEqual({ kind: "theme", data: { id: "vaybik" } });
  });

  it("routes get_tokens to shell, theme, or style endpoints", async () => {
    const seen: string[] = [];
    const fetchImpl = vi.fn(async (input: RequestInfo | URL) => {
      seen.push(String(input));
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }) as unknown as typeof fetch;

    await callTool("get_tokens", { shell: true }, {}, fetchImpl);
    await callTool("get_tokens", { themeId: "vaybik" }, {}, fetchImpl);
    await callTool("get_tokens", { styleId: "swiss-international" }, {}, fetchImpl);

    expect(seen).toEqual([
      "https://design.vaybik.ru/api/v1/shell/tokens",
      "https://design.vaybik.ru/api/v1/themes/vaybik",
      "https://design.vaybik.ru/api/v1/styles/swiss-international/tokens",
    ]);
  });
});

describe("MCP stdio", () => {
  it("answers initialize and tools/list", async () => {
    const init = (await handleMessage({
      jsonrpc: "2.0",
      id: 1,
      method: "initialize",
    })) as { result: { serverInfo: { name: string } } };
    expect(init.result.serverInfo.name).toBe("design-atlas");

    const listed = (await handleMessage({
      jsonrpc: "2.0",
      id: 2,
      method: "tools/list",
    })) as { result: { tools: Array<{ name: string }> } };
    expect(listed.result.tools.some((tool) => tool.name === "get_tokens")).toBe(true);
  });

  it("parses Content-Length frames", () => {
    const messages: unknown[] = [];
    const parse = createStdioParser((message) => messages.push(message));
    const payload = Buffer.from(JSON.stringify({ jsonrpc: "2.0", id: 7, method: "ping" }));
    parse(`Content-Length: ${payload.length}\r\n\r\n`);
    parse(payload);
    expect(messages).toEqual([{ jsonrpc: "2.0", id: 7, method: "ping" }]);
  });
});
