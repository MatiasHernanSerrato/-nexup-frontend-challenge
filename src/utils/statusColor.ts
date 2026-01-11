import { ProductStatus } from "../types/ProductStatus";

export const statusColor = (status: ProductStatus): string => {
    switch (status) {
        case ProductStatus.Active:
            return '#22c55e';
        case ProductStatus.Inactive:
        default:
            return '#9ca3af';
    }
};