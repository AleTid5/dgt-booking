import { Browser, HTTPResponse, Page } from 'puppeteer';
import CapitoleSelectorsEnum from '../enums/capitole-selectors.enum';
import * as fs from 'fs';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const puppeteer = require('puppeteer');

export default class CheckinAction {
  protected browser: Browser;
  protected navigationPromise: Promise<HTTPResponse | null>;
  protected page: Page;
  private readonly SCREENSHOTS_DIRECTORY = 'screenshots';

  protected async createBrowser(): Promise<void> {
    this.browser = await puppeteer.launch();
    this.page = await this.browser.newPage();
    this.navigationPromise = this.page.waitForNavigation();

    await this.page.goto(
      'https://capitole-ep-prd.azurewebsites.net/Account/Login?ReturnUrl=%2F',
    );
    await this.page.setViewport({ width: 1920, height: 973 });
  }

  protected async click(selector: string): Promise<void> {
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
  }

  protected async fillInput(selector: string, value: string): Promise<void> {
    await this.click(selector);
    await this.page.type(selector, value);
  }

  protected async login(): Promise<void> {
    await this.click(CapitoleSelectorsEnum.LOGIN_BUTTON);
    await this.navigationPromise;
  }

  protected async takeScreenshot(imageName): Promise<void> {
    if (!fs.existsSync(this.SCREENSHOTS_DIRECTORY)) {
      fs.mkdirSync(this.SCREENSHOTS_DIRECTORY);
    }

    await this.page.screenshot({
      type: 'png',
      path: `${this.SCREENSHOTS_DIRECTORY}/${Date.now()}-${imageName}.png`,
    });
  }

  protected async destroyBrowser(): Promise<void> {
    await this.browser.close();
  }
}
