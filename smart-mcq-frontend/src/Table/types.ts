
export type TableColumnType = "text" | "date" | "datetime" | "time" | "number";

export interface TableColumn {
    name: string;
    label: string;
    type?: TableColumnType;
}
