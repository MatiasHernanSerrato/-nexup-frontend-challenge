import React from 'react';

import { Product as ProductType } from '../../../types/Product';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { formatPrice } from '../../../utils/utils';
import { statusColor } from '../../../utils/statusColor';

interface ProductProps {
    product: ProductType;
}

export const CardProduct: React.FC<ProductProps> = ({ product }) => {
    return (
        <Card className="product" sx={{ minWidth: 25 }}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5, justifyContent: 'space-between' }}>
                    <Typography variant="h6">{product.name}</Typography>  <Box
                        sx={{
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            bgcolor: statusColor(product.status),
                            flexShrink: 0,
                        }}
                    />
                </Box>
                <Typography variant="body2">Categoría: {product.category}</Typography>
                <Typography variant="body2">Precio: ${formatPrice(product.price)}</Typography>
                <Typography variant="body2">
                    Estado: {product.status === 'Active' ? 'Activo' : 'Inactivo'}
                </Typography>
                <Typography variant="body2">
                    {product.stock ? 'En stock' : 'Agotado'}
                </Typography>
            </CardContent>

        </Card>
    );
}

export default CardProduct;