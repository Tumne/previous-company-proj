import TableCellData from './tableCellData';
/**
 * Table data object used to build out the table
 */
export default interface TableData {
  /** The cells that belong in the header, also determines the columns created by css-grid */
  headerData: TableCellData[];
  /** The rows of data that make up the table content. This should match the ids of the cells in `headerData` */
  data: TableCellData[][];
}
