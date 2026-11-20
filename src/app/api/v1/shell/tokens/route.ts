import { handleGet } from "@/features/api-v1/respond";
import { getShellTokens } from "@/features/api-v1/service";

export function GET() {
  return handleGet(() => getShellTokens());
}
