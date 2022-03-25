import { Browser, HTTPResponse, Page } from 'puppeteer';
import CapitoleSelectorsEnum from '../enums/capitole-selectors.enum';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const puppeteer = require('puppeteer');

export default class CheckinAction {
  protected browser: Browser;
  protected page: Page;
  protected navigationPromise: Promise<HTTPResponse | null>;

  protected async createBrowser(): Promise<void> {
    this.browser = await puppeteer.launch();
    this.page = await this.browser.newPage();
    this.navigationPromise = this.page.waitForNavigation();
    await this.page.goto(
      'https://capitole-ep-prd.azurewebsites.net/Account/Login?ReturnUrl=%2F',
    );
    await this.page.setViewport({ width: 1280, height: 960 });
  }

  protected async clickSelector(selector: string): Promise<void> {
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
  }

  protected async fillInput(selector: string, value: string): Promise<void> {
    await this.clickSelector(selector);
    await this.page.type(selector, value);
  }

  protected async login(): Promise<void> {
    await this.clickSelector(CapitoleSelectorsEnum.LOGIN_BUTTON);
    await this.navigationPromise;
  }

  protected async destroyBrowser(): Promise<void> {
    await this.browser.close();
  }
}
