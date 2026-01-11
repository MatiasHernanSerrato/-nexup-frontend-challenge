import React from 'react';
import { Product } from '../../types/Product';

interface ProductListProps {
  productList: Product[];
}

export const ProductList: React.FC<ProductListProps> = ({
  productList,
}) => {
  return <div>
    Product List Component
    <div>
      {productList.map((product) => (
        <div key={product.id}>
          {product.name} - {product.category} - ${product.price}
        </div>
      ))}
    </div>
  </div>;
};

export default ProductList;
