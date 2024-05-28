import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailsService {
  constructor(
    private readonly mailService: MailerService,
  ) {}

  async sendMail(createMailDto: CreateMailDto) {
    const { receiver, subject, message } = createMailDto;

    try {
      await this.mailService.sendMail({
        to: receiver,
        subject: subject,
        text: message,
      });
    } catch (error) {
      throw new HttpException('Failed to send email', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
