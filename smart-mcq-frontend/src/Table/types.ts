
export type TableColumnType = "text" | "date" | "datetime" | "time" | "number" | "custom";

export interface TableColumn {
    name: string;
    label: string;
    format?: (value: any, row: any, rowIndex: any) => JSX.Element
    type?: TableColumnType;
}
