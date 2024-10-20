import {create } from 'zustand';
import {Product} from '../types/product/types';


export interface BasketState {
    products: Array<Product & { quantity: number }>;
    addProduct: (product: Product) => void;
    reduceProduct: (product: Product) => void;
    clearCart: () => void;
    items: number;
    total: number;
    setProductsFromRemote: (products: Array<Product & { quantity: number }>) => void;
}

const useBasketStore = create<BasketState>()((set, get) => ({
    products: [],
    items: 0,
    total: 0,

    getItems: () => {
      return get().items
    },

    addProduct: (product) => {
      set((state) => {
        state.items += 1;
        state.total += product.price;
        const hasProduct = state.products.find((p) => p._id === product._id);
  
        if (hasProduct) {
          hasProduct.quantity += 1;
          return { products: [...state.products] };
        } else {
          return { products: [...state.products, { ...product, quantity: 1 }] };
        }
      });
    },
    reduceProduct: (product) => {
      set((state) => {
        state.total -= product.price;
        state.items -= 1;
        return {
          products: state.products
            .map((p) => {
              if (p._id === product._id) {
                p.quantity -= 1;
              }
              return p;
            })
            .filter((p) => p.quantity > 0),
        };
      });
    },
    setProductsFromRemote: (products) => {

    },
    clearCart: () => set({ products: [], items: 0, total: 0 }),
  }));
  
  export default useBasketStore;
  