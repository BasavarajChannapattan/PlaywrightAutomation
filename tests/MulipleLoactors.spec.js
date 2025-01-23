
import {test, expect} from "@playwright/test";


test("Visit the page and find the title", async ({page})=> {
    await page.goto("https://demoblaze.com/")
    page.waitForSelector('a');
    const links = await page.$$('a')

    for(const link of links)
    {
        const linkName = link.textContent();
        console.log(linkName)
    }

})