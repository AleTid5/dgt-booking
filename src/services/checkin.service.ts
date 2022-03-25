import { Injectable } from '@nestjs/common';
import CheckinAction from '../actions/checkin.action';
import CapitoleSelectorsEnum from '../enums/capitole-selectors.enum';

@Injectable()
export default class CheckinService extends CheckinAction {
  async checkin(): Promise<void> {
    try {
      console.log('Starting checkin...');
      await this.start(async () => {
        console.log('Waiting for DOM to be loaded...');
        await this.page.waitForNavigation({ waitUntil: 'networkidle0' });
        await this.clickSelector(CapitoleSelectorsEnum.CHECKIN_BUTTON);
        console.log('Successful checkin!');
      });
    } catch (e) {
      console.error(e);
    }
  }

  async checkout(): Promise<void> {
    try {
      console.log('Starting checkout...');
      await this.start(async () => {
        console.log('Waiting for DOM to be loaded...');
        await this.page.waitForNavigation({ waitUntil: 'networkidle0' });
        await this.clickSelector(CapitoleSelectorsEnum.CHECKOUT_BUTTON);
        console.log('Successful checkout!');
      });
    } catch (e) {
      console.error(e);
    }
  }

  private async start(callback: CallableFunction): Promise<void> {
    await this.createBrowser();

    console.log('Setting user...');
    await this.fillInput(
      CapitoleSelectorsEnum.USERNAME_INPUT,
      process.env.CAPITOLE_EMAIL,
    );

    console.log('Setting password...');
    await this.fillInput(
      CapitoleSelectorsEnum.PASSWORD_INPUT,
      process.env.CAPITOLE_PASSWORD,
    );

    console.log('Logging in...');
    await this.login();
    console.log('Login successful!');

    await callback();

    await this.destroyBrowser();
    console.log('Browser destroyed successfully!');
  }
}
