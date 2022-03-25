import { CronExpression } from '@nestjs/schedule';

enum CustomCronExpression {
  MONDAY_TO_THURSDAY_AT_1PM = '0 0 13 * * 1-4',
  MONDAY_TO_THURSDAY_AT_2PM = '0 0 14 * * 1-4',
  MONDAY_TO_THURSDAY_AT_6PM = '0 0 18 * * 1-4',
  FRIDAY_AT_3PM = '0 0 15 * * 5',
}

export default { ...CronExpression, ...CustomCronExpression };
