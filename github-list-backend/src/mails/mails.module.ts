import { Module } from '@nestjs/common';
import { MailsService } from './mails.service';
import { MailsController } from './mails.controller';
import { BullModule } from '@nestjs/bull';
import { MailProcessor } from './mails.processor';

@Module({
  imports: [
    BullModule.registerQueueAsync(
      {
        name: 'mail-register',
      },
    ),
  ],
  controllers: [MailsController],
  providers: [MailsService, MailProcessor],
})
export class MailsModule {}
