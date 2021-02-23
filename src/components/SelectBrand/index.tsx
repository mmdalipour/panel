import { Dispatch, SetStateAction } from 'react';
import { Brand } from 'api/brand';

// components
import Select from 'components/shared/Select';

// hooks
import { useBrands } from 'hooks/brand';

export type SelectBrandProps = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  label?: string;
};

/**
 * @component SelectBrand
 */
function SelectBrand({ value, setValue, label = 'برند' }: SelectBrandProps) {
  const { data, isLoading } = useBrands();
  const brands = data?.data;
  return (
    <Select
      label={isLoading ? 'درحال پردازش...' : label}
      value={value}
      onChange={(text) => setValue(text)}
      options={brands as Brand[]}
    />
  );
}

export default SelectBrand;
