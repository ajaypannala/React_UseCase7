import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchProducts } from "../services/productApi";

export const useProductStore = create(
  persist(
    (set, get) => ({
      products: [],
      cart: [],
      loading: true,
      error: "",

      loadProducts: async (signal) => {
        set({ loading: true, error: "" });
        try {
          const products = await fetchProducts(signal);
          set({ products });
        } catch (loadError) {
          if (signal?.aborted) return;
          set({ error: loadError.message || "Unable to load products." });
        } finally {
          if (!signal?.aborted) set({ loading: false });
        }
      },

      addProduct: (product) => set((state) => ({
        products: [...state.products, { ...product, id: Date.now(), image: null }]
      })),

      deleteProduct: (id) => set((state) => ({
        products: state.products.filter((product) => product.id !== id)
      })),

      addToCart: (product) => set((state) => {
        const existingItem = state.cart.find((item) => item.id === product.id);
        if (product.stock < 1 || (existingItem && existingItem.quantity >= product.stock)) {
          return state;
        }

        if (existingItem) {
          return {
            cart: state.cart.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            )
          };
        }

        return { cart: [...state.cart, { ...product, quantity: 1 }] };
      }),

      updateCartQuantity: (id, quantity) => set((state) => ({
        cart: state.cart
          .map((item) => item.id === id
            ? { ...item, quantity: Math.min(item.stock, Math.max(1, quantity)) }
            : item)
          .filter((item) => item.stock > 0)
      })),

      removeFromCart: (id) => set((state) => ({
        cart: state.cart.filter((item) => item.id !== id)
      })),

      getCartCount: () => get().cart.reduce((total, item) => total + item.quantity, 0),
      getCartTotal: () => get().cart.reduce((total, item) => total + item.price * item.quantity, 0)
    }),
    {
      name: "product-cart",
      partialize: (state) => ({ cart: state.cart })
    }
  )
);
