import type { PackKind } from "@/core/schemas";

export type AccessTier = "free" | "pack" | "pro";

export type PackAccessDecision =
  | { ok: true; tier: AccessTier }
  | { ok: false; status: 403 | 404; code: string; message: string };

export type EntitlementContext = {
  /** Internal/CI flag — never trust the client for this. */
  allowFullExport?: boolean;
};

export function packKindToAccessTier(kind: PackKind): AccessTier {
  return kind === "free" ? "free" : "pack";
}

/**
 * Central access check for Design Pack export (no billing).
 */
export function assertPackAccess(
  kind: PackKind,
  context: EntitlementContext = {},
): PackAccessDecision {
  if (kind === "free") {
    return { ok: true, tier: "free" };
  }

  const allow =
    context.allowFullExport === true ||
    process.env.DESIGN_ATLAS_ALLOW_FULL_EXPORT === "1";

  if (!allow) {
    return {
      ok: false,
      status: 403,
      code: "full_pack_unavailable",
      message:
        "Full Design Pack is not publicly available yet (PHASE 7 foundation). Set DESIGN_ATLAS_ALLOW_FULL_EXPORT=1 for internal use.",
    };
  }

  return { ok: true, tier: "pack" };
}

export function isFullPackPubliclyAdvertised(): boolean {
  return false;
}
