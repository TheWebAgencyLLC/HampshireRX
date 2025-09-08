export const useCartStore = () => {
  // Create a reactive state with an initial value of 0
  const cartCount = useState<number>("cartCount", () => 0);

  // Function to fetch and update the cart count
  const fetchCartCount = async () => {
    try {
      const { data: cartData } = await useFetch("/api/user/cart", {
        method: "GET",
      });

      // Update the cart count if data exists
      //@ts-ignore
      if (cartData.value && cartData.value.cart) {
        //@ts-ignore
        cartCount.value = cartData.value.cart.length;
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  // Function to increment the cart count
  const incrementCount = async (amount = 1) => {
    cartCount.value += amount;

    // Optionally, you could update the server here
    // await updateCartOnServer();
  };

  // Function to decrement the cart count
  const decrementCount = async (amount = 1) => {
    cartCount.value = Math.max(0, cartCount.value - amount);

    // Optionally, you could update the server here
    // await updateCartOnServer();
  };

  // Function to set the cart count to a specific value
  const setCount = (value: number) => {
    cartCount.value = Math.max(0, value);
  };

  // Initial fetch
  fetchCartCount();

  return {
    cartCount,
    fetchCartCount,
    incrementCount,
    decrementCount,
    setCount,
  };
};
