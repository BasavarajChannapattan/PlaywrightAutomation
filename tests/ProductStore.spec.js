
import {test, expect} from "@playwright/test";


test("Visit the page and find the title", async ({page})=> {
    await page.goto("https://demoblaze.com/")
    await expect(page).toHaveTitle("STORE");
    await page.getByRole('link', { name: 'Log in' }).click();
    await page.close();

})