import React from 'react';
import { Product } from '../../types/Product';
import { Box } from '@mui/material';
import CardProduct from './CardProduct/CardProduct';

interface ProductListProps {
  productList: Product[];
}

export const ProductList: React.FC<ProductListProps> = ({
  productList,
}) => {
  return (
    <Box className="product-list" sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
      {productList.map((product) => (
        <CardProduct key={product.id} product={product} />
      ))}
    </Box>
  );
};

export default ProductList;
