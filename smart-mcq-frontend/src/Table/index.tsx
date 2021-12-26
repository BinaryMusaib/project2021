import {
    TableContainer,
    Table as ReactTable,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from "@mui/material";
import { TableColumn } from "./types";
import CellRenderer from "./CellRenderer";
import "./index.css";
export * from "./types";

interface TableProps {
    columns: TableColumn[];
    data: any[];
}

export default function Table({ columns, data }: TableProps) {
    return (
        <TableContainer className="table-wrap">
            <ReactTable className="table" size="small">
                <TableHead>
                    <TableRow>
                        {columns.map((col, index) => (
                            <TableCell key={index}>{col.label}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {columns.map((col, colIndex) => (
                                <TableCell key={colIndex}>
                                    <CellRenderer
                                        value={row[col.name]}
                                        column={col}
                                        row={row}
                                        rowIndex={rowIndex}
                                    />
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </ReactTable>
        </TableContainer>
    );
}
