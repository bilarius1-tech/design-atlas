import { handleGet } from "@/features/api-v1/respond";
import { listThemes } from "@/features/api-v1/service";

export function GET() {
  return handleGet(() => listThemes());
}
