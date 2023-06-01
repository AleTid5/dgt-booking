import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';
import CheckBookingService from '../services/check-booking.service';

@Injectable()
export default class BookingSchedule {
  constructor(private readonly checkBookingService: CheckBookingService) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  everyFiveMinutes() {
    this.checkBookingService.fetch();
  }

  @Timeout(0)
  everyTenMinutes2() {
    this.checkBookingService.fetch();
  }
}
