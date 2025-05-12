export const useLogin = async (email: string, password: string) => {
  try {
    const response = await $fetch(`/api/auth/login`, {
      method: "POST",
      body: {
        email,
        password,
      },
    });
    return navigateTo("/");
  } catch (e) {
    console.error(e);
  }
};
