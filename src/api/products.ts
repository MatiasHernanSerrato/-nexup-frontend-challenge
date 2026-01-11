import { Product } from '../types/Product';
import { ProductCategory } from '../types/ProductCategory';
import { ProductStatus } from '../types/ProductStatus';

export const MOCK_PRODUCTS: Product[] = [
    { id: 1, name: 'Apple', status: ProductStatus.Active, category: ProductCategory.Fruit, price: 1.25, stock: 12 },
    { id: 2, name: 'Banana', status: ProductStatus.Active, category: ProductCategory.Fruit, price: 0.99, stock: 0 },
    { id: 3, name: 'Carrot', status: ProductStatus.Active, category: ProductCategory.Vegetables, price: 0.75, stock: 30 },
    { id: 4, name: 'Broccoli', status: ProductStatus.Inactive, category: ProductCategory.Vegetables, price: 1.5, stock: 5 },
    { id: 5, name: 'Chicken Breast', status: ProductStatus.Active, category: ProductCategory.Meat, price: 6.99, stock: 8 },
    { id: 6, name: 'Beef Steak', status: ProductStatus.Inactive, category: ProductCategory.Meat, price: 12.49, stock: 2 },
];
