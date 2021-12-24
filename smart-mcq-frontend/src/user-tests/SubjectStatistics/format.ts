import { startOfDay, startOfMonth, format as formatDate } from "date-fns";
import { PeriodType, ResultDto, TopicDto } from "../../dto";

export type TopicData<T> = {
    grouper: T;
    marks: number;
    totalMarks: number;
};

type TopicSummary<T> = {
    topic: TopicDto;
    data: Map<T, TopicData<T>>;
};

type TopicGrouper<T> = (result: ResultDto) => T;

export type TopicMarksSummary<T = Date> = {
    topic: TopicDto;
    data: TopicData<T>[];
};

export function format<T = Date>(
    results: ResultDto[],
    groupBy: TopicGrouper<T>,
): TopicMarksSummary<T>[] {
    const topicMap = getTopicsAsMap<T>(results);
    for (const result of results) {
        const topic = result.topic?.topic!;
        const grouper = groupBy(result);
        const summary = topicMap.get(topic.id)!;
        const data = summary.data.get(grouper) || {
            grouper,
            marks: 0,
            totalMarks: 0,
        };

        data.marks += result.marks;
        data.totalMarks += result.totalMarks;
        summary.data.set(grouper, data);
    }

    return Array.from(topicMap.values()).map((summary) => ({
        topic: summary.topic,
        data: Array.from(summary.data.values()),
    }));
}

function getTopicsAsMap<T>(results: ResultDto[]) {
    const map = new Map<number, TopicSummary<T>>();
    for (const result of results) {
        const topic = result.topic?.topic!;
        if (!map.has(topic.id))
            map.set(topic.id, {
                topic: topic,
                data: new Map<T, TopicData<T>>(),
            });
    }
    return map;
}

export function monthly(result: ResultDto) {
    return startOfMonth(startOfDay(result.updatedAt.valueOf()));
}

export function monthlyFormatter(value: Date) {
    return formatDate(value, "MMMM");
}

export function daily(result: ResultDto) {
    return startOfDay(result.updatedAt.valueOf());
}

export function dailyFormatter(value: Date) {
    return value?.toLocaleDateString();
}

export function periodFunctions(periodType?: PeriodType) {
    switch (periodType) {
        case "Monthly":
            return {
                grouper: monthly,
                formatter: monthlyFormatter
            };

        default:
            return {
                grouper: daily,
                formatter: dailyFormatter
            };
    }
}
