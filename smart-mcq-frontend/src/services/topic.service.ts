import { CreateTopicDto, TopicDto } from '../dto/question';
import Fetch from './fetch';

export default class TopicService {

    static async create(dto: CreateTopicDto) {
        return await Fetch.postJSON<void>(`/api/topic`, {
            body: dto
        });
    }

    static async update(id: number, dto: CreateTopicDto) {
        return await Fetch.putJSON<void>(
            `/api/topic/${id}`,
            { body: dto }
        );
    }

    static async save(idAsString: string, dto: CreateTopicDto) {
        const id = Number.parseInt(idAsString);
        return Number.isNaN(id) ? await this.create(dto) : await this.update(id, dto);
    }

    static async delete(id: number) {
        return await Fetch.deleteJSON<void>(
            `/api/topic/${id}`,
        );
    }

    static async getById(id: number) {
        return await Fetch.getJSON<TopicDto>(
            `/api/topic/${id}`
        );
    }

    static async getManyBySubject(subjectid: number) {
        return await Fetch.getJSON<TopicDto>(
            `/api/topic/${subjectid}`
        );
    }

    static async getAll() {
        return await Fetch.getJSON<TopicDto[]>(
            `/api/topic`
        );
    }

}
