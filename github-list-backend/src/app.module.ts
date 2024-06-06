import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserEntity } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { GithubRepoEntity } from './github-repos/entities/github-repo.entity';
import { GithubReposModule } from './github-repos/github-repos.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { MailsModule } from './mails/mails.module';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';
import { TaskService } from './task/task.service';
import { CacheModule } from '@nestjs/cache-manager';
import { LoggingInterceptor } from './interceptors/logging.interceptor';


const appEntities = [
  UserEntity, GithubRepoEntity
];

const appModules = [
  UsersModule, 
  AuthModule, 
  GithubReposModule, 
  MailsModule
];

const appServices = [
  AppService,
  LoggingInterceptor,
  TaskService,
]

@Module({
  imports: [
    ConfigModule.forRoot({ 
      envFilePath: '.env', 
      isGlobal: true 
    }),
    CacheModule.register({
      ttl: 5, // seconds
      max: 100, // maximum number of items in cache
    }),
    BullModule.forRootAsync({
      useFactory: () => ({
        redis: {
          host: 'localhost',
          port: 6379,
        },
      }),
    }),
    // BullModule.forRoot({
    //   redis: {
    //     host: 'localhost',
    //     port: 6379,
    //   },
    // }),
    ScheduleModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: parseInt(process.env.MAIL_PORT, 10),
        // secure: process.env.MAIL_ENCRYPTION === 'tls',
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
        },
        // tls: process.env.MAIL_ENCRYPTION === 'tls' ? { ciphers: 'SSLv3' } : undefined,
      },
      defaults: {
        from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`,
      },
    }),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'github_list',
      entities: appEntities,
      // Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
      synchronize: true,
    }), 
    ...appModules
  ],
  controllers: [AppController],
  providers: appServices,
})

export class AppModule {}
