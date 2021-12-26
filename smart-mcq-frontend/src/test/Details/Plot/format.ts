import { ResultDto, TopicDto, UserDto } from "../../../dto";

export type TestData = {
    user: UserDto;
    index: number;
    marks: number;
    totalMarks: number;
};

export type TestMarksSummary = {
    topic: TopicDto;
    data: TestData[];
};

export function aggregateData(
    results: ResultDto[]
): TestData[] {
    const examineeMap = new Map<number, TestData>();
    for (let index = 0; index < results.length; index++) {
        const result = results[index];
        if (!examineeMap.has(result.userTestId))
            examineeMap.set(result.userTestId, {
                ...result.userTest!,
                index
            });
    }

    return Array.from(examineeMap.values());
}

export function format(
    results: ResultDto[]
): TestMarksSummary[] {
    const topicMap = getTopicsAsMap(results);
    for (let index = 0; index < results.length; index++) {
        const result = results[index];
        const topic = result.topic?.topic!;
        const summary = topicMap.get(topic.id)!;
        summary.data.push({
            user: result.userTest?.user!,
            marks: result.marks,
            index,
            totalMarks: result.totalMarks
        });
    }
    return Array.from(topicMap.values());
}

function getTopicsAsMap(results: ResultDto[]) {
    const map = new Map<number, TestMarksSummary>();
    for (const result of results) {
        const topic = result.topic?.topic!;
        if (!map.has(topic.id))
            map.set(topic.id, {
                topic: topic,
                data: [],
            });
    }
    return map;
}
