/**
 * The data of each individual cell to be used in a table
 */
export default interface TableCellData {
  /** The id of the row this cell is a part of, this will be shared with other rows */
  rowId: string;
  /** The column id this cell belongs to */
  columnId: string;
  /** Contents of the cell */
  content: string | number | React.ReactNode;
  /** Whether or not this cell can be resized */
  resizable?: boolean;
  /** Whether or not this cell can be moved around and reordered */
  canReorder?: boolean;
  /** Template-string styles that are specific to this cell */
  styles?: string; // TODO: Potentially find a better solution than using strings so we can type check
  /** Width in pixels of this cell */
  width: number;
  /** The maximum width that the cell can be resized to */
  maxWidth?: number;
  /** The minimum width that the cell can be resized to */
  minWidth?: number;
  /** Whether or not this cell will render */
  enabled?: boolean;
}
