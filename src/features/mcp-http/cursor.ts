import { getSiteUrl } from "@/lib/site-url";

export const MCP_PATH = "/mcp";
export const MCP_SERVER_NAME = "design-atlas";

export function getMcpUrl(siteUrl = getSiteUrl()): string {
  return `${siteUrl.replace(/\/$/, "")}${MCP_PATH}`;
}

export function getMcpCursorConfig(mcpUrl = getMcpUrl()): { url: string } {
  return { url: mcpUrl };
}

export function getMcpCursorMcpJson(mcpUrl = getMcpUrl()): string {
  return JSON.stringify(
    {
      mcpServers: {
        [MCP_SERVER_NAME]: getMcpCursorConfig(mcpUrl),
      },
    },
    null,
    2,
  );
}

export function getClaudeMcpCommand(mcpUrl = getMcpUrl()): string {
  return `claude mcp add --transport http ${MCP_SERVER_NAME} ${mcpUrl}`;
}

/** Official Cursor deeplink: name + base64(JSON.stringify({ url })). */
export function getCursorInstallLink(mcpUrl = getMcpUrl()): string {
  const config = Buffer.from(JSON.stringify(getMcpCursorConfig(mcpUrl)), "utf8").toString(
    "base64",
  );
  return `cursor://anysphere.cursor-deeplink/mcp/install?name=${encodeURIComponent(MCP_SERVER_NAME)}&config=${encodeURIComponent(config)}`;
}
