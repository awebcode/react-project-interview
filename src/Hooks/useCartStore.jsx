import {create} from "zustand";
import { persist} from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],

      // Function to add an item to the cart
      addItem: (item) =>
        set((state) => {
          const existingItem = state.cart.find((i) => i.id === item.id);
          if (existingItem) {
            return {
              cart: state.cart.map((i) =>
                i.id === item.id ? { ...i, course_qty: i.course_qty + 1 } : i
              ),
            };
          }
          return {
            cart: [...state.cart, { ...item, course_qty: 1 }],
          };
        }),

      // Function to increase the quantity of an item
      increaseItemQuantity: (id) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, course_qty: item.course_qty + 1 } : item
          ),
        })),
      removeItem: (id) =>
        set((state) => {
          return { cart: state.cart.filter((item) => item.id !== id) };
        }),

      // Function to decrease the quantity of an item
      decreaseItemQuantity: (id) =>
        set((state) => {
          const existingItem = state.cart.find((item) => item.id === id);
          if (existingItem.course_qty === 1) {
            return { cart: state.cart.filter((item) => item.id !== id) };
          }
          return {
            cart: state.cart.map((item) =>
              item.id === id ? { ...item, course_qty: item.course_qty - 1 } : item
            ),
          };
        }),

      // Function to get the total items in the cart
      getTotalItems: () => {
        return get().cart.reduce((total, item) => total + item.course_qty, 0);
      },

      // Function to clear the cart
      clearCart: () => set({ cart: [] }),

      // Function to check if an item exists in the cart
      isItemExists: (id) => {
        const existingItem = get().cart.find((item) => item.id === id);
        return existingItem !== undefined;
      },

      // Function to get the cart items
      getCartItems: () => get().cart,

      // Function to get the total price
      getTotalPrice: () => {
        return get().cart.reduce(
          (total, item) => total + item.discount_price * item.course_qty,
          0
        );
      },
    }),
    {
      name: "cart-storage", // Unique name for storage
      getStorage: () => localStorage, // Use local storage
    }
  )
);

export default useCartStore;
