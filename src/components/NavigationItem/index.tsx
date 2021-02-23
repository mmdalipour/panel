import { Fragment, useState, ReactNode } from 'react';
import clsx from 'clsx';

import { fade, makeStyles, Theme } from '@material-ui/core/styles';

// react-router-dom
import { NavLink } from 'react-router-dom';

// constants
import { SPACING_HALF } from 'constants/spacing';

// components
import ListItem from '@material-ui/core/ListItem';
import ListItemText, { ListItemTextProps } from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import List from '@material-ui/core/List';

// icons
import DownArrowIcon from 'components/shared/icons/DownArrow';

const useStyles = makeStyles((theme: Theme) => ({
  arrow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: fade(theme.palette.sideBar.color, 0.5),
    marginLeft: theme.spacing(SPACING_HALF),
  },
  arrowButton: {
    transition: theme.transitions.create(['transform']),
  },
  arrowDown: {
    transform: 'rotate(180deg)',
  },
  listItem: {
    transition: theme.transitions.create(['background', 'color']),
    '&.active': {
      background: theme.palette.sideBar.actions.selected,
    },
    '&.active $listItemText': {
      color: theme.palette.secondary.main,
    },
    '&.active $listItemIcon': {
      color: fade(theme.palette.secondary.main, 0.5),
    },
  },
  listItemText: {
    color: theme.palette.sideBar.color,
  },
  listItemIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(SPACING_HALF),
    color: fade(theme.palette.sideBar.color, 0.5),
  },
  navigationList: {
    marginLeft: theme.spacing(SPACING_HALF),
  },
}));

export type NavigationItem = {
  text?: string;
  to?: string;
  icon?: ReactNode;
  items?: NavigationItem[];
  props?: Omit<NavigationItemProps, 'text' | 'items'>;
};
export type NavigationItemProps = NavigationItem & ListItemTextProps;

/**
 * @component NavigationItem
 */
function NavigationItemCore({ text, items, to = '#', icon }: NavigationItemProps) {
  const classes = useStyles();

  const [open, setOpen] = useState<boolean>(false);

  const onClick = () => {
    setOpen((prevState) => !prevState);
  };

  const upArrowClasses = clsx(classes.arrowButton, open && classes.arrowDown);

  const renderItemContent = (
    <Fragment>
      {icon && <ListItemIcon className={classes.listItemIcon}>{icon}</ListItemIcon>}
      <ListItemText
        color="inherit"
        className={classes.listItemText}
        primary={text}
      />
    </Fragment>
  );

  return (
    <Fragment>
      {items ? (
        <ListItem className={classes.listItem} button onClick={onClick}>
          {renderItemContent}
          <div className={classes.arrow}>
            <DownArrowIcon className={upArrowClasses} fontSize="small" />
          </div>
        </ListItem>
      ) : (
        <ListItem
          className={classes.listItem}
          component={NavLink as any}
          to={to}
          button
          onClick={onClick}
          isActive={(match: any, location: any) => {
            if (
              to === location.pathname ||
              match ||
              (to === '/dashboard' && location.pathname === '/')
            )
              return true;
          }}
        >
          {renderItemContent}
        </ListItem>
      )}

      {items && (
        <Collapse in={open} unmountOnExit>
          <div className={classes.navigationList}>
            <List>
              {items.map((item, key) => (
                <NavigationItemCore key={key} {...item} />
              ))}
            </List>
          </div>
        </Collapse>
      )}
    </Fragment>
  );
}

export default NavigationItemCore;
