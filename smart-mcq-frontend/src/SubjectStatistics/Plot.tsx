import { TopicData } from "./format";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";
import { Card, CardContent, CardHeader } from "@mui/material";
import { format as formatDate } from "date-fns";

type PlotProps = {
    data: TopicData[];
    title?: string;
};

export default function Plot({ data, title }: PlotProps) {
    return (
        <Card className="statistics-plot-card">
            <CardHeader title={title ?? ""} />
            <CardContent className="plot-content">
                <BarChart width={500} height={400} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={dateFormatter} />
                    <YAxis />
                    <Tooltip
                        labelFormatter={(date: Date) => dateFormatter(date)}
                    />
                    <Legend align="right" verticalAlign="top" />
                    <Bar
                        dataKey="marks"
                        stackId="a"
                        fill="#8884d8"
                        name="Marks"
                    />
                    <Bar
                        dataKey="totalMarks"
                        stackId="a"
                        fill="#82ca9d"
                        name="Max Marks"
                    />
                </BarChart>
                <BarChart width={500} height={300} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={dateFormatter} />
                    <YAxis />
                    <Tooltip
                        labelFormatter={(date: Date) => dateFormatter(date)}
                    />
                    <Legend align="right" verticalAlign="top" />
                    <Bar
                        name="Percentage"
                        stackId="b"
                        dataKey={(e: TopicData) =>
                            Math.floor((e.marks * 100) / (e.totalMarks || 1))
                        }
                        fill="#82ca9d"
                    />
                </BarChart>
            </CardContent>
        </Card>
    );
}

function dateFormatter(date: Date) {
    return date instanceof Date ? formatDate(date, "dd/MM/yyyy") : date;
}
