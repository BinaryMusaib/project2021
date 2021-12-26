import Fetch from "./fetch";
import { UpdateUserDto, UserDto } from "../dto";

export default class UserService {

    static async query(query: string) {
        return await Fetch.getJSON<UserDto[]>(
            `/api/user/query/list?query=${encodeURIComponent(query)}`
        );
    }

    static async getAll() {
        return await Fetch.getJSON<UserDto[]>('/api/user');
    }

    static async getById(id: number) {
        return await Fetch.getJSON<UserDto>(`/api/user/${id}`);
    }

    static async update(id: number, dto: UpdateUserDto) {
        await Fetch.putJSON<void>(`/api/user/${id}`, {
            body: dto
        });
    }
}

