import { handleGet } from "@/features/api-v1/respond";
import { searchCatalog } from "@/features/api-v1/service";

export function GET(request: Request) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") ?? "";
  return handleGet(() => searchCatalog(q), "no-store");
}
