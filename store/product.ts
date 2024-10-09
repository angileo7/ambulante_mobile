// store.ts

import { create } from "zustand";
import { Product, ProductStore } from "../types/product/types";
import AxiosConfig from "../utils/axiosConfig";
// import { createProduct, deleteProduct, fetchProducts, updateProduct } from "./api";

const initialState = {
    user: null,
    loading: false,
    error: null,
    success: false,
    accessToken: null,
    categories: [],
    productsCategorized: {
        category: '',
        meals: [] //cambiar a categoruy
    }
}

export const useProductStore = create<ProductStore>()((set) => ({
    ...initialState,
    loadProducts: async () => {
        // const products = await fetchProducts();
        set((state) => ({ ...state, loading: true }));
        await AxiosConfig.get('categories')
            .then((response) => {
                set((state) => ({ ...state, error: null, success: true, categories: response.data }));
            })
            .catch((errorResponse) => {
                set((state) => ({
                    ...state,
                    success: false,
                    error: errorResponse.response?.data?.message || errorResponse.message
                }));
            })
            .finally(() => {
                set((state) => ({ ...state, loading: false }));
            });
    },
    setProductsCategorized: (name: string, products: Product[]) => {
        set((state) => ({ ...state, productsCategorized: { category: name, meals: products} }));
    }
}));