import React, { useEffect, useState } from 'react';

import { ProductList } from '../ProductList/ProductList';
import { CategoryFilter } from '../CategoryFilter/CategoryFilter';
import { getProductList } from '../../api/services';

import { ALL_CATEGORIES } from '../../utils/const';
import { CategoryOption } from '../CategoryFilter/types';

import type { Product } from '../../types/Product';
import { Box, Checkbox, FormControlLabel, TextField } from '@mui/material';

export const ProductManager: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [category] = useState<CategoryOption>(ALL_CATEGORIES);
  const [search, setSearch] = useState<string>('');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  useEffect(() => {
    setProducts(getProductList());
  }, []);

  return (
    <Box className="product-manager">
      <Box className="filters">
        <CategoryFilter selected={category} />
        <Box>
          <TextField label="Buscar:" placeholder="Nombre o categoría" variant="outlined" size="small" onChange={(e) => setSearch(e.target.value)} />
          {'your search value is ' + search}
        </Box>
        <Box className="stock-filter">
          <FormControlLabel control={<Checkbox checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} />} label="Solo con stock" />
        </Box>
      </Box>
      <ProductList productList={products} />
    </Box>
  );
};

export default ProductManager;
