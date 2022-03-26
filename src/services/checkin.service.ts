import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import CheckinAction from '../actions/checkin.action';
import CapitoleSelectorsEnum from '../enums/capitole-selectors.enum';

@Injectable()
export default class CheckinService extends CheckinAction {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {
    super();
  }

  async checkin(): Promise<void> {
    try {
      this.logger.log('Starting checkin...');
      await this.start(async () => {
        this.logger.log('Waiting for DOM to be loaded...');
        await this.page.waitForNavigation({ waitUntil: 'networkidle0' });
        await this.clickSelector(CapitoleSelectorsEnum.CHECKIN_BUTTON);
        this.logger.log('Successful checkin!');
      });
    } catch (e) {
      this.logger.error(e);
    }
  }

  async checkout(): Promise<void> {
    try {
      this.logger.log('Starting checkout...');
      await this.start(async () => {
        this.logger.log('Waiting for DOM to be loaded...');
        await this.page.waitForNavigation({ waitUntil: 'networkidle0' });
        await this.clickSelector(CapitoleSelectorsEnum.CHECKOUT_BUTTON);
        this.logger.log('Successful checkout!');
      });
    } catch (e) {
      this.logger.error(e);
    }
  }

  private async start(callback: CallableFunction): Promise<void> {
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

    await callback();

    await this.destroyBrowser();
    this.logger.log('Browser destroyed successfully!');
  }
}
