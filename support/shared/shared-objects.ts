import { expect, type Page } from '@playwright/test';

export class SharedObjects {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  };

  async goToPage(pageUrl: string): Promise<void> {
    await this.page.goto(pageUrl);
  };

  async fillInputField(fieldName: string, value: string): Promise<void> {
    const inputField = this.page.getByRole('textbox', { name: fieldName });
    await inputField.fill(value);
  };

  async clickLink(linkText: string): Promise<void> {
    const link = this.page.getByRole('link', { name: linkText });
    await link.click();
  };

  async clickButton(buttonText: string): Promise<void> {
    const button = this.page.getByRole('button', { name: buttonText });
    await button.click();
  };

  async assertUrl(expectedUrl: string): Promise<void> {
    await expect(this.page).toHaveURL(expectedUrl);
  };

  async assertHeader(headerText: string): Promise<void> {
    const header = this.page.getByRole('heading', { name: headerText });
    await expect(header).toBeVisible();
  };

  async acceptCookies(): Promise<void> {
    await this.clickButton('Accept');
  };
};