export const useLogout = async () => {
  const auth = useAuthStore();
  //@ts-ignore
  const { isLoggedIn } = await useCheckAuth();
  try {
    const res = await $fetch("/api/auth/logout", {
      method: "POST",
    });
    auth.clearAuth();
    isLoggedIn.value = false;
    return navigateTo("/login");
  } catch (e) {
    console.error(e);
  }
};
