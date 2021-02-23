import { useState, useEffect, useMemo } from 'react';

import { fade, makeStyles, Theme, lighten } from '@material-ui/core/styles';

import { generateTableData } from './utils';

// constants
import { SPACING_HALF, SPACING_LEAST } from 'constants/spacing';

// providers
import { useTableValue } from './providers/TableProvider';

// components
import MuiTable from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Fade from '@material-ui/core/Fade';
import PaperWithTitle from 'components/PaperWithTitle';
import Pagination from '@material-ui/lab/Pagination';
import Button from '@material-ui/core/Button';
import ExportButton from 'components/ExportButton';
import TableHeader from './TableHeader';
import TableCollapseRow from './TableCollapseRow';

// types
import { TableProps, TableData } from './';

// icons
import SearchIcon from 'components/shared/icons/Search';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    width: '100%',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(SPACING_HALF),
  },
  searchInput: {
    marginLeft: theme.spacing(SPACING_HALF),
  },
  notFound: {
    height: 256,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pagination: {
    flex: 1,
  },
  actionsSection: {
    marginTop: 0,
    alignItems: 'center',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(SPACING_HALF),
    },
  },
  bulkActions: {
    marginLeft: theme.spacing(SPACING_HALF),
    display: 'flex',
    alignItems: 'center',
  },
  bulkButton: {
    margin: theme.spacing('0', SPACING_LEAST / 2),
  },
  tableFooter: {
    marginTop: theme.spacing(SPACING_HALF),
    alignItems: 'center',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  tableContainer: {
    maxHeight: 325,
    '&::-webkit-scrollbar': {
      width: '5px',
      height: '5px',
      background: 'red',
    },
    '&::-webkit-scrollbar-track': {
      background: theme.palette.background.paper,
    },
    '&::-webkit-scrollbar-thumb': {
      background: fade(theme.palette.primary.main, 0.1),
      borderRadius: theme.shape.borderRadius,
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: fade(theme.palette.primary.main, 0.5),
    },
    '&::-webkit-scrollbar-corner': {
      background: lighten(theme.palette.background.paper, 0.2),
    },
  },
}));

export type TableContentProps<
  TableRowData extends object
> = TableProps<TableRowData>;

/**
 * @component TableCore
 */
function TableCore<TableRowData extends object>({
  columns,
  data,
  title,
  actions,
  disableSearch,
  headerChildren,
  disableExport,
  disableBulkActions,
  parentChildData,
}: TableContentProps<TableRowData>) {
  const classes = useStyles();

  // data with added __id and children
  const [tableData, setTableData] = useState<TableData<TableRowData>[]>([]);

  // selected data
  const selected = useTableValue<TableData<TableRowData>>();

  const isEmpty = useMemo(() => !(tableData.length > 0), [tableData]);

  useEffect(() => {
    const generatedData = generateTableData(data, parentChildData);
    setTableData(generatedData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PaperWithTitle
      title={title}
      className={classes.paper}
      headerChildren={
        <div className={classes.header}>
          {!disableExport && (
            <ExportButton
              disabled={isEmpty}
              data={data}
              fileName={`${title}_data`}
            />
          )}
          {headerChildren}
        </div>
      }
    >
      {!disableSearch && !isEmpty && (
        <div data-testid="table_search" className={classes.searchBar}>
          <SearchIcon fontSize="small" color="secondary" />
          <div className={classes.searchInput}>
            <InputBase placeholder="جستجو..."></InputBase>
          </div>
        </div>
      )}
      <TableContainer className={classes.tableContainer}>
        {isEmpty ? (
          <div className={classes.notFound}>
            <Typography align="center" variant="h6" color="textSecondary">
              موردی یافت نشد! 🖕
            </Typography>
          </div>
        ) : (
          <MuiTable stickyHeader>
            {/* table header (where table column name seats) */}
            <TableHeader
              columns={columns}
              tableData={tableData}
              disableActions={!Boolean(actions)}
            />

            {tableData.map((row) => {
              return (
                <TableBody key={row.__id}>
                  <TableCollapseRow
                    children={row.children}
                    data={row}
                    actions={actions}
                    columns={columns}
                  />
                </TableBody>
              );
            })}
          </MuiTable>
        )}
      </TableContainer>

      {/* table footer */}
      {!isEmpty && (
        <div className={classes.tableFooter}>
          <div className={classes.pagination}>
            <Pagination
              data-testid="table_pagination"
              size="small"
              shape="rounded"
              color="primary"
              count={10}
            />
          </div>
          <Fade in={selected.length > 1}>
            <div className={classes.actionsSection}>
              <Typography data-testid="table_selected_text">
                {selected.length} انتخاب شده
              </Typography>
              {!disableBulkActions && actions && (
                <div
                  className={classes.bulkActions}
                  data-testid="table_bulk_actions"
                >
                  {actions.map((action, key) => {
                    if (action.disableBulk) return null;
                    return (
                      <div className={classes.bulkButton} key={key}>
                        <Button
                          data-testid="table_bulk_action_button"
                          size="small"
                          variant="contained"
                          color="primary"
                          onClick={() => action.onClick && action.onClick(selected)}
                          startIcon={action.icon}
                          disabled={action.disabled}
                        >
                          {action.label}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </Fade>
        </div>
      )}
      {/* end table footer */}
    </PaperWithTitle>
  );
}

export default TableCore;
