//this store is made to handle the cart whenever the user is not signed in, this is all saved in browser cache.

import { defineStore } from "pinia";

export const useCartGuestStore = defineStore(
  "cart",
  () => {
    const cart = ref<any[]>([]);

    function addToCart(item: any) {
      cart.value.push(item);
    }

    function removeFromCart(item: any) {
      cart.value = cart.value.filter((i) => i.id !== item.id);
    }

    function clearCart() {
      cart.value = [];
    }

    function updateCartQuantity(item: any, delta: number) {
      const existingItemIndex = cart.value.findIndex(
        (cartItem) =>
          cartItem.medication.name === item.medication.name &&
          cartItem.medication.count === item.medication.count &&
          cartItem.medication.countUnit === item.medication.countUnit &&
          cartItem.medication.price === item.medication.price &&
          cartItem.medication.size === item.medication.size,
      );
      //console.log(existingItemIndex);

      if (existingItemIndex !== -1) {
        const currentQuantity = cart.value[existingItemIndex].quantity || 0;
        const quantityToAdd = item.quantity || 1;

        // Fixed: Add delta when it exists, otherwise add quantityToAdd
        cart.value[existingItemIndex].quantity =
          delta !== undefined && delta !== null
            ? currentQuantity + delta
            : currentQuantity + quantityToAdd;

        return {
          statusCode: 200,
          message: "Item quantity updated in cart",
          cart: cart.value,
        };
      } else {
        addToCart(item);
        return {
          statusCode: 200,
          message: "Item added to cart",
          cart: cart.value,
        };
      }
    }

    return {
      cart,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
    };
  },
  { persist: true },
);
