import { CreateExamineeListDto, ExamineeListDto } from '../dto/question';
import Fetch from './fetch';

export default class ExamineeListService {

    static async create(dto: CreateExamineeListDto) {
        return await Fetch.postJSON<void>(`/api/examinee-list`, {
            body: dto
        });
    }

    static async update(id: number, dto: CreateExamineeListDto) {
        return await Fetch.putJSON<void>(
            `/api/examinee-list/${id}`,
            { body: dto }
        );
    }

    static async save(idAsString: string, dto: CreateExamineeListDto) {
        const id = Number.parseInt(idAsString);
        return Number.isNaN(id) ? await this.create(dto) : await this.update(id, dto);
    }

    static async delete(id: number) {
        return await Fetch.deleteJSON<void>(
            `/api/examinee-list/${id}`,
        );
    }

    static async getById(id: number) {
        return await Fetch.getJSON<ExamineeListDto>(
            `/api/examinee-list/${id}`
        );
    }

    static async getManyByUser(userid: number) {
        return await Fetch.getJSON<ExamineeListDto>(
            `/api/examinee-list/${userid}`
        );
    }
    
    static async getUserIdsFromEmails(email: string[]) {
        return await Fetch.getJSON<CreateExamineeListDto>(
            `/api/examinee-list/${email}`
        );
    }

    static async getAll() {
        return await Fetch.getJSON<ExamineeListDto[]>(
            `/api/examinee-list`
        );
    }


}
