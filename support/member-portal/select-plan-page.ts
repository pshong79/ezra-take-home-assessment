import { type Page } from '@playwright/test';

export class SelectAPlanPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  };

  async enterDateOfBirth(dob :string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Date of birth (MM-DD-YYYY)' }).fill(dob);
  };

  async selectSexAtBirthOption(sexAtBirth: string): Promise<void> {
    await this.page.getByRole('combobox').click();
    await this.page.getByText(sexAtBirth, { exact: true }).first().click();
  };

  async selectServiceCard(serviceName: string): Promise<void> {
    await this.page.getByText(serviceName, { exact: true }).click();
  };

  async selectAddOn(addOnName: string): Promise<void> {
    await this.page.getByTestId(addOnName).click();
  };

  async heartHealthAssessmentOption(optionYesNo: string): Promise<void> {
    await this.page.getByTestId(optionYesNo).click();
  };
};