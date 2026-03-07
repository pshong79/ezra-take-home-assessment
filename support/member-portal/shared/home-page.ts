import { type Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly confirmTimezoneButton;
  readonly cancelTimezoneButton;
  readonly confirmYourTimeZoneHeader;

  constructor(page: Page) {
    this.page = page;
    this.confirmYourTimeZoneHeader = page.getByRole('heading', { name: 'Confirm your time zone' });
    this.confirmTimezoneButton = page.getByRole('button', { name: 'Confirm' });
    this.cancelTimezoneButton = page.getByRole('button', { name: 'Close' });;
  };

  async confirmTimezone(): Promise<void> {
    await this.confirmTimezoneButton.click();
  };

  async cancelTimezoneConfirmation(): Promise<void> {
    await this.cancelTimezoneButton.click();
  };
};