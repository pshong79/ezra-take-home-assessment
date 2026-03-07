import { type Page } from '@playwright/test';

export class ScheduleScanPage {
  readonly page: Page;
  readonly appointmentTime;
  readonly locationCard;

  constructor(page: Page) {
    this.page = page;
    this.appointmentTime = page.locator('.appointments__individual-appointment');
    this.locationCard = page.locator('.location-card');
  };

  // NOTE: It is probably better to make this method more dynamic so that it takes in a location name; however, I feel like it is
  //       sufficient to just select the first location regardless because the test is to just ensure a service can be scheduled.
  async selectLocation(): Promise<void> {
    await this.locationCard.first().click();
  };

  // NOTE: I was stuck here identifying the first available date option. For the sake of getting past this, I am explicitly selecting
  //       a specific date. The better option would be, like above, selecting the first available date because eventually, the avaialble
  //       times will run out for this date and the test will eventually fail.
  async selectDate(): Promise<void> {
    await this.page.getByTestId('3-17-cal-day-content').click();
  };

  // NOTE: Same idea as above - just selecting the first option for simplicity.
  async selectTime(): Promise<void> {
    await this.appointmentTime.first().click();
  };
};