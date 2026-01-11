import { MOCK_PRODUCTS } from "./products";

import type { Product } from "../types/Product";

export const getProductList = (): Product[] => {
    return MOCK_PRODUCTS;
};

export const fetchProductList = async (): Promise<Product[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(MOCK_PRODUCTS), 400);
    });
};
