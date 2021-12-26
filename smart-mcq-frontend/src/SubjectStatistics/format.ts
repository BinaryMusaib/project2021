import { ResultDto, TopicDto } from "../dto";

export type TopicData = {
    date: Date;
    marks: number;
    totalMarks: number;
};

export type TopicMarksSummary = {
    topic: TopicDto;
    data: TopicData[];
};

export function format(
    results: ResultDto[],
): TopicMarksSummary[] {
    const topicMap = getTopicsAsMap(results);
    for (const result of results) {
        const topic = result.topic?.topic!;
        const summary = topicMap.get(topic.id)!;
        summary.data.push({
            date: result.updatedAt,
            marks: result.marks,
            totalMarks: result.totalMarks
        });
    }

    return Array.from(topicMap.values());
}

export function aggregateData(
    results: ResultDto[]
): TopicData[] {
    const map = new Map<number, TopicData>();
    for (const result of results) {
        if (result.updatedAt && !map.has(result.userTestId))
            map.set(result.userTestId, {
                ...result.userTest!,
                date: result.updatedAt
            });
    }
    return Array.from(map.values());
}

function getTopicsAsMap(results: ResultDto[]) {
    const map = new Map<number, TopicMarksSummary>();
    for (const result of results) {
        const topic = result.topic?.topic!;
        if (!map.has(topic.id))
            map.set(topic.id, {
                topic: topic,
                data: Array<TopicData>(),
            });
    }
    return map;
}
