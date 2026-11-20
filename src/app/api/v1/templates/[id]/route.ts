import { handleGet } from "@/features/api-v1/respond";
import { getTemplate } from "@/features/api-v1/service";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  return handleGet(() => getTemplate(id));
}
