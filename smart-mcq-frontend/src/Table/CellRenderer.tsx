import { TableColumn } from "./types";

interface CellRendererProps {
    value?: any;
    column: TableColumn;
}

export default function CellRenderer({ value, column }: CellRendererProps) {
    switch (column.type || "text") {
        case "text":
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

        default:
            return <>{value?.toString()}</>;
    }
}
