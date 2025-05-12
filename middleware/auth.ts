export default defineNuxtRouteMiddleware(async (to, from) => {
  try {
    const { data } = await useFetch("/api/auth/check");
    //@ts-ignore
    if (!data.value?.email) {
      return navigateTo("/admin/login");
    }
  } catch (e) {
    console.error(e);
  }
});
