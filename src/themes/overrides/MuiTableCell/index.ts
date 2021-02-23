import { StyleRules } from '@material-ui/core/styles';
import { TableCellClassKey } from '@material-ui/core/TableCell';

// palette

const MuiTableCell: Partial<StyleRules<TableCellClassKey>> = {
  root: {
    borderBottom: 'none',
  },
};

export default MuiTableCell;
