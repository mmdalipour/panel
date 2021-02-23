import { useMemo } from 'react';

import { CSVLink } from 'react-csv';

// components
import Button, { ButtonProps } from '@material-ui/core/Button';

// icons
import ExportIcon from 'components/shared/icons/Export';

export type ExportButtonProps = {
  data: object[];
  fileName?: string;
} & ButtonProps;

/**
 * @component ExportButton
 */
function ExportButton({ fileName, data, disabled, ...rest }: ExportButtonProps) {
  const RootComponent = useMemo(() => (disabled ? 'div' : CSVLink), [disabled]);
  return (
    <RootComponent data={data} filename={`${fileName}.csv`}>
      <Button variant="outlined" disabled={disabled} size="small" startIcon={<ExportIcon fontSize="small" />} {...rest}>
        خروجی
      </Button>
    </RootComponent>
  );
}

export default ExportButton;
