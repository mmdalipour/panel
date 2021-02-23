import { useContext, useState, createContext, SetStateAction, ReactNode, Dispatch } from 'react';

import { once } from 'lodash';

type ProviderProps<T extends object> = {
  children: ReactNode;
};

// initialize tableSelected context
const createTableContextValue = once(<T,>() => createContext<T[]>([]));
const createTableContextSetState = once(<T,>() => createContext<Dispatch<SetStateAction<T[]>>>(() => null));

/**
 * @provider TableProvider
 * @summary table provider use this at top of the react tree to get tableSelected data on every level
 * @param {ReactNode} children
 */
function TableProvider<T extends object>({ children }: ProviderProps<T>) {
  const TableContextValue = createTableContextValue<T>();
  const TableContextSetState = createTableContextSetState<T>();

  const [tableSelected, setTableSelected] = useState<T[]>([]);

  return (
    <TableContextValue.Provider value={tableSelected}>
      <TableContextSetState.Provider value={setTableSelected}>{children}</TableContextSetState.Provider>
    </TableContextValue.Provider>
  );
}

/**
 * @function useTableState
 * @summary returns tableSelected state and tableSelected set state just like out trusty useState
 */
export type UseTableStateType<T extends object> = [T[], Dispatch<SetStateAction<T[]>>];
function useTableState<T extends object>() {
  const tableSelected = useContext(createTableContextValue<T>());
  const setTableSelected = useContext(createTableContextSetState<T>());
  const state: UseTableStateType<T> = [tableSelected, setTableSelected];
  return state;
}

/**
 * @function useTableValue
 * @summary returns tableSelected statel
 */
function useTableValue<T extends object>(): T[] {
  const tableSelected = useContext(createTableContextValue<T>());
  return tableSelected;
}

/**
 * @function useTableSetState
 * @summary returns tableSelected set state
 * @returns {Dispatch<SetStateAction<boolean>>} setTableSelected
 */
function useTableSetState<T extends object>(): Dispatch<SetStateAction<T[]>> {
  const setTableSelected = useContext(createTableContextSetState<T>());
  return setTableSelected;
}

export { TableProvider, useTableState, useTableValue, useTableSetState };
