// composables/useAuth.ts
export const useAuth = async () => {
  const authToken = useState<string | null>("auth-token", () => null);
  const userEmail = useState<string | null>("auth-email", () => null);
  const isLoggedIn = computed(() => {
    return !!(authToken.value && userEmail.value);
  });

  // Initialize from localStorage
  onMounted(() => {
    const storedToken = localStorage.getItem("auth-token");
    const storedEmail = localStorage.getItem("auth-email");

    if (storedToken && storedEmail) {
      authToken.value = storedToken;
      userEmail.value = storedEmail;
    }
  });

  // Set auth state
  const setAuth = (email: string, token: string) => {
    authToken.value = token;
    userEmail.value = email;
    localStorage.setItem("auth-token", token);
    localStorage.setItem("auth-email", email);
  };

  // Clear auth state
  const clearAuth = async () => {
    authToken.value = null;
    userEmail.value = null;
    localStorage.removeItem("auth-token");
    localStorage.removeItem("auth-email");
  };

  return {
    authToken,
    userEmail,
    isLoggedIn,
    setAuth,
    clearAuth,
  };
};
