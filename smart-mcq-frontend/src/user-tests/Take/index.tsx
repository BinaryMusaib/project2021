import { useHistory, useParams } from "react-router-dom";
import { AnswerSheetDto, UserTestDto } from "../../dto/question";
import React from "react";
import UserTestService from "../../services/user-test.service";
import { FetchContext } from "../../context";
import UserTestStatusPage from "../UserTestStatusPage";
import Layout from "../../components/Layout";
import LoadingPage from "../../components/LoadingPage";
import QuestionPanel from "./QuestionPanel";
import Progress from "./Progress";
import "./index.css";
import SheetPanel from "./SheetPanel";
import ViewSelect from "./ViewSelect";
import { Button, Box } from "@mui/material";
import Timer from "./Timer";

export default function TakeTest() {
    const [userTest, setUserTest] = React.useState<UserTestDto>();
    const { testId, id = "0" } = useParams<{ testId: string; id?: string }>();
    const [sheet, setSheet] = React.useState<AnswerSheetDto>();
    const [showAll, setShowAll] = React.useState<boolean>(false);

    const { whileLoading } = React.useContext(FetchContext);
    React.useEffect(() => {
        whileLoading(
            UserTestService.startTest(Number.parseInt(testId)).then((res) => {
                const userTest = res.body!;
                userTest.sheets.sort((x, y) => x.id - y.id);
                setUserTest(userTest);
            }),
        );
    }, [whileLoading, testId]);

    const questionIndex = React.useMemo(() => Number.parseInt(id || "0"), [id]);

    React.useEffect(() => {
        if (userTest && questionIndex < userTest.sheets.length) {
            setSheet(userTest.sheets[questionIndex]);
        }
    }, [userTest, id, questionIndex]);

    const history = useHistory();
    if (userTest && (userTest.finished || !userTest?.sheets.length))
        return <UserTestStatusPage userTest={userTest} />;

    if (!userTest || !sheet) return <LoadingPage />;

    const saveAnswer = (answer: string) => {
        UserTestService.answer(Number.parseInt(testId), {
            answerSheetId: sheet.id,
            answer,
        });
    };

    const handleNext = () => {
        if (userTest) {
            const next = Math.min(
                userTest.sheets.length - 1,
                questionIndex + 1,
            );
            history.replace(`/user-test/take/${testId}/${next}`);
        }
    };

    const handlePrevious = () => {
        if (userTest) {
            const previous = Math.max(0, questionIndex - 1);
            history.replace(`/user-test/take/${testId}/${previous}`);
        }
    };

    const handleSelect = (index: number, answer: string) => {
        setUserTest((userTest) => {
            const { sheets, ...rest } = userTest!;
            sheets[index].answer = answer;
            return {
                ...rest,
                sheets: [...sheets],
            };
        });

        UserTestService.answer(Number.parseInt(testId), {
            answerSheetId: userTest.sheets[index].id,
            answer,
        });
    };

    const handleSubmit = () => {
        UserTestService.submitTest(Number.parseInt(testId)).then(() =>
            history.push("/user-tests"),
        );
    };

    return (
        <Layout title={userTest.test.title}>
            <Progress sheets={userTest.sheets} />
            <Box className="action-panel">
                <ViewSelect
                    showAll={showAll}
                    onToggle={() => setShowAll((show) => !show)}
                />
                <Timer userTest={userTest} />
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                >
                    Submit Test
                </Button>
            </Box>
            {showAll ? (
                <SheetPanel sheets={userTest.sheets} onSelect={handleSelect} />
            ) : (
                <QuestionPanel
                    sheet={sheet}
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                    onSelect={(answer) => handleSelect(questionIndex, answer)}
                    questionCount={userTest?.sheets.length || 0}
                    index={questionIndex}
                />
            )}
        </Layout>
    );
}
