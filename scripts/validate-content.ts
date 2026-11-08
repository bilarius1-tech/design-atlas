import { validateContentRegistry } from "../src/core/content/registry";

const result = validateContentRegistry();

for (const issue of result.issues) {
  const prefix = issue.severity === "error" ? "ERROR" : "WARN ";
  const where = issue.path ? ` @ ${issue.path}` : "";
  console.log(`${prefix} [${issue.code}] ${issue.message}${where}`);
}

if (!result.ok) {
  const errorCount = result.issues.filter((issue) => issue.severity === "error").length;
  console.error(`\nContent validation failed with ${errorCount} error(s).`);
  process.exit(1);
}

const warningCount = result.issues.filter((issue) => issue.severity === "warning").length;
console.log(`\nContent validation passed (${warningCount} warning(s)).`);
