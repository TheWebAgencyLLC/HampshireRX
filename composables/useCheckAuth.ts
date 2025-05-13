export const useCheckAuth = async () => {
  const auth = useAuthStore();
  const isLoggedIn = useState("isLoggedIn", () => false);
  try {
    const { data } = await useFetch("/api/auth/checkJWT", {
      method: "GET",
      //@ts-ignore
      headers: {
        Authorization: auth.authtoken,
      },
    });
    console.log(data.value);
    //@ts-ignore
    if (data.value?.email) {
      isLoggedIn.value = true;
    }
  } catch (e) {
    isLoggedIn.value = false;
  }
  return { isLoggedIn };
};
