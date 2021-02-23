import { render, fireEvent, waitFor } from '@testing-library/react';

// components
import TableCollapseRow, { TableCollapseRowProps } from 'components/Table/TableCollapseRow';
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

const table = document.createElement('tbody');
const init = (data: TableData<RowData>, props?: Partial<TableCollapseRowProps<RowData>>) => {
  return render(<TableCollapseRow data={data} columns={columns} {...props} />, {
    container: document.body.appendChild(table),
  });
};

// create table data
let data: TableData<RowData>[] = [];
beforeAll(() => {
  data = generateTableData(Data, parentChildData);
});

it('should render row data', async () => {
  const testData = data[0];
  const { findAllByTestId } = init(testData);
  const cells = await findAllByTestId('table_collapse_row_cell');
  columns.forEach((column, index) => {
    expect(cells[index]).toHaveTextContent(testData[column.field as keyof Omit<RowData, 'parentId'>]);
  });
});

it('should be selected after click on checkbox', async () => {
  const testData = data[0];
  const { getByTestId, queryByTestId } = init(testData);
  const checkbox = getByTestId('table_collapse_row_checkbox');

  fireEvent.click(checkbox, () => {
    checkbox.querySelector('input[type="checkbox"]');
    expect(checkbox).toHaveProperty('checked', true);

    const selectedRow = queryByTestId('table_collapse_row');
    expect(selectedRow).toHaveClass('Mui-selected');
  });
});

describe('row action', () => {
  it('should render action button if has actions', () => {
    const testData = data[0];
    const { queryByTestId } = init(testData, { actions: [{ label: 'action1' }, { label: 'action2' }] });
    const actionButton = queryByTestId('table_collapse_row_action_button');
    expect(actionButton).toBeTruthy();
  });

  it('should not render action button if doest not have actions', () => {
    const testData = data[0];
    const { queryByTestId } = init(testData);
    const actionButton = queryByTestId('table_collapse_row_action_button');
    expect(actionButton).toBeFalsy();
  });

  it('should render action menu after click on action button', async () => {
    const testData = data[0];
    const { getByTestId, queryByTestId } = init(testData, { actions: [{ label: 'action1' }, { label: 'action2' }] });
    const actionButton = getByTestId('table_collapse_row_action_button');

    fireEvent.click(actionButton);

    // wait for appearance
    await waitFor(() => {
      expect(queryByTestId('table_collapse_row_action_menu')).toBeInTheDocument();
    });
  });
});

describe('row children', () => {
  it('should render collapse button if has children', () => {
    const testData = data[0];
    const { queryByTestId } = init(testData, { children: testData.children });
    const collapseButton = queryByTestId('table_collapse_row_open_button');
    expect(collapseButton).toBeTruthy();
  });

  it('should not render collapse button if does not have children', () => {
    const testData = data[0];
    const { queryByTestId } = init(testData);
    const collapseButton = queryByTestId('table_collapse_row_open_button');
    expect(collapseButton).toBeFalsy();
  });

  it('should render children after click on collapse button', async () => {
    const testData = data[0];
    const { findAllByTestId, getByTestId } = init(testData, { children: testData.children });

    const collapseButton = getByTestId('table_collapse_row_open_button');

    fireEvent.click(collapseButton);

    // wait for appearance
    await waitFor(async () => {
      const rows = await findAllByTestId('table_collapse_row');
      expect(rows.length).toBe((testData.children as TableData<RowData>[]).length + 1);
    });
  });
});

// --isolatedModules
export {};
