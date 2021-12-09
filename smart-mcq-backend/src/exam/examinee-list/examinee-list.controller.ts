import {
    Controller,
    NotFoundException,
    Post,
    Get,
    Body,
    Put,
    Delete,
    Param,
    ParseIntPipe,
} from '@nestjs/common';
import { User } from 'src/user/user.decorator';
import { UserPrincipal } from 'src/user/user.principal';
import { CreateExamineeListDto } from './create-examinee-list.dto';
import { ExamineeListService } from './examinee-list.service';

@Controller('examinee-list')
export class ExamineeListController {
    constructor(private examineeListService: ExamineeListService) { }

    @Get(':id')
    async getById(@Param('id', ParseIntPipe) id: number, @User() user: UserPrincipal) {
        const examineeList = await this.examineeListService.getById(user.id, id);
        if (!examineeList) throw new NotFoundException();
        return examineeList;
    }

    @Get()
    async getByUser(@User() user: UserPrincipal) {
        return await this.examineeListService.getManyByUser(user.id);
    }

    @Get(':id')
    async getUserIds(@Param('emails', ParseIntPipe) emails: string[]) {
        return await this.examineeListService.getUserIdsFromEmails(emails);
    }

    @Post()
    async create(@Body() dto: CreateExamineeListDto, @User() user: UserPrincipal) {
        return await this.examineeListService.create(user.id, dto);
    }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: CreateExamineeListDto,
        @User() user: UserPrincipal
    ) {
        await this.examineeListService.update(user.id, id, dto);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number, @User() user: UserPrincipal) {
        await this.examineeListService.delete(user.id, id);
    }
}

