import React, { useEffect, useMemo, useState, useDeferredValue } from 'react';
import {
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
  CircularProgress,
  Typography,
} from '@mui/material';

import { fetchProductList } from '../../api/services';
import { ALL_CATEGORIES } from '../../utils/const';
import { CategoryOption } from '../CategoryFilter/types';
import { ProductList } from '../ProductList/ProductList';
import { CategoryFilter } from '../CategoryFilter/CategoryFilter';

import type { Product } from '../../types/Product';

const ProductManager: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<CategoryOption>(ALL_CATEGORIES);
  const [search, setSearch] = useState<string>('');
  const deferredSearch = useDeferredValue(search);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await fetchProductList();
      setProducts(data);
      setLoading(false);
    })();
  }, []);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = deferredSearch.trim().toLowerCase();
    const filterByCategory = category !== ALL_CATEGORIES;
    const filterBySearch = normalizedSearch.length > 0;

    return products.filter((product) => {
      if (filterByCategory && product.category !== category) return false;

      if (inStockOnly && (product.stock ?? 0) <= 0) return false;

      if (filterBySearch) {
        const haystack = `${product.name} ${product.category}`.toLowerCase();
        if (!haystack.includes(normalizedSearch)) return false;
      }

      return true;
    });
  }, [products, category, deferredSearch, inStockOnly]);

  const renderContent = () => {
    if (loading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress />
        </Box>
      );
    }
    if (filteredProducts.length === 0) {
      return (
        <Box className="empty-state">
          <Typography variant="h6">No hay productos que coincidan</Typography>
          <Typography variant="body2" color="text.secondary">
            Ajusta los filtros o la búsqueda para ver resultados.
          </Typography>
        </Box>
      );
    }
    return <ProductList productList={filteredProducts} />;
  };

  return (
    <Box className="product-manager">
      <Box className="filters">
        <CategoryFilter selected={category} onChange={setCategory} />
        <Box>
          <TextField
            fullWidth
            label="Buscar"
            placeholder="Nombre o categoría"
            variant="outlined"
            size="small"
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>
        <Box className="stock-filter">
          <FormControlLabel
            control={
              <Checkbox
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
              />
            }
            label="Solo con stock"
          />
        </Box>
      </Box>

      {renderContent()}
    </Box>
  );
};

export default ProductManager;
