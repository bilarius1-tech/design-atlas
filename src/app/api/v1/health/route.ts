import { handleGet } from "@/features/api-v1/respond";
import { getHealth } from "@/features/api-v1/service";

export function GET() {
  return handleGet(() => getHealth(), "no-store");
}
