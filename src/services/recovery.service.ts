import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export default class RecoveryService {
  private readonly MAX_RETRIES = 3;

  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  async executeWithRetry(
    callback: CallableFunction,
    attemptNumber = 1,
  ): Promise<void> {
    try {
      await callback();
    } catch (e) {
      if (attemptNumber === this.MAX_RETRIES) {
        return this.logger.error(
          `After trying ${attemptNumber} times, the request couldn't be processed.`,
        );
      }

      this.logger.error(e);
      this.logger.warn(`Starting attempt #${attemptNumber + 1}...`);
      await this.executeWithRetry(callback, attemptNumber + 1);
    }
  }
}
