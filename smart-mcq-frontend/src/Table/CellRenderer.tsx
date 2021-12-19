import { TableColumn } from "./types";

interface CellRendererProps {
    value?: any;
    row: any;
    rowIndex: number;
    column: TableColumn;
}

export default function CellRenderer({
    value,
    column,
    row,
    rowIndex,
}: CellRendererProps) {
    switch (column.type || "text") {
        case "text":
            return <>{value}</>;

        case "email":
            return <>{value}</>;

        case "number":
            return <span className="number-cell">{value}</span>;

        case "date":
            return <>{(value as Date)?.toLocaleDateString()}</>;

        case "time":
            return <>{(value as Date)?.toLocaleTimeString()}</>;

        case "datetime":
            return (
                <>
                    {(value as Date)?.toLocaleDateString()}{" "}
                    {(value as Date)?.toLocaleTimeString()}
                </>
            );

        case "custom":
            return column.format ? (
                column.format(value, row, rowIndex)
            ) : (
                <>{value}</>
            );

        default:
            return <>{value?.toString()}</>;
    }
}
