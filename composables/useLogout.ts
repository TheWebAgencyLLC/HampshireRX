export const useLogout = async () => {
  const auth = useAuthStore();
  try {
    const res = await $fetch("/api/auth/logout", {
      method: "POST",
    });
    auth.clearAuth();
    return navigateTo("/login");
  } catch (e) {
    console.error(e);
  }
};
