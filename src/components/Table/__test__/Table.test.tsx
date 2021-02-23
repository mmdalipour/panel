import { render, fireEvent, waitFor } from '@testing-library/react';

// components
import Table, { TableAction, TableColumn, TableData, TableProps } from 'components/Table';

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

const init = (data: TableData<RowData>[], props?: Partial<TableProps<RowData>>) => {
  return render(<Table title="test table" data={data} columns={columns} {...props} />);
};

// create table data
let data: TableData<RowData>[] = [];
beforeAll(() => {
  data = generateTableData(Data, parentChildData);
});

it('should not render search if disableSearch is true', () => {
  const { queryByTestId } = init(data, { disableSearch: true });
  const search = queryByTestId('table_search');
  expect(search).toBeFalsy();
});

it('should render search if disableSearch is false', () => {
  const { queryByTestId } = init(data, { disableSearch: false });
  const search = queryByTestId('table_search');

  expect(search).toBeTruthy();
});

it('should render table header', () => {
  const { queryByTestId } = init(data);
  const tableHeader = queryByTestId('table_header');

  expect(tableHeader).toBeTruthy();
});

it('should render rows', async () => {
  const { findAllByTestId } = init(data);
  const tableRows = await findAllByTestId('table_collapse_row');
  const rowsCount = data.length;
  expect(tableRows.length).toBe(rowsCount);
});

it('should render pagination', () => {
  const { queryByTestId } = init(data);
  const tablePagination = queryByTestId('table_pagination');
  expect(tablePagination).toBeTruthy();
});

it('should show two selected', async () => {
  const { findAllByTestId, getByTestId } = init(data);
  const selectedText = getByTestId('table_selected_text');

  const checkboxList = await findAllByTestId('table_collapse_row_checkbox');

  checkboxList.forEach((checkbox) => {
    fireEvent.click(checkbox);
  });
  await waitFor(() => {
    expect(selectedText).toHaveTextContent(data.length.toString());
  });
});

it('should not render bulk actions if disableBulkActions is true and has actions', () => {
  const { queryByTestId } = init(data, { disableBulkActions: true, actions: [{ label: 'actions' }] });
  const bulkActions = queryByTestId('table_bulk_actions');

  expect(bulkActions).toBeFalsy();
});

it('should render bulk actions if disableBulkActions is false and has actions', () => {
  const { queryByTestId } = init(data, { disableBulkActions: false, actions: [{ label: 'actions' }] });
  const bulkActions = queryByTestId('table_bulk_actions');

  expect(bulkActions).toBeTruthy();
});

it('should render bulk action buttons', async () => {
  const props: Partial<TableProps<RowData>> = { disableBulkActions: false, actions: [{ label: 'action1' }, { label: 'action2' }] };
  const { getAllByTestId } = init(data, props);
  const bulkActionButtons = getAllByTestId('table_bulk_action_button');

  const actions = props.actions as TableAction<RowData>[];
  expect(bulkActionButtons.length).toBe(actions.length);
});

it('should not render bulk action button with disableBulk option set to true', () => {
  const props: Partial<TableProps<RowData>> = {
    disableBulkActions: false,
    actions: [{ label: 'action1' }, { label: 'action2', disableBulk: true }, { label: 'action3' }],
  };
  const { getAllByTestId } = init(data, props);
  const bulkActionButtons = getAllByTestId('table_bulk_action_button');

  const actions = props.actions as TableAction<RowData>[];

  expect(bulkActionButtons.length).toBe(actions.filter((action) => !action.disableBulk).length);
});

// --isolatedModules
export {};
