import { CreateSubjectDto, SubjectDto } from '../dto/question';
import Fetch from './fetch';

export default class SubjectService {

    static async create(dto: CreateSubjectDto) {
        return await Fetch.postJSON<void>(`/api/subject`, {
            body: dto
        });
    }

    static async update(id: number, dto: CreateSubjectDto) {
        return await Fetch.putJSON<void>(
            `/api/subject/${id}`,
            { body: dto }
        );
    }

    static async save(idAsString: string, dto: CreateSubjectDto) {
        const id = Number.parseInt(idAsString);
        return Number.isNaN(id) ? await this.create(dto) : await this.update(id, dto);
    }

    static async delete(id: number) {
        return await Fetch.deleteJSON<void>(
            `/api/subject/${id}`,
        );
    }

    static async getById(id: number) {
        return await Fetch.getJSON<SubjectDto>(
            `/api/subject/${id}`
        );
    }

    static async getAll() {
        return await Fetch.getJSON<SubjectDto[]>(
            `/api/subject`
        );
    }

}
