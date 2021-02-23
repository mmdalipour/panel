import { useState, Fragment } from 'react';
import clsx from 'clsx';

import { fade, makeStyles, Theme, useTheme } from '@material-ui/core/styles';

// providers
import { useTableState } from 'components/Table/providers/TableProvider';

// constants
import { SPACING_HALF } from 'constants/spacing';

// components
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import { TableAction, TableData, TableColumn } from 'components/Table';
import TableActionMenu from 'components/Table/TableActionMenu';

// icons
import MenuVerticalIcon from '@material-ui/icons/MoreVert';
import DownArrowIcon from 'components/shared/icons/DownArrow';

const useStyles = makeStyles((theme: Theme) => ({
  root: ({
    color,
    padding = 0,
  }: Pick<TableCollapseRowProps<never>, 'color' | 'padding'>) => {
    return {
      background: color ? fade(color, padding * 0.05) : 'unset',
    };
  },
  tableChild: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  downArrow: {
    marginRight: theme.spacing(SPACING_HALF),
  },
  tableRowCell: {
    whiteSpace: 'nowrap',
  },
  arrowButton: {
    transition: theme.transitions.create(['transform']),
    fontSize: 15,
  },
  arrowDown: {
    transform: 'rotate(180deg)',
  },
  padding: ({ padding = 0 }: Pick<TableCollapseRowProps<never>, 'padding'>) => {
    if (padding > 0) {
      return {
        padding: theme.spacing(padding),
      };
    } else return {};
  },
}));

type TableCollapseRowItem<TableRowData extends object> = {
  actions?: TableAction<TableRowData>[];
  data: TableData<TableRowData>;
  columns: TableColumn<TableRowData>[];
  children?: TableData<TableRowData>[];
  padding?: number;
  color?: string;
};
export type TableCollapseRowProps<
  TableRowData extends object
> = TableCollapseRowItem<TableRowData>;

/**
 * @component TableCollapseRow
 */
function TableCollapseRow<TableRowData extends object>({
  columns,
  data,
  actions,
  children,
  padding = 0,
  color,
}: TableCollapseRowProps<TableRowData>) {
  const classes = useStyles({ padding, color });

  const theme = useTheme();

  const [selected, setSelected] = useTableState<TableData<TableRowData>>();

  const [openMenu, setOpenMenu] = useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const onSelect = (item: TableData<TableRowData>) => {
    const id = item.__id;
    let temp = [...selected];
    const keyIndex = temp.findIndex((item) => item.__id === id);
    const removeItem = (index: any) => {
      temp.splice(index, 1);
    };
    if (keyIndex > -1) {
      removeItem(keyIndex);
    } else temp.push(item);
    setSelected(temp);
  };

  // check if row is selected
  const isSelected = (id: string) =>
    selected.findIndex((item) => item.__id === id) > -1;

  const onOpenClick = () => {
    setOpen((prevState) => !prevState);
  };

  // on action menu click
  const onMenuClick = (element: HTMLButtonElement) => {
    setOpenMenu(element);
  };

  const onMenuClose = () => {
    setOpenMenu(null);
  };

  const getDepth = () => (children ? padding + 1 : padding);

  const upArrowClasses = clsx(classes.arrowButton, open && classes.arrowDown);

  const rootSelected = isSelected && isSelected(data.__id);

  return (
    <Fragment>
      <TableRow
        selected={rootSelected}
        className={classes.root}
        data-testid="table_collapse_row"
      >
        <TableCell padding="checkbox" className={classes.padding}>
          <Checkbox
            data-testid="table_collapse_row_checkbox"
            color="primary"
            checked={rootSelected}
            onClick={() => onSelect(data)}
          />
        </TableCell>
        {columns.map((column, key) => {
          return (
            <TableCell
              data-testid="table_collapse_row_cell"
              className={classes.tableRowCell}
              key={key}
              align="left"
              {...column.tableCellProps}
            >
              {column.render ? column.render(data) : data[column.field]}
            </TableCell>
          );
        })}

        {(actions || children) && (
          <TableCell align="left">
            <div className={classes.tableChild}>
              {children && (
                <div className={classes.downArrow}>
                  <IconButton
                    data-testid="table_collapse_row_open_button"
                    onClick={onOpenClick}
                    size="small"
                  >
                    <DownArrowIcon
                      color="secondary"
                      fontSize="small"
                      className={upArrowClasses}
                    />
                  </IconButton>
                </div>
              )}

              {actions && (
                <Fragment>
                  <IconButton
                    data-testid="table_collapse_row_action_button"
                    size="small"
                    onClick={(event) => onMenuClick(event.currentTarget)}
                  >
                    <MenuVerticalIcon />
                  </IconButton>

                  <TableActionMenu
                    data-testid="table_collapse_row_action_menu"
                    row={data}
                    actions={actions}
                    anchorEl={openMenu}
                    open={Boolean(openMenu)}
                    onClose={onMenuClose}
                  />
                </Fragment>
              )}
            </div>
          </TableCell>
        )}
      </TableRow>

      {children && open && (
        <Fragment>
          {children.map((child) => {
            return (
              <TableCollapseRow
                children={child.children}
                key={child.__id}
                columns={columns}
                data={child}
                actions={actions}
                padding={getDepth()}
                color={theme.palette.primary.main}
              />
            );
          })}
        </Fragment>
      )}
    </Fragment>
  );
}

export default TableCollapseRow;
