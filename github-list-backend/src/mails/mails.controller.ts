import { Queue } from 'bull';
import { Controller, Post, Body, Res, HttpStatus, Logger } from '@nestjs/common';
import { MailsService } from './mails.service';
import { CreateMailDto } from './dto/create-mail.dto';
import { InjectQueue } from '@nestjs/bull';

@Controller('mails')
export class MailsController {
  private readonly logger = new Logger(MailsController.name);

  constructor(
    @InjectQueue('mail-register') private readonly mailRegisterQueue: Queue,
    private readonly mailsService: MailsService
  ) {}

  @Post('send')
  async sendMailer(@Body() createMailDto: CreateMailDto, @Res() response: any) {
    
    try {
      // await this.mailsService.sendMail(createMailDto);
      await this.mailRegisterQueue.add('sendMail', createMailDto, {
        delay: 10000, //delay for 10 seconds
        lifo: true, //last in first out
        priority: 2 //to prioritize the job
      });

      this.logger.log('Email added to queue');
    } catch (error) {
      this.logger.log(error.message);
    }
  }
}
