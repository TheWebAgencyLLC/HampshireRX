// middleware/auth.ts
import { createPinia } from "pinia";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useAuthStore();
  try {
    const res = await $fetch("/api/auth/checkJWT", {
      method: "GET",
      //@ts-ignore
      headers: {
        Authorization: auth.authtoken,
      },
    });
    //@ts-ignore
    if (!res?.email) {
      throw new Error("Not logged in");
    }
  } catch (e) {
    auth.clearAuth();
    return navigateTo("/login");
  }

  if (!auth.isLoggedIn) {
    return navigateTo("/login");
  }
});
