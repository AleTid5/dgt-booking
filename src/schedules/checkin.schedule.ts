import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import CheckinService from '../services/checkin.service';
import CustomCronExpressionsEnum from '../enums/custom-cron-expressions.enum';

@Injectable()
export default class CheckinSchedule {
  constructor(private readonly checkinService: CheckinService) {}

  @Cron(CustomCronExpressionsEnum.MONDAY_TO_FRIDAY_AT_8AM)
  mondayToFridayAt8AM() {
    this.checkinService.checkin();
  }

  @Cron(CustomCronExpressionsEnum.MONDAY_TO_THURSDAY_AT_1PM)
  mondayToThursdayAt1PM() {
    this.checkinService.checkout();
  }

  @Cron(CustomCronExpressionsEnum.MONDAY_TO_THURSDAY_AT_2PM)
  mondayToThursdayAt2PM() {
    this.checkinService.checkin();
  }

  @Cron(CustomCronExpressionsEnum.MONDAY_TO_THURSDAY_AT_6PM)
  mondayToThursdayAt6PM() {
    this.checkinService.checkout();
  }

  @Cron(CustomCronExpressionsEnum.FRIDAY_AT_3PM)
  fridayAt3PM() {
    this.checkinService.checkout();
  }
}
