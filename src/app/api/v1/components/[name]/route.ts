import { handleGet } from "@/features/api-v1/respond";
import { getComponent } from "@/features/api-v1/service";

type RouteContext = {
  params: Promise<{ name: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { name } = await context.params;
  return handleGet(() => getComponent(name));
}
