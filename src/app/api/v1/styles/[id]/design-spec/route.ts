import { jsonError, jsonOk } from "@/features/api-v1/respond";
import { getDesignSpec } from "@/features/api-v1/service";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const url = new URL(request.url);
  try {
    return jsonOk(
      getDesignSpec(id, {
        lang: url.searchParams.get("lang"),
        surface: url.searchParams.get("surface"),
        productName: url.searchParams.get("productName"),
        pageBrief: url.searchParams.get("pageBrief"),
      }),
    );
  } catch (error) {
    return jsonError(error);
  }
}
