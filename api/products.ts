import { Product } from "../types/order/types";
import axios from '../utils/axiosConfig'

const BASE_URL = 'http://localhost:3002/product';

export async function fetchProducts(): Promise<Array<Product>> {
    axios.post('/categories')
        .then(async (response) => {
            const res = response.data;
            return res
        })
        .catch((errorResponse) => {
            
        })
        .finally(() => {
            set((state) => ({ ...state, loading: false }));
        });
    const response = await fetch(BASE_URL);
    const data = await response.json();
    return data.products;
}

export async function createProduct(newProduct: Product): Promise<Product> {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        body: JSON.stringify(newProduct)
    });
    const data = await response.json();
    return data.product;
}

export async function updateProduct(updatedProduct: Product): Promise<Product> {
    const response = await fetch(BASE_URL, {
        method: 'PUT',
        body: JSON.stringify(updatedProduct)
    });
    const data = await response.json();
    return data.product;
}

export async function deleteProduct(id: number): Promise<void> {
    await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE'
    });
}