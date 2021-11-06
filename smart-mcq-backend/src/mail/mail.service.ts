import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/create-user.dto';

@Injectable()
export class MailService {

    constructor(private mailerService: MailerService) { }

    async sendUserConfirmation(dto: CreateUserDto, uri: string) {
        await this.mailerService.sendMail({
            to: dto.email,
            subject: 'Smart MCQs: Welcome to Smart MCQs',
            template: './user-confirmation',
            context: {
                ...dto,
                uri
            }
        });
    }

}

