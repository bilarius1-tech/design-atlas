import { NextResponse } from "next/server";
import { ApiError } from "./service";

const CACHE = "public, max-age=60, stale-while-revalidate=300";

export function jsonOk(body: unknown, cache = CACHE): NextResponse {
  return NextResponse.json(body, {
    status: 200,
    headers: {
      "Cache-Control": cache,
      "X-Content-Type-Options": "nosniff",
    },
  });
}

export function jsonError(error: unknown): NextResponse {
  if (error instanceof ApiError) {
    return NextResponse.json(
      { error: error.code, message: error.message },
      {
        status: error.status,
        headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" },
      },
    );
  }
  const message = error instanceof Error ? error.message : "Internal error";
  return NextResponse.json(
    { error: "internal_error", message },
    {
      status: 500,
      headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" },
    },
  );
}

export function handleGet(run: () => unknown, cache?: string): NextResponse {
  try {
    return jsonOk(run(), cache);
  } catch (error) {
    return jsonError(error);
  }
}
