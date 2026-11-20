import { TOOL_DEFINITIONS, callTool } from "./client";

type JsonRpcRequest = {
  jsonrpc?: string;
  id?: number | string | null;
  method?: string;
  params?: Record<string, unknown>;
};

function writeMessage(message: unknown, stdout: NodeJS.WritableStream) {
  const json = JSON.stringify(message);
  const body = Buffer.from(json, "utf8");
  stdout.write(`Content-Length: ${body.length}\r\n\r\n`);
  stdout.write(body);
}

function ok(id: number | string | null | undefined, result: unknown) {
  return { jsonrpc: "2.0", id: id ?? null, result };
}

function err(id: number | string | null | undefined, code: number, message: string) {
  return { jsonrpc: "2.0", id: id ?? null, error: { code, message } };
}

export async function handleMessage(message: JsonRpcRequest): Promise<unknown | null> {
  const { id, method, params } = message;
  if (!method) return err(id, -32600, "Missing method");

  if (method === "initialize") {
    return ok(id, {
      protocolVersion: "2024-11-05",
      capabilities: { tools: {} },
      serverInfo: { name: "design-atlas", version: "1.0.0" },
    });
  }

  if (method === "notifications/initialized" || method === "initialized") {
    return null;
  }

  if (method === "ping") {
    return ok(id, {});
  }

  if (method === "tools/list") {
    return ok(id, { tools: TOOL_DEFINITIONS });
  }

  if (method === "tools/call") {
    const name = String(params?.name ?? "");
    const args = (params?.arguments ?? {}) as Record<string, unknown>;
    try {
      const result = await callTool(name, args);
      return ok(id, {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      });
    } catch (error) {
      const messageText = error instanceof Error ? error.message : String(error);
      return ok(id, {
        content: [{ type: "text", text: messageText }],
        isError: true,
      });
    }
  }

  if (method === "shutdown") {
    return ok(id, {});
  }

  return err(id, -32601, `Unknown method: ${method}`);
}

export function createStdioParser(
  onMessage: (message: JsonRpcRequest) => void,
): (chunk: Buffer | string) => void {
  let buffer = Buffer.alloc(0);

  return (chunk: Buffer | string) => {
    buffer = Buffer.concat([buffer, Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)]);

    while (true) {
      const headerEnd = buffer.indexOf("\r\n\r\n");
      if (headerEnd === -1) return;
      const header = buffer.subarray(0, headerEnd).toString("utf8");
      const match = header.match(/Content-Length:\s*(\d+)/i);
      if (!match) {
        buffer = buffer.subarray(headerEnd + 4);
        continue;
      }
      const length = Number(match[1]);
      const bodyStart = headerEnd + 4;
      if (buffer.length < bodyStart + length) return;
      const body = buffer.subarray(bodyStart, bodyStart + length).toString("utf8");
      buffer = buffer.subarray(bodyStart + length);
      onMessage(JSON.parse(body) as JsonRpcRequest);
    }
  };
}

export async function listenStdio(
  stdin: NodeJS.ReadableStream = process.stdin,
  stdout: NodeJS.WritableStream = process.stdout,
) {
  const queue: Promise<void> = Promise.resolve();
  let chain = queue;

  const onMessage = (message: JsonRpcRequest) => {
    chain = chain.then(async () => {
      const response = await handleMessage(message);
      if (response) writeMessage(response, stdout);
    });
  };

  const parse = createStdioParser(onMessage);
  stdin.on("data", parse);
  stdin.on("end", () => {
    void chain.finally(() => process.exit(0));
  });
}
