import { ReactNode } from 'react';

// providers
import { TableProvider } from './providers/TableProvider';

// components
import { TableCellProps } from '@material-ui/core/TableCell';
import TableCore from './TableCore';

export type TableColumn<TableRowData extends object> = {
  field: keyof TableData<TableRowData>;
  title?: string;
  render?: (data: TableData<TableRowData>) => ReactNode;
  tableCellProps?: TableCellProps;
};

export type TableAction<TableRowData extends object> = {
  disabled?: boolean;
  icon?: ReactNode;
  label?: string;
  onClick?: (data: TableData<TableRowData> | TableData<TableRowData>[]) => void;
  disableBulk?: boolean;
};

export type TableProps<TableRowData extends object> = {
  columns: TableColumn<TableRowData>[];
  data: TableRowData[];
  title: string;
  actions?: TableAction<TableRowData>[];
  disableSearch?: boolean;
  disableExport?: boolean;
  disableBulkActions?: boolean;
  headerChildren?: ReactNode;
  parentChildData?: (row: TableData<TableRowData>, rows: TableData<TableRowData>[]) => TableData<TableRowData> | undefined;
};

export type TableData<TableRowData extends object> = TableRowData & { __id: string; children?: TableData<TableRowData>[] };

/**
 * @component Table
 */
function Table<TableRowData extends object>(props: TableProps<TableRowData>) {
  return (
    <TableProvider>
      <TableCore {...props} />
    </TableProvider>
  );
}

export default Table;
