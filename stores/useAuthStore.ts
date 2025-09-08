export const useAuthStore = defineStore(
  "auth",
  () => {
    const userEmail = ref<string | undefined>(undefined);
    const authtoken = ref<string | undefined>(undefined);
    const isLoggedIn = computed(() => !!authtoken.value);
    const name = ref<string | undefined>(undefined);

    function setAuth(token: string, email: string, userName: string) {
      authtoken.value = token;
      userEmail.value = email;
      name.value = userName;
    }

    function clearAuth() {
      authtoken.value = undefined;
      userEmail.value = undefined;
    }

    return {
      userEmail,
      authtoken,
      isLoggedIn,
      name,
      setAuth,
      clearAuth,
    };
  },
  { persist: true },
);
