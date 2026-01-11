import { MOCK_PRODUCTS } from './products';

import type { Product } from '../types/Product';

export const getProductList = (): Product[] => MOCK_PRODUCTS;

export const fetchProductList = async (): Promise<Product[]> =>
    new Promise((resolve) => {
        setTimeout(() => resolve(MOCK_PRODUCTS), 400);
    });
