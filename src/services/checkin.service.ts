import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import CheckinAction from '../actions/checkin.action';
import CapitoleSelectorsEnum from '../enums/capitole-selectors.enum';
import RecoveryService from './recovery.service';

@Injectable()
export default class CheckinService extends CheckinAction {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly recoveryService: RecoveryService,
  ) {
    super();
  }

  async checkin(): Promise<void> {
    await this.recoveryService.executeWithRetry(async () => {
      try {
        await this.start('checkin');

        await this.click(CapitoleSelectorsEnum.CHECKIN_BUTTON);
        this.logger.log('Successful checkin!');

        await this.destroyBrowser();
      } catch (e) {
        await this.takeScreenshot('error');
        throw e;
      }
    });
  }

  async checkout(): Promise<void> {
    await this.recoveryService.executeWithRetry(async () => {
      try {
        await this.start('checkout');

        await this.click(CapitoleSelectorsEnum.CHECKOUT_BUTTON);
        this.logger.log('Successful checkout!');

        await this.destroyBrowser();
      } catch (e) {
        await this.takeScreenshot('error');
        throw e;
      }
    });
  }

  private async start(type: string): Promise<void> {
    this.logger.log(`Starting ${type}...`);
    await this.createBrowser();

    this.logger.log('Setting user...');
    await this.fillInput(
      CapitoleSelectorsEnum.USERNAME_INPUT,
      process.env.CAPITOLE_EMAIL,
    );

    this.logger.log('Setting password...');
    await this.fillInput(
      CapitoleSelectorsEnum.PASSWORD_INPUT,
      process.env.CAPITOLE_PASSWORD,
    );

    this.logger.log('Logging in...');
    await this.login();
    this.logger.log('Login successful!');

    this.logger.log('Waiting for DOM to be loaded...');
    await this.page.waitForNavigation({ waitUntil: 'networkidle0' });
  }
}
