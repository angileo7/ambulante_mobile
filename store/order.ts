// store.ts

import { create } from "zustand";
import { Order, OrderStore } from "../types/order/types";
import AxiosConfig from "../utils/axiosConfig";
// import { createProduct, deleteProduct, fetchProducts, updateProduct } from "./api";

const initialState = {
    orders: [],
    loading: false,
    error: null,
    success: false,
}

export const useOrderStore = create<OrderStore>()((set) => ({
    ...initialState,
    loadOrders: async () => {
        // const products = await fetchProducts();
        set((state) => ({ ...state, loading: true }));
        AxiosConfig.get('/orders')
            .then((response) => {
                set((state) => ({ ...state, error: null, success: true, orders: response.data.data }));
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
    createOneOrder: async (newProduct: Order) => {
        set((state) => ({ ...state, loading: true }));
        AxiosConfig.post('/orders', {
            client: '6640869761756c4ab7faa4c9',
            products: [...newProduct.products],
            owner_name: 'owner from app XD',
            description: 'from app XD'
        })
            .then((response) => {
                //set((state) => ({ ...state, error: null, success: true, orders: [...state.orders, response.data ]}));
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
    updateOneOrder: async (updatedProduct: Order) => {
        set((state) => ({ ...state, loading: true }));
        AxiosConfig.put('/orders')
            .then((response) => {
                set((state) => ({ ...state, error: null, success: true, orders: [...state.orders, response.data ]}));
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
    deleteOneOrder: async (id: string) => {
        set((state) => ({ ...state, loading: true }));
        AxiosConfig.delete('/orders/'+id)
            .then((response) => {
                set((state) => { 
                    return {
                        orders: state.orders.filter(ele => ele._id != id)}
                    })
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
    }
}));