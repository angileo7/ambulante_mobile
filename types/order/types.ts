import { Product } from "types/product/types";

export type Order = {
    id: string,
    order_number: number,
    description: string,
    products: Array<Product>,
    status: string,
    owner_name: string,
    current_journey: string,
    total: number
};

export type OrderStore = {
    orders: Array<Order>,
    loadOrders: () => Promise<void>,
    loadOneOrder: (id: string) => Promise<void>,
    createOneOrder: (value: Order, current_journey: string, owner_name: string) => Promise<void>,
    updateOneOrder: (value: Order) => Promise<void>,
    deleteOneOrder: (id: string) => Promise<void>,
    order?: Order
    loading: boolean
    success: boolean
}

export type StoreSet =
(partial:
    OrderStore |
    Partial<OrderStore> |
    ((state: OrderStore) => OrderStore |
    Partial<OrderStore>),
replace?:
boolean | undefined) => void