import {
    ResultDto,
    SubjectDto,
    SubjectStatisticsFilterDto,
} from "../dto/question";
import React from "react";
import { useParams } from "react-router-dom";
import SubjectService from "../services/subject.service";
import { FetchContext } from "../context";
import LoadingPage from "../components/LoadingPage";
import Layout from "../components/Layout";
import Header from "./Header";
import { Paper, Box } from "@mui/material";
import { aggregateData, format, TopicData, TopicMarksSummary } from "./format";
import Plot from "./Plot";
import "./index.css";
import ResultService from "../services/result.service";

type SubjectStatisticsProps = {
    userId?: number;
    mentorView?: boolean;
};

export default function SubjectStatistics({
    userId,
    mentorView = false,
}: SubjectStatisticsProps) {
    const [, setResults] = React.useState<ResultDto[]>([]);
    const [data, setData] = React.useState<TopicMarksSummary[]>([]);
    const [aggregate, setAggregate] = React.useState<TopicData[]>([]);
    const [subject, setSubject] = React.useState<SubjectDto>();
    const { id } = useParams<{ id: string }>();

    const { whileLoading } = React.useContext(FetchContext);
    React.useEffect(() => {
        const subjectId = Number.parseInt(id);
        if (!Number.isNaN(subjectId)) {
            whileLoading(
                SubjectService.getById(subjectId).then((res) =>
                    setSubject(res.body),
                ),
            );
        }
    }, [id, whileLoading]);

    const handleFilter = React.useCallback(
        ({ period, ...filter }: SubjectStatisticsFilterDto) => {
            return whileLoading(
                (mentorView
                    ? ResultService.getMentorSubjectStatistics
                    : ResultService.getUserSubjectStatistics)({
                        ...filter,
                        userId,
                    }).then((resultsRes) => {
                        const results = resultsRes.body!;
                        setResults(results);
                        setData(format(results));
                        setAggregate(aggregateData(results));
                        console.log(aggregateData(results));
                    }),
            );
        },
        [whileLoading, userId],
    );

    if (id && !subject) return <LoadingPage />;

    return (
        <Layout title={`${subject?.title ?? ""} Statistics`}>
            <Box className="statistics-page-layout">
                <Paper className="paper">
                    <Header subjectId={subject?.id} onFilter={handleFilter} />
                </Paper>

                <Plot data={aggregate} title="Aggregate" />
                {data.map((datum, index) => (
                    <Plot
                        key={index}
                        data={datum.data}
                        title={datum.topic.title}
                    />
                ))}
            </Box>
        </Layout>
    );
}
