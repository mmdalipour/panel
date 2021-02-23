import { Dispatch, SetStateAction } from 'react';
import { Category } from 'api/category';

// components
import Select from 'components/shared/Select';

// hooks
import { useCategories } from 'hooks/category';

export type SelectCategoryProps = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  label?: string;
};

/**
 * @component SelectCategory
 */
function SelectCategory({ value, setValue, label = 'دسته بندی' }: SelectCategoryProps) {
  const { data, isLoading } = useCategories();
  const brands = data?.data;
  return (
    <Select
      label={isLoading ? 'درحال پردازش...' : label}
      value={value}
      onChange={(text) => setValue(text)}
      options={brands as Category[]}
    />
  );
}

export default SelectCategory;
