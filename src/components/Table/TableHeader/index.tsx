import { useMemo } from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';

// providers
import { useTableState } from 'components/Table/providers/TableProvider';

// components
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';

import { TableColumn, TableData } from 'components/Table';

const useStyles = makeStyles((theme: Theme) => ({
  tableHead: {
    //background: theme.palette.background.tableHeadBackground,
  },
  tableHeadCell: {
    whiteSpace: 'nowrap',
  },
}));

export type TableHeaderProps<TableRowData extends object> = {
  columns: TableColumn<TableRowData>[];
  disableActions?: boolean;
  tableData: TableData<TableRowData>[];
};

/**
 * @component TableHeader
 */
function TableHeader<TableRowData extends object>({ columns, disableActions, tableData }: TableHeaderProps<TableRowData>) {
  const classes = useStyles();

  const [selected, setSelected] = useTableState();

  // check data states for header
  const indeterminate = useMemo(() => selected.length > 0 && selected.length < tableData.length, [selected, tableData]);
  const checked = useMemo(() => tableData.length > 0 && selected.length === tableData.length, [selected, tableData]);

  // on select all check box
  const onSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected(tableData);
      return;
    }
    setSelected([]);
  };

  return (
    <TableHead className={classes.tableHead} data-testid="table_header">
      <TableRow>
        <TableCell padding="checkbox" variant="head">
          <Checkbox
            data-testid="table_header_checkbox"
            color="primary"
            onChange={onSelectAll}
            indeterminate={indeterminate}
            checked={checked}
          />
        </TableCell>

        {columns.map((head, key) => (
          <TableCell data-testid="table_header_cell" key={key} className={classes.tableHeadCell}>
            {head.title}
          </TableCell>
        ))}

        {/* action menu cell */}
        {!disableActions && <TableCell data-testid="table_header_action_cell"></TableCell>}
      </TableRow>
    </TableHead>
  );
}

export default TableHeader;
