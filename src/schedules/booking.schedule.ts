import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import CheckBookingService from '../services/check-booking.service';
import { cities } from '../constants/city';

@Injectable()
export default class BookingSchedule {
  constructor(private readonly checkBookingService: CheckBookingService) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  everyFiveMinutes() {
    cities.forEach(([cityId, cityName]) =>
      this.checkBookingService.fetch(cityId, cityName),
    );
  }
}
