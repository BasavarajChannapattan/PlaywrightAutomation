Locating elements in playwright

1. property
2. css 
3. xpath
approach for single element
===================

1. await page.locator('').click()
2. await page.click('locator')

inputBox
============================

1. await page.locator().fill(value)
2. await page.locator().type(value)
3. await page.fill("locator", "value")
4. await page.type("locator", "value")

Locate multiple web elements
=============================

await page.$$(' ')