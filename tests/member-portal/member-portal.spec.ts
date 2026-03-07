import { test } from '@playwright/test';
import * as globals from '../../globals';
import * as memberHelper from '../../helpers/memberHelper';
import { SharedObjects } from '../../support/shared/shared-objects';
import { HomePage } from '../../support/member-portal/shared/home-page';
import { JoinPage } from '../../support/member-portal/join-page';
import { LoginPage } from '../../support/member-portal/shared/login-page';
import { ReserveAppointmentPage } from '../../support/member-portal/reserve-appontment-page';
import { ScheduleScanPage } from '../../support/member-portal/schedule-scan-page';
import { SelectAPlanPage } from '../../support/member-portal/select-plan-page';


test.describe('member portal', () => {
  let sharedObjects: SharedObjects;
  let homePage: HomePage;
  let joinPage: JoinPage;
  let loginPage: LoginPage;
  let reserveAppointmentPage: ReserveAppointmentPage;
  let scheduleScanPage: ScheduleScanPage;
  let selectAPlanPage: SelectAPlanPage;

  let firstName: string;
  let lastName: string;
  let email: string;
  let phoneNumber: string;
  let password: string;
  
  test.beforeEach('load member portal page', async ({ page }) => {
    sharedObjects = new SharedObjects(page);
    homePage = new HomePage(page);
    joinPage = new JoinPage(page);
    loginPage = new LoginPage(page);
    reserveAppointmentPage = new ReserveAppointmentPage(page);
    scheduleScanPage = new ScheduleScanPage(page);
    selectAPlanPage = new SelectAPlanPage(page);

    const memberDetailsString = memberHelper.generateMemberDetails();
    const memberDetails = JSON.parse(memberDetailsString);

    firstName = memberDetails.firstName;
    lastName = memberDetails.lastName;
    email = memberDetails.email;
    phoneNumber = memberDetails.phoneNumber;
    password = memberDetails.password;

    await sharedObjects.goToPage('/');
    await sharedObjects.acceptCookies();
  });

  // test.afterEach('close browser', async ({ page }) => {
  //   await page.close();
  // });

  test('new member sign up', async ({ page }) => {
    console.log(email);
    console.log(password);
    console.log(phoneNumber);
    await sharedObjects.clickLink('Join');
    await joinPage.enterMemberDetails(firstName, lastName, email, phoneNumber, password);
    await sharedObjects.clickButton('I agree to Ezra\'s terms of');
    await sharedObjects.clickButton('I agree that Ezra, directly');
    await page.waitForTimeout(1000);
    await sharedObjects.clickButton('Submit');

    await sharedObjects.assertUrl('/sign-up/select-plan');
    await sharedObjects.assertHeader('Select your Scan');
  });

  test('log in and schedule a scan', async ({ page }) => {
    // NOTE: For the sake of this test, I have chosen to use credentials that I know exists. This can be enhanced in the future
    //       to dynamically grab a specific type of account based on set criteria using an API or some other method.
    const EMAIL = process.env.MEMBER_USERNAME;
    const PASSWORD = process.env.MEMBER_PASSWORD;
    const CC_NUMBER = globals.CREDIT_CARD_NUMBER;
    const CC_EXPIRATION = globals.CREDIT_CARD_EXPIRATION;
    const CC_CVC = globals.CREDIT_CARD_CVC;
    const CC_ZIP = globals.CREDIT_CARD_ZIP;

    // NOTE: If there are, and most likely there will be, more tests that require logging in, this step could be pulled out and put into a beforeEach() block.
    await loginPage.login(EMAIL, PASSWORD);

    // Dismissing the timezone pop-up if it appears if it appears.
    // NOTE: This waitForTimeout is definitely not an ideal solution; however, after trying different waitForLoadState() options, the check to see if the modal
    //       is visible was still executing before the modal was visible, causing the test to fail.
    await page.waitForTimeout(2000);
    if(await homePage.confirmYourTimeZoneHeader.isVisible()) {
      await homePage.cancelTimezoneConfirmation();
    };

    // Home Page
    await sharedObjects.clickButton('Book a scan');

    // Select A Plan
    await selectAPlanPage.enterDateOfBirth('01-01-1990');
    await selectAPlanPage.selectSexAtBirthOption('Male');
    await selectAPlanPage.selectServiceCard('MRI Scan');
    await selectAPlanPage.selectAddOn('lung-addon-card');
    await selectAPlanPage.selectAddOn('gatedcac-addon-card');
    await sharedObjects.clickButton('Continue');

    // Heart Health Assessment
    await selectAPlanPage.heartHealthAssessmentOption('no-chest-symptoms');
    await selectAPlanPage.heartHealthAssessmentOption('no-gatedCacStent');
    await selectAPlanPage.heartHealthAssessmentOption('no-pacemaker');
    await selectAPlanPage.heartHealthAssessmentOption('no-coronaryHistory');
    await selectAPlanPage.heartHealthAssessmentOption('no-previousCacScoreThreeYears');
    await selectAPlanPage.heartHealthAssessmentOption('no-previousCacScoreOver400');
    await sharedObjects.clickButton('Submit');

    // Schedule Your Scan
    await scheduleScanPage.selectLocation();
    await scheduleScanPage.selectDate();
    await scheduleScanPage.selectTime();
    await sharedObjects.clickButton('Continue');

    // Reserve Your Appointment
    await reserveAppointmentPage.enterCreditCardDetails(CC_NUMBER, CC_EXPIRATION, CC_CVC, CC_ZIP);
    await sharedObjects.clickButton('Continue');

    // Sign up confirmation
    await page.waitForTimeout(1000);
    await sharedObjects.assertUrl('/sign-up/scan-confirm');
  });
});