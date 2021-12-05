
export type TableColumnType = "text" | "email" | "date" | "datetime" | "time" | "number" | "custom";

export interface TableColumn {
    name: string;
    label: string;
    email?: string;
    format?: (value: any, row: any, rowIndex: any) => JSX.Element
    type?: TableColumnType;
}
