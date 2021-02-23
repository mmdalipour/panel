import { TableData } from 'components/Table';

// utils
import { addUniqueKey, listToTree } from 'utils';

/**
 * @function generateTableData
 * @param data table row data
 * @param parentChildData when called gets row's parent
 * @summary gets flat list of table data and convert it to tree with unique ids
 */
function generateTableData<TableRowData extends object>(
  data: TableRowData[],
  parentChildData?: (row: TableData<TableRowData>, rows: TableData<TableRowData>[]) => TableData<TableRowData> | undefined
): TableData<TableRowData>[] {
  const uniqueData: TableData<TableRowData>[] = addUniqueKey<TableRowData>(data);
  if (parentChildData) {
    const tree = listToTree(uniqueData, parentChildData);
    return tree;
  } else {
    return uniqueData;
  }
}

export { generateTableData };
