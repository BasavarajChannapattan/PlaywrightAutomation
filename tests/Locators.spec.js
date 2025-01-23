
import {test, expect} from "@playwright/test";
test("Visit the page and find the title", async ({page})=> {
    await page.goto("https://demoblaze.com/")
    await page.click("id=login2");
    await page.fill('#loginusername',"pavalol");
    await page.fill("input[id='loginpassword']","test@123");
    await page.click("//button[contains(text(),'Log in')]")
    const logoutLink = await page.locator("//a[@id='logout2']")
    await expect(logoutLink).toBeVisible();
    await page.close();

})
