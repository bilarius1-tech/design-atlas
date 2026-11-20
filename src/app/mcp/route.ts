import { handleMcpHttp } from "@/features/mcp-http/create-handler";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const GET = handleMcpHttp;
export const POST = handleMcpHttp;
export const DELETE = handleMcpHttp;
export const OPTIONS = handleMcpHttp;
