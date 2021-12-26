import {
    ResultDto,
    SubjectStatisticsFilterDto,
} from "../dto/question";
import Fetch from "./fetch";

export default class ResultService {

    static async getUserSubjectStatistics(dto: SubjectStatisticsFilterDto) {
        return Fetch.postJSON<ResultDto[]>(
            "/api/user-test/subject/statistics",
            {
                body: dto,
            },
        );
    }

    static async getMentorSubjectStatistics(dto: SubjectStatisticsFilterDto) {
        return Fetch.postJSON<ResultDto[]>(
            "/api/user-test/subject/statistics/mentor",
            {
                body: dto,
            },
        );
    }

}
