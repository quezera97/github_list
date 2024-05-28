import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class TaskService {
    private readonly logger = new Logger(TaskService.name);

    constructor(
        private schedulerRegistry: SchedulerRegistry,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}

    @Cron('0 * * * * *')
    async openForBusiness() {
        const status = 'OPEN FOR BUSINESS';
        await this.cacheManager.set('businessStatus', status);
        const value = await this.cacheManager.get('businessStatus');
        this.logger.log(value);

        this.logger.log('Delicious cakes is open for business');

        const takingOrdersJob = this.schedulerRegistry.getCronJob('takingOrders');
        takingOrdersJob.start();
    }

    @Cron(CronExpression.EVERY_5_SECONDS, { name: 'takingOrders' })
    async takingOrders() {
        const status = 'TAKING ORDERS';
        await this.cacheManager.set('businessStatus', status);
        const value = await this.cacheManager.get('businessStatus');
        this.logger.log(value);

        this.logger.log('Delicious cakes is still taking orders');
    }

    @Cron('40,45 * * * * *')
    async closingSoon() {
        const status = 'CLOSING SOON';
        await this.cacheManager.set('businessStatus', status);
        const value = await this.cacheManager.get('businessStatus');
        this.logger.log(value);

        this.logger.log('Delicious cakes will be closing soon');
    }

    @Cron('50 * * * * *')
    async closed() {
        const takingOrdersJob = this.schedulerRegistry.getCronJob('takingOrders');
        takingOrdersJob.stop();

        const status = 'CLOSED FOR THE DAY';
        await this.cacheManager.set('businessStatus', status);
        const value = await this.cacheManager.get('businessStatus');
        this.logger.log(value);

        this.logger.log('Delicious cakes is closed for the day');
    }
}
