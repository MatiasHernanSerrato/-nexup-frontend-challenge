import { MOCK_PRODUCTS } from "./products";

import type { Product } from "../types/Product";

export const getProductList = (): Product[] => {
    return MOCK_PRODUCTS;
};
