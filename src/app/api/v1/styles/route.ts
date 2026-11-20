import { handleGet } from "@/features/api-v1/respond";
import { listStyles } from "@/features/api-v1/service";

export function GET() {
  return handleGet(() => listStyles());
}
