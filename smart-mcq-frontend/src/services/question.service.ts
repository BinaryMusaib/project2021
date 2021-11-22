import { CreateQuestionDto, QuestionDto } from '../dto/question';
import Fetch from './fetch';

export default class QuestionService {

    static async create(dto: CreateQuestionDto) {
        return await Fetch.postJSON<void>(`/api/question`, {
            body: dto
        });
    }

    static async update(id: number, dto: CreateQuestionDto) {
        return await Fetch.putJSON<void>(
            `/api/question/${id}`,
            { body: dto }
        );
    }

    static async save(idAsString: string, dto: CreateQuestionDto) {
        const id = Number.parseInt(idAsString);
        return Number.isNaN(id) ? await this.create(dto) : await this.update(id, dto);
    }

    static async delete(id: number) {
        return await Fetch.deleteJSON<void>(
            `/api/question/${id}`,
        );
    }

    static async getById(id: number) {
        return await Fetch.getJSON<QuestionDto>(
            `/api/question/${id}`
        );
    }

    static async getManyByTopic(topicid: number) {
        return await Fetch.getJSON<QuestionDto>(
            `/api/question/${topicid}`
        );
    }

    static async getAll() {
        return await Fetch.getJSON<QuestionDto[]>(
            `/api/question`
        );
    }

}
