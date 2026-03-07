import { type Page } from '@playwright/test';

export class JoinPage {
  readonly page: Page;
  readonly firstNameInput;
  readonly lastNameInput;
  readonly emailInput;
  readonly phoneNumberInput;
  readonly passwordInput;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.getByRole('textbox', { name: 'Legal First Name' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Legal Last Name' });
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.phoneNumberInput = page.getByRole('textbox', { name: 'Phone Number' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
  };

  async enterMemberDetails(firstName: string, lastName: string, email: string, phoneNumber: string, password: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.phoneNumberInput.fill(phoneNumber);
    await this.passwordInput.fill(password);
  };
};