import { type Page } from '@playwright/test';

export class ReserveAppointmentPage {
  readonly page: Page;
  readonly creditCardNumberInput;
  readonly creditCardExpirationInput;
  readonly creditCardCVCInput;
  readonly creditCardZipCodeInput;
  readonly paymentDetailsFrame;

  constructor(page: Page) {
    this.page = page;
    this.paymentDetailsFrame = page.frameLocator('iframe[title="Secure payment input frame"]').first();
    this.creditCardNumberInput = this.paymentDetailsFrame.getByRole('textbox', { name: 'Card number' });
    this.creditCardExpirationInput = this.paymentDetailsFrame.getByRole('textbox', { name: 'Expiration date' });
    this.creditCardCVCInput = this.paymentDetailsFrame.getByRole('textbox', { name: 'Security code' });
    this.creditCardZipCodeInput = this.paymentDetailsFrame.getByRole('textbox', { name: 'ZIP code' });
  };

  async enterCreditCardDetails(number: string, expiration: string, CVC: string, zipCode: string): Promise<void> {
    await this.creditCardNumberInput.fill(number);
    await this.creditCardExpirationInput.fill(expiration);
    await this.creditCardCVCInput.fill(CVC);
    await this.creditCardZipCodeInput.fill(zipCode);
  };
};
