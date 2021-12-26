import { aggregateData, format, TestData, TestMarksSummary } from "./format";
import React from "react";
import TopicStatistics from "./TopicStatistics";
import { useParams } from "react-router-dom";
import TestService from "../../../services/test.service";
import { FetchContext } from "../../../context";
import { TestDto } from "../../../dto";
import LoadingPage from "../../../components/LoadingPage";
import Layout from "../../../components/Layout";
import Header from "./Header";
import { Box } from "@mui/material";
import "./index.css";

export default function TestStatisticsPlot() {
    const [data, setData] = React.useState<TestMarksSummary[]>([]);
    const [aggregate, setAggregate] = React.useState<TestData[]>([]);
    const [test, setTest] = React.useState<TestDto>();
    const { id } = useParams<{ id: string }>();

    const { whileLoading } = React.useContext(FetchContext);
    React.useEffect(() => {
        const testId = Number.parseInt(id);
        if (!Number.isNaN(testId)) {
            whileLoading(
                Promise.all([
                    TestService.getById(testId),
                    TestService.getTestStatistics(testId),
                ]).then(([testRes, statsRes]) => {
                    setTest(testRes.body!);
                    setData(format(statsRes.body!));
                    setAggregate(aggregateData(statsRes.body!));
                }),
            );
        }
    }, [whileLoading, id]);

    if (!test) return <LoadingPage />;

    return (
        <Layout title={test.title}>
            <Header test={test} />
            <Box className="topic-statistics-aggregate-card">
                <TopicStatistics data={aggregate} title={test.title} />
            </Box>
            <Box className="topic-statistics-container">
                {data.map((summary, index) => (
                    <Box key={index} className="topic-statistics-card">
                        <TopicStatistics
                            data={summary.data}
                            title={summary.topic.title}
                            key={index}
                        />
                    </Box>
                ))}
            </Box>
        </Layout>
    );
}
