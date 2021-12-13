import { UserTestDto, UserTestFilterDto } from '../dto/question';
import Fetch from './fetch';
import { startOfDay, endOfDay } from 'date-fns';

export default class UserTestService {

    static async query(filter: UserTestFilterDto) {
        return await Fetch.postJSON<UserTestDto[]>(
            `/api/user-test/query`,
            {
                body: {
                    startDate: startOfDay(filter.startDate),
                    endDate: endOfDay(filter.endDate)
                }
            }
        );
    }
}
