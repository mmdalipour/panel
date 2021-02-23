import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';

// components
import Menu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { TableAction, TableData } from 'components/Table';

const useStyles = makeStyles((theme: Theme) => ({
  menuItem: {
    minWidth: 124,
  },
}));

export type TableActionMenuProps<TableRowData extends object> = {
  actions: TableAction<TableRowData>[];
  onClose: () => void;
  row: TableData<TableRowData>;
} & Omit<MenuProps, 'onClose'>;

/**
 * @component TableActionMenu
 */
function TableActionMenu<TableRowData extends object>({ row, actions, onClose = () => {}, ...rest }: TableActionMenuProps<TableRowData>) {
  const classes = useStyles();

  const theme = useTheme();

  return (
    <Menu
      PaperProps={{ variant: theme.palette.type === 'dark' ? 'outlined' : 'elevation' }}
      data-testid="table_action_menu"
      keepMounted={false}
      getContentAnchorEl={null}
      onClose={onClose}
      disablePortal
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      {...rest}
    >
      {actions.map((action, index) => (
        <MenuItem
          data-testid="table_action_menu_item"
          key={index}
          className={classes.menuItem}
          onClick={() => {
            action.onClick && action.onClick(row);
            onClose();
          }}
          disabled={action.disabled}
        >
          {action.icon && <ListItemIcon data-testid="table_action_menu_item_icon">{action.icon}</ListItemIcon>}
          <ListItemText data-testid="table_action_menu_item_text">{action.label}</ListItemText>
        </MenuItem>
      ))}
    </Menu>
  );
}

export default TableActionMenu;
