import { TopicData, TopicMarksSummary } from "./format";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";
import { Card, CardContent, CardHeader } from "@mui/material";

type PlotProps = {
    marksSummary: TopicMarksSummary;
    grouperFormatter: (value: Date) => string;
};

export default function Plot({ marksSummary, grouperFormatter }: PlotProps) {
    return (
        <Card className="statistics-plot-card">
            <CardHeader
                title={marksSummary.topic.title}
                subHeader={marksSummary.topic.description}
            />
            <CardContent className="plot-content">
                <LineChart width={800} height={400} data={marksSummary.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="grouper" tickFormatter={grouperFormatter} />
                    <YAxis />
                    <Tooltip
                        labelFormatter={(date: Date) => grouperFormatter(date)}
                    />
                    <Legend />
                    <Line
                        dot={true}
                        name="Percentage Marks"
                        type="monotone"
                        dataKey={(e: TopicData<Date>) =>
                            Math.floor((e.marks * 100) / e.totalMarks ?? 1)
                        }
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </CardContent>
        </Card>
    );
}
