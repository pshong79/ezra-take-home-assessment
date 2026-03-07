import { test } from '@playwright/test';
import { SharedObjects } from '../../support/shared/shared-objects';


test.describe('user portal', async () => {
  let sharedObjects: SharedObjects;

  test.beforeEach('load user portal page', async ({ page }) => {
    sharedObjects = new SharedObjects(page);

    await sharedObjects.goToPage('/');
    await sharedObjects.acceptCookies();
  });

  test.afterEach('close browser', async ({ page }) => {
    await page.close();
  });

  // Tests for the user portal here.
});