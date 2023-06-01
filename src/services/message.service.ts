import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const TelegramBot = require('node-telegram-bot-api');

@Injectable()
export default class MessageService {
  private readonly bot: typeof TelegramBot;

  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {
    this.bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });
  }

  async sendMessage(cityName: string): Promise<void> {
    this.logger.log('Calling message service');
    return this.bot.sendMessage(
      process.env.TELEGRAM_GROUP_CHAT_ID,
      `Found something at ${cityName}`,
    );
  }
}
