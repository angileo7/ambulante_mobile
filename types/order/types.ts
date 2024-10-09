import { Product } from "types/product/types";

export type Order = {
    id: string,
    order_number: number,
    description: string,
    products: Array<Product>,
    status: string,
    owner_name: string,
    total: number
};

export type OrderStore = {
    orders: Array<Order>,
    loadOrders: () => Promise<void>,
    createOneOrder: (value: Order) => Promise<void>,
    updateOneOrder: (value: Order) => Promise<void>,
    deleteOneOrder: (id: string) => Promise<void>
}

export type StoreSet =
(partial:
    OrderStore |
    Partial<OrderStore> |
    ((state: OrderStore) => OrderStore |
    Partial<OrderStore>),
replace?:
boolean | undefined) => void