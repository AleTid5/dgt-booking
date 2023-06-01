import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { url, headers, getData, knownErrorMessage } from '../constants';
import MessageService from './message.service';

@Injectable()
export default class CheckBookingService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private httpService: HttpService,
    private messageService: MessageService,
  ) {}

  async fetch(cityId: number, cityName: string): Promise<void> {
    try {
      const response = await this.httpService.axiosRef.post(
        url,
        getData(cityId),
        {
          headers,
        },
      );

      const responseHasError = response.data.includes(knownErrorMessage);

      if (responseHasError) {
        return this.logger.error('Error message found on the DGT website');
      }

      await this.messageService.sendMessage(cityName);
    } catch (e) {
      this.logger.error('There was an error calling DGT service', e);
    }
  }
}
