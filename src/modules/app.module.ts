import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import CheckinService from '../services/checkin.service';
import CheckinSchedule from '../schedules/checkin.schedule';

@Module({
  imports: [ConfigModule.forRoot(), ScheduleModule.forRoot()],
  providers: [CheckinService, CheckinSchedule],
})
export default class AppModule {}
