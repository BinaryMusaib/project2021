import {
    PeriodType,
    ResultDto,
    SubjectDto,
    SubjectStatisticsFilterDto,
} from "../../dto/question";
import React from "react";
import UserTestService from "../../services/user-test.service";
import { useParams } from "react-router-dom";
import SubjectService from "../../services/subject.service";
import { FetchContext } from "../../context";
import LoadingPage from "../../components/LoadingPage";
import Layout from "../../components/Layout";
import Header from "./Header";
import { Paper, Box } from "@mui/material";
import { format, TopicMarksSummary, periodFunctions } from "./format";
import Plot from "./Plot";
import "./index.css";

export default function SubjectStatistics() {
    const [, setResults] = React.useState<ResultDto[]>([]);
    const [data, setData] = React.useState<TopicMarksSummary[]>([]);
    const [subject, setSubject] = React.useState<SubjectDto>();
    const [period, setPeriod] = React.useState<PeriodType | undefined>("Daily");
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
                UserTestService.getSubjectStatistics(filter).then(
                    (resultsRes) => {
                        const results = resultsRes.body!;
                        setResults(results);
                        setData(
                            format<Date>(
                                results,
                                periodFunctions(period).grouper,
                            ),
                        );
                        setPeriod(period);
                    },
                ),
            );
        },
        [whileLoading],
    );

    if (!subject) return <LoadingPage />;

    return (
        <Layout title={`${subject.title} statistics`}>
            <Box className="statistics-page-layout">
                <Paper className="paper">
                    <Header subjectId={subject.id} onFilter={handleFilter} />
                </Paper>

                {data.map((datum, index) => (
                    <Plot
                        key={index}
                        marksSummary={datum}
                        grouperFormatter={periodFunctions(period).formatter}
                    />
                ))}
            </Box>
        </Layout>
    );
}
