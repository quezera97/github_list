import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { MailsService } from './mails.service';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
@Processor('mail-register')
export class MailProcessor {
    private readonly logger = new Logger(MailProcessor.name);

    constructor(private readonly mailsService: MailsService) {}

    @Process('sendMail')
    async handleSendMail(job: Job) {
        const createMailDto = job.data;
        
        try {
            await this.mailsService.sendMail(createMailDto);
            this.logger.log('Email sent successfully');
        } catch (error) {
            this.logger.log(error.message);
        }
    }
}
