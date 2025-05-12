export const useAuthStore = defineStore(
  "auth",
  () => {
    const userEmail = ref<string | undefined>(undefined);
    const authtoken = ref<string | undefined>(undefined);
    const isLoggedIn = computed(() => !!authtoken.value);

    function setAuth(token: string, email: string) {
      authtoken.value = token;
      userEmail.value = email;
    }

    function clearAuth() {
      authtoken.value = undefined;
      userEmail.value = undefined;
    }

    return {
      userEmail,
      authtoken,
      isLoggedIn,
      setAuth,
      clearAuth,
    };
  },
  { persist: true },
);
