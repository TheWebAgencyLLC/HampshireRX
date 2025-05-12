export function checkRole(user: any) {
  if (!user) return false;
  return user.role === "admin";
}
