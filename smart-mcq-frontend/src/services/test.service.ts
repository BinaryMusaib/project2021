import { CreateTestDto, PaperTopicDto, TestDto, UpdateTestDto, QuestionDto} from '../dto/question';
import Fetch from './fetch';

export default class TestService {

    static async create(dto: CreateTestDto) {
        return await Fetch.postJSON<void>(`/api/test`, {
            body: dto
        });
    }

    static async update(id: number, dto: UpdateTestDto) {
        return await Fetch.putJSON<void>(
            `/api/test/${id}`,
            { body: dto }
        );
    }

    static async save(idAsString: string, dto: CreateTestDto) {
        const id = Number.parseInt(idAsString);
        return Number.isNaN(id) ? await this.create(dto) : await this.update(id, dto);
    }

    static async delete(id: number) {
        return await Fetch.deleteJSON<void>(
            `/api/test/${id}`
        );
    }

    static async getById(id: number) {
        return await Fetch.getJSON<TestDto>(
            `/api/test/${id}`
        );
    }

    static async getByUserId(userid: number) {
        return await Fetch.getJSON<TestDto>(
            `/api/test/${userid}`
        );
    }

    static async getQuestionsFromPaper(questionid: number){
        return await Fetch.getJSON<QuestionDto>(
            `/api/test/${questionid}`
        );
    }

    static async randomQuestions(topicid: number){
        return await Fetch.getJSON<PaperTopicDto>(
            `/api/test/${topicid}`
        );
    }

    static async getAll() {
        return await Fetch.getJSON<TestDto[]>(
            `/api/test`
        );
    }
}
