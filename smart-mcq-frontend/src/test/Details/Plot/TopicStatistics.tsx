import { Card, CardContent, CardHeader } from "@mui/material";
import { TestData } from "./format";
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

type TopicStatisticsProps = {
    data: TestData[];
    title: string;
};

export default function TopicStatistics({ title, data }: TopicStatisticsProps) {
    return (
        <Card>
            <CardHeader title={title} />
            <CardContent>
                <ScatterChart
                    width={400}
                    height={300}
                    margin={{
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20,
                    }}
                >
                    <CartesianGrid />
                    <XAxis type="number" dataKey="index" name="Examinees" />
                    <YAxis type="number" dataKey="marks" name="Marks" />
                    <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                    <Scatter name="Marks" data={data} fill="#8884d8" />
                </ScatterChart>
            </CardContent>
        </Card>
    );
}
