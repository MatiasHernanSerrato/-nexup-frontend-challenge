import React, { useEffect, useState } from 'react';

import { ProductList } from '../ProductList/ProductList';
import { CategoryFilter } from '../CategoryFilter/CategoryFilter';
import { getProductList } from '../../api/services';

import { ALL_CATEGORIES } from '../../utils/const';
import { CategoryOption } from '../CategoryFilter/types';

import type { Product } from '../../types/Product';

export const ProductManager: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [category] = useState<CategoryOption>(ALL_CATEGORIES);
  const [search, setSearch] = useState<string>('');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  useEffect(() => {
    setProducts(getProductList());
  }, []);

  return (
    <div className="product-manager">
      <div className="filters">
        <CategoryFilter selected={category} />
        <div className="text-filter">
          <label htmlFor="search-input">Buscar:</label>
          <input
            id="search-input"
            type="text"
            placeholder="Nombre o categoría"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="stock-filter">
          <label>
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
            />
            Solo con stock
          </label>
        </div>
      </div>
      <ProductList productList={products} />
    </div>
  );
};

export default ProductManager;
