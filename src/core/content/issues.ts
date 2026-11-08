export type ContentIssueSeverity = "error" | "warning";

export type ContentIssue = {
  severity: ContentIssueSeverity;
  code: string;
  message: string;
  path?: string;
};

export type ContentValidationResult = {
  ok: boolean;
  issues: ContentIssue[];
};

export function errorIssue(code: string, message: string, path?: string): ContentIssue {
  return { severity: "error", code, message, path };
}

export function warningIssue(code: string, message: string, path?: string): ContentIssue {
  return { severity: "warning", code, message, path };
}

export function summarizeIssues(issues: ContentIssue[]): ContentValidationResult {
  return {
    ok: issues.every((issue) => issue.severity !== "error"),
    issues,
  };
}
