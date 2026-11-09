import { PackKindSchema } from "@/core/schemas";
import { buildDesignPackZip } from "@/features/export";
import { NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{ styleId: string }>;
};

export async function GET(request: Request, context: RouteContext) {
  const { styleId } = await context.params;
  const url = new URL(request.url);
  const packParam = url.searchParams.get("pack") ?? "free";
  const parsedKind = PackKindSchema.safeParse(packParam);

  if (!parsedKind.success) {
    return NextResponse.json(
      { error: "invalid_pack", message: "Query pack must be free|full" },
      { status: 400 },
    );
  }

  // Never trust client isPremium — entitlements read env only.
  const result = buildDesignPackZip(styleId, parsedKind.data);

  if (!result.ok) {
    return NextResponse.json(
      { error: result.code, message: result.message },
      { status: result.status },
    );
  }

  return new NextResponse(Buffer.from(result.zip), {
    status: 200,
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${result.fileName}"`,
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
