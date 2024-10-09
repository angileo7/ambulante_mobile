export type Product = {
    id: number,
    title: string,
    price: number,
    description: string,
    img: string
};

export type Category = {
    id: number,
    title: string,
    productsCategorized: Array<Product>,
    description: string,
};

export type ProductStore = {
    categories: Array<Category>
    loadProducts: () => Promise<void>,
    productsCategorized: {category: string, meals: Array<Product>},
    setProductsCategorized: (name: string, products: Product[]) => void,
}

export type StoreSet =
(partial:
    ProductStore |
    Partial<ProductStore> |
    ((state: ProductStore) => ProductStore |
    Partial<ProductStore>),
replace?:
boolean | undefined) => void