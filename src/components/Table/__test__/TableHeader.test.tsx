import { render, fireEvent } from '@testing-library/react';

// components
import TableHeader, { TableHeaderProps } from 'components/Table/TableHeader';
import { TableColumn, TableData } from 'components/Table';

// data
import Data from './data.json';

// utils
import { generateTableData } from 'components/Table/utils';

type RowData = typeof Data[0];

const parentChildData = (row: TableData<RowData>, rows: TableData<RowData>[]) => rows.find((item) => item._id === row.parentId);

const columns: TableColumn<RowData>[] = [
  { field: 'name', title: 'name' },
  { field: '_id', title: 'id' },
];

const table = document.createElement('table');
const init = (data: TableData<RowData>[], props?: Partial<TableHeaderProps<RowData>>) => {
  return render(<TableHeader tableData={data} columns={columns} {...props} />, {
    container: document.body.appendChild(table),
  });
};

// create table data
let data: TableData<RowData>[] = [];
beforeAll(() => {
  data = generateTableData(Data, parentChildData);
});

it('should render header', async () => {
  const { findAllByTestId } = init(data);
  const cells = await findAllByTestId('table_header_cell');
  columns.forEach((column, index) => {
    expect(cells[index]).toHaveTextContent(column.title as string);
  });
});

it('should not render last cell if disableActions is true', () => {
  const { queryByTestId } = init(data, { disableActions: true });
  const actionCell = queryByTestId('table_header_action_cell');
  expect(actionCell).toBeFalsy();
});

it('should show last cell if disableActions is false', () => {
  const { queryByTestId } = init(data);
  const actionCell = queryByTestId('table_header_action_cell');
  expect(actionCell).toBeTruthy();
});

it('should be selected after click on checkbox', async () => {
  const { getByTestId } = init(data);
  const checkbox = getByTestId('table_header_checkbox');

  fireEvent.click(checkbox, () => {
    checkbox.querySelector('input[type="checkbox"]');
    expect(checkbox).toHaveProperty('checked', true);
  });
});

// --isolatedModules
export {};
