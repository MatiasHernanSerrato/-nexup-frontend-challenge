import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { CategoryOption } from './types';
import { ProductCategory } from '../../types/ProductCategory';
import { ALL_CATEGORIES } from '../../utils/const';

interface CategoryFilterProps {
  selected: CategoryOption;
  onChange: (next: CategoryOption) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selected,
  onChange,
}) => {
  return (
    <FormControl fullWidth size="small">
      <InputLabel id="category-select-label">Categoría</InputLabel>
      <Select
        labelId="category-select-label"
        id="category-select"
        label="Categoría"
        value={selected}
        onChange={(e) => onChange(e.target.value as CategoryOption)}
      >
        <MenuItem value={ALL_CATEGORIES}>Todos</MenuItem>
        {Object.values(ProductCategory).map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategoryFilter;
