import { UserTestDto } from '../dto/question';
import Fetch from './fetch';

export default class ExamService {


    static async getMyTests(userid: number) {
        return await Fetch.getJSON<UserTestDto>(
            `/api/exam/${userid}`
        );
    }

    static async getMyTest(userid: number) {
        return await Fetch.getJSON<UserTestDto>(
            `/api/exam/${userid}`
        );
    }

    static async startTest(userid: number, dto: UserTestDto) {
        return await Fetch.putJSON<void>(
            `/api/exam/${userid}`,
            { body: dto }
        );
    }
    static async save(idAsString: string, dto: UserTestDto) {
        const id = Number.parseInt(idAsString);
        return Number.isNaN(id) ? await this.getMyTests(id) : await this.startTest(id, dto);
    }

    static async getAll() {
        return await Fetch.getJSON<UserTestDto[]>(
            `/api/exam`
        );
    }
}
