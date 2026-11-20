import { handleGet } from "@/features/api-v1/respond";
import { listTemplates } from "@/features/api-v1/service";

export function GET() {
  return handleGet(() => listTemplates());
}
