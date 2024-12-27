// store.ts

import { create } from "zustand";
import { Order, OrderStore } from "../types/order/types";
import AxiosConfig from "../utils/axiosConfig";

const initialState = {
    orders: [],
    loading: false,
    error: null,
    success: false,
    order: undefined
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
    loadOneOrder: async (id: string) => {
        set((state) => ({ ...state, loading: true }));
        AxiosConfig.get('/orders/'+id)
            .then((response) => {
                set((state) => ({ ...state, error: null, success: true, order: response.data }));
                return response.data;
            })
            .catch((errorResponse) => {
                set((state) => ({
                    ...state,
                    success: false,
                    error: errorResponse.response?.data?.message || errorResponse.message,
                    order: undefined
                }));
            })
            .finally(() => {
                set((state) => ({ ...state, loading: false }));
            });
    },
    createOneOrder: async (newProduct: Order, current_journey: string, owner_name: string) => {
        set((state) => ({ ...state, loading: true }));
        AxiosConfig.post('/orders', {
            client: '6640869761756c4ab7faa4c9',
            products: [...newProduct.products],
            owner_name,
            description: 'from app XD',
            current_journey
        })
            .then((response) => {
                set((state) => ({ ...state, error: null, success: true, order: undefined}));
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
        AxiosConfig.put('/orders', {
            id: updatedProduct.id,
            products: [...updatedProduct.products],
        })
            .then((response) => {
                set((state) => ({ ...state, error: null, success: true, order: undefined}));
            })
            .catch((errorResponse) => {
                console.log('error', errorResponse)
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