import { render } from '@testing-library/react';

// components
import TableActionMenu, { TableActionMenuProps } from 'components/Table/TableActionMenu';
import { TableData } from 'components/Table';

// data
import Data from './data.json';

// utils
import { generateTableData } from 'components/Table/utils';
import { normalizeArray } from 'utils';

type RowData = typeof Data[0];

const parentChildData = (row: TableData<RowData>, rows: TableData<RowData>[]) => rows.find((item) => item._id === row.parentId);

const init = (props: Partial<TableActionMenuProps<RowData>>) => {
  const anchorEl = document.createElement('div');

  const defaultProps: TableActionMenuProps<RowData> = {
    actions: [],
    onClose: () => false,
    open: true,
    anchorEl,
    row: data[0],
    ...props,
  };

  return render(<TableActionMenu {...defaultProps} />);
};

// create table data
let data: TableData<RowData>[] = [];
beforeAll(() => {
  data = generateTableData(Data, parentChildData);
});

it('should render actions list', () => {
  const props: Pick<TableActionMenuProps<RowData>, 'actions'> = { actions: [{ label: 'item1' }, { label: 'item2' }] };
  const { getAllByTestId } = init(props);

  const items = getAllByTestId('table_action_menu_item');
  expect(items.length).toBe(props.actions.length);
});

it('should render icon list', () => {
  const props: Pick<TableActionMenuProps<RowData>, 'actions'> = { actions: [{ label: 'item1', icon: <div /> }, { label: 'item2' }] };
  const { getAllByTestId } = init(props);

  const icons = getAllByTestId('table_action_menu_item_icon');
  expect(icons.length).toBe(normalizeArray(props.actions.map((_) => _.icon)).length);
});

it('should render label list', () => {
  const props: Pick<TableActionMenuProps<RowData>, 'actions'> = { actions: [{ label: 'item1', icon: <div /> }, { label: 'item2' }] };
  const { getAllByTestId } = init(props);

  const icons = getAllByTestId('table_action_menu_item_text');
  expect(icons.length).toBe(normalizeArray(props.actions.map((_) => _.label)).length);
});

// --isolatedModules
export {};
