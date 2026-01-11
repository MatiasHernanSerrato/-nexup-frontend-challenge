import React from 'react';

import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { Product as ProductType } from '../../../types/Product';
import { formatPrice } from '../../../utils/utils';
import { statusColor } from '../../../utils/statusColor';

interface ProductProps {
    product: ProductType;
}

const CardProduct: React.FC<ProductProps> = ({ product }) => {
    const isInStock = (product.stock ?? 0) > 0;

    return (
        <Card className="product" sx={{ backgroundColor: 'background.paper' }}>
            <CardContent>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 1,
                        justifyContent: 'space-between',
                        gap: 1,
                    }}
                >
                    <Typography variant="h6" noWrap>
                        {product.name}
                    </Typography>
                    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
                        <Box
                            sx={{
                                width: 10,
                                height: 10,
                                borderRadius: '50%',
                                bgcolor: statusColor(product.status),
                                flexShrink: 0,
                            }}
                        />
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
                    <Chip size="small" label={product.category} />
                    <Chip
                        size="small"
                        color={isInStock ? 'success' : 'default'}
                        label={isInStock ? 'En stock' : 'Agotado'}
                        variant={isInStock ? 'filled' : 'outlined'}
                    />
                </Box>

                <Typography variant="body2" color="text.secondary">
                    Precio: ${formatPrice(product.price)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Estado: {product.status === 'Active' ? 'Activo' : 'Inactivo'}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default CardProduct;
