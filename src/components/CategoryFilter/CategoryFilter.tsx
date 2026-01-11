import React from 'react';

import { CategoryOption } from './types';

interface CategoryFilterProps {
  selected: CategoryOption;
  onChange?: VoidFunction;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = () => {
  return <div />;
};

export default CategoryFilter;