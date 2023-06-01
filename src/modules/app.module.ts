import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { WinstonModule } from 'nest-winston';
import CheckBookingService from '../services/check-booking.service';
import BookingSchedule from '../schedules/booking.schedule';
import winstonTransporter from '../transporters/winston.transporter';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    WinstonModule.forRoot({
      transports: winstonTransporter,
    }),
  ],
  providers: [BookingSchedule, CheckBookingService],
})
export default class AppModule {}
