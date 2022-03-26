import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { WinstonModule } from 'nest-winston';
import CheckinService from '../services/checkin.service';
import CheckinSchedule from '../schedules/checkin.schedule';
import winstonTransporter from '../transporters/winston.transporter';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    WinstonModule.forRoot({
      transports: winstonTransporter,
    }),
  ],
  providers: [CheckinService, CheckinSchedule],
})
export default class AppModule {}
