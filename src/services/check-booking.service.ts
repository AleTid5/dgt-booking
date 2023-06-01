import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { url, headers, getData, knownErrorMessage } from '../constants';

@Injectable()
export default class CheckBookingService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private httpService: HttpService,
  ) {}

  async fetch(): Promise<void> {
    try {
      const response = await this.httpService.axiosRef.post(url, getData(), {
        headers,
      });

      const responseHasError = response.data.includes(knownErrorMessage);

      if (responseHasError) {
        return this.logger.log('Error message found on the DGT website');
      }

      this.logger.error('Calling message service');
    } catch (e) {
      this.logger.error('There was an error calling DGT service', e);
    }
  }
}
