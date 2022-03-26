import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston/dist/winston.utilities';

export default [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.ms(),
      nestWinstonModuleUtilities.format.nestLike('capitole-automated-login', {
        prettyPrint: true,
      }),
    ),
  }),
  new winston.transports.File({
    filename: 'logs/app.log',
  }),
];
