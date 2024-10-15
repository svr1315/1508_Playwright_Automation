const {test, expect}=require('@playwright/test')
test('verify_search_condition',async({browser})=>{  
     // Create a new browser context
     const context = await browser.newContext();
     // Create a new page in the new context
     const page = await context.newPage();  
    // Clear cookies
    await context.clearCookies(); // Clear all cookies
    //1. Go to Mercari top page 
    await page.goto('https://jp.mercari.com/en');
    // 2. Click on the search bar
    await page.locator('//input[@class="sc-de99d471-3 foftCJ"]').click();
    // 3. Click on "Select by category" 
    await page.locator('(//div[@data-testid="list-slot"]//a)[1]').click();
    const link1 = await page.locator('a:has-text("Books, Magazines, Manga")');     
    // Wait for the link to be visible
    await link1.waitFor({ state: 'visible' });    
    // Click the link
    await link1.click();
    //const link2 = page.locator('a:has-text("Book")'); 
    const link2 = await page.locator('//a[normalize-space()="Book"]');    
    // Wait for the link to be visible
    await link2.waitFor({ state: 'visible' });    
    // Click the link
    await link2.click();
    const link3 = await page.locator('a:has-text("Computer It")');     
    // Wait for the link to be visible
   // await link3.waitFor({ state: 'visible' });  
    await link3.scrollIntoViewIfNeeded();  
    // Click the link
    await link3.click();
    await page.waitForLoadState('domcontentloaded'); 
    const dropdown1 = page.locator('div[class="content__76b937fd"] div:nth-child(1) div:nth-child(1) div:nth-child(1) select:nth-child(1)'); // Adjust the selector as needed
    // Fetch the selected value directly
    const selectedOption1 = await dropdown1.locator('option:checked'); // Locate the selected option
    const selectedText1 = await selectedOption1.innerText(); // Get the inner text
    console.log('Selected Text:', selectedText1);  
    await expect(selectedText1).toBe('Books, Magazines, Manga'); 

    const dropdown2 = await page.locator('#accordion_content > div > div:nth-child(2) > div > div.selectWrapper__da4764db > select'); // Adjust the selector as needed
    // Fetch the selected value directly
    const selectedOption2 =  await dropdown2.locator('option:checked'); // Locate the selected option
    const selectedText2 = await selectedOption2.innerText(); // Get the inner text
    console.log('Selected Text:', selectedText2);  
    expect(selectedText2).toBe('Book'); 
    
    
    const selectedOption3= await page.locator('//div[@class="merFormGroup mer-spacing-b-16"]/div/label/input[@aria-checked="true"]/../div/div/span');
    await selectedOption3.scrollIntoViewIfNeeded();  
    const selectedText3 = await selectedOption3.innerText();
    console.log('Selected Text:', selectedText3); 
    expect(selectedText3).toBe('Computer It');
    await context.close();
})
