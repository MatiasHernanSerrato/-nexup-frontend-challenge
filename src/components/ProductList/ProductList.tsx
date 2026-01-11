import React from 'react';
import { Box } from '@mui/material';
import { Product } from '../../types/Product';
import CardProduct from './CardProduct/CardProduct';

interface ProductListProps {
  productList: Product[];
}

export const ProductList: React.FC<ProductListProps> = ({ productList }) => {
  return (
    <Box
      className="product-list"
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
      }}
    >
      {productList.map((product) => (
        <CardProduct key={product.id} product={product} />
      ))}
    </Box>
  );
};

export default ProductList;
