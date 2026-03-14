export function isAdminRole(role: unknown): boolean {
  return typeof role === "string" && role.trim().toLowerCase() === "admin";
}
