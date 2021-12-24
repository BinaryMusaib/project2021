import {
    ResultDto,
    SetAnswerDto,
    SubjectDto,
    SubjectStatisticsFilterDto,
    UserTestDetailsDto,
    UserTestDto,
    UserTestFilterDto,
} from "../dto/question";
import Fetch from "./fetch";
import { startOfDay, endOfDay } from "date-fns";

export default class UserTestService {
    static async query(filter: UserTestFilterDto) {
        return await Fetch.postJSON<UserTestDto[]>(`/api/user-test/query`, {
            body: {
                startDate: startOfDay(filter.startDate),
                endDate: endOfDay(filter.endDate),
            },
        });
    }

    static async submitTest(userTestId: number) {
        return await Fetch.putJSON<void>(
            `/api/user-test/submit/${userTestId}`,
            {},
        );
    }

    static async getInProgressTests() {
        return await Fetch.getJSON<UserTestDto[]>(
            `/api/user-test/list/in-progress`,
        );
    }

    static async getUpcomingTests() {
        return await Fetch.getJSON<UserTestDto[]>(
            `/api/user-test/list/upcoming`,
        );
    }

    static async getUserTestDetails(id: number) {
        return await Fetch.getJSON<UserTestDetailsDto>(
            `/api/user-test/details/${id}`,
        );
    }

    static async startTest(id: number) {
        return Fetch.postJSON<UserTestDto>(`/api/user-test/start/${id}`, {});
    }

    static async answer(userTestId: number, dto: SetAnswerDto) {
        return Fetch.putJSON<void>(`/api/user-test/answer/${userTestId}`, {
            body: dto,
        });
    }

    static async getSubjectStatistics(dto: SubjectStatisticsFilterDto) {
        return Fetch.postJSON<ResultDto[]>(
            "/api/user-test/subject/statistics",
            {
                body: dto,
            },
        );
    }

    static async getSubjectsUndertaken() {
        return Fetch.getJSON<SubjectDto[]>(
            '/api/user-test/subjects/under-taken'
        );
    }
}
