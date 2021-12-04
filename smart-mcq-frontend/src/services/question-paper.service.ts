import { CreateQuestionPaperDto, QuestionPaperDto, UpdateQuestionPaperDto} from '../dto/question';
import Fetch from './fetch';

export default class QuestionPaperService {

    static async create(dto: CreateQuestionPaperDto) {
        return await Fetch.postJSON<void>(`/api/question-paper`, {
            body: dto
        });
    }

    static async update(id: number, dto: UpdateQuestionPaperDto) {
        return await Fetch.putJSON<void>(
            `/api/question-paper/${id}`,
            { body: dto }
        );
    }

    static async save(idAsString: string, dto: CreateQuestionPaperDto) {
        const id = Number.parseInt(idAsString);
        return Number.isNaN(id) ? await this.create(dto) : await this.update(id, dto);
    }

    static async delete(id: number) {
        return await Fetch.deleteJSON<void>(
            `/api/question-paper/${id}`,
        );
    }

    static async getById(id: number) {
        return await Fetch.getJSON<QuestionPaperDto>(
            `/api/question-paper/${id}`
        );
    }

    static async getAll() {
        return await Fetch.getJSON<QuestionPaperDto[]>(
            `/api/question-paper`
        );
    }

}
