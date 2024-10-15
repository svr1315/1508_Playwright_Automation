const {test, expect}=require('@playwright/test')
const path = require('path');
//START ---HOOKS
test.beforeEach(async ({ page }, testInfo) => {
    //1. Navigate to Mercari top page 
    await page.goto('https://jp.mercari.com/en'); 
   console.log(`Starting test: ${testInfo.title}`);
});

   test.afterEach(async ({page}, testInfo) => {
       const videoPath = testInfo.outputPath('video.webm');
       await Promise.all([
         page.video().saveAs(videoPath),
         page.close()
       ]);        
     });
   
//END ---HOOKS
test('verify_scenario2',async({browser})=>{  
     // Create a new browser context
      const context = await browser.newContext();     
     // Create a new page in the new context
     const page = await context.newPage();     
    // Clear cookies
    await page.context().clearCookies(); // Clear all cookies         
    //1. Go to Mercari top page 
    await page.goto('https://jp.mercari.com/en');       
    const searchBar=page.locator('input[placeholder="Looking for something?"]');
    await searchBar.waitFor({ state: 'visible' });     
    await searchBar.click();
    await page.waitForTimeout(1000);
    const clearSearchHistoryBtn=page.locator('section[data-testid="search-history"] span[class="merTextLink"] button[type="button"]')
    const isVisible = await clearSearchHistoryBtn.isVisible(); // Check if the button is visible
    if (isVisible) {
        console.log('clearSearchHistoryBtn is visible!');
        await page.hover('section[data-testid="search-history"] span[class="merTextLink"] button[type="button"]');
        await clearSearchHistoryBtn.click();
        await page.waitForTimeout(2000);
        page.on('dialog', async dialog=>{
            expect(dialog.message()).toContain('Clear search history?');
            await dialog.accept();
        });
    } 
    else {
        console.log('clearSearchHistoryBtn is not visible.');
    }
      
     await page.hover('(//div[@class="content__884ec505"]/a/p)[1]');
     await page.click('(//div[@class="content__884ec505"]/a/p)[1]');
     await page.waitForTimeout(2000);
     const link1 = page.locator('a:has-text("Books, Magazines, Manga")');     
    // Wait for the link to be visible
     await link1.waitFor({ state: 'visible' });        
    // Click the link
    await link1.click();
    await page.waitForTimeout(2000);     
    const link2 = await page.locator('//a[normalize-space()="Book"]');       
    // Wait for the link to be visible
    await link2.waitFor({ state: 'visible' });    
    // Click the link
    await link2.click();
    await page.waitForTimeout(2000);
    const link3 = await page.locator('a:has-text("Computer It")');     
    // Wait for the link to be visible
    await link3.waitFor({ state: 'visible' });  
    await link3.scrollIntoViewIfNeeded();     
    // Click the link
    await link3.click();
    await page.waitForTimeout(5000);
    const dropdown1 = await page.locator('div[class="content__76b937fd"] div:nth-child(1) div:nth-child(1) div:nth-child(1) select:nth-child(1)'); // Adjust the selector as needed
    await dropdown1.scrollIntoViewIfNeeded();
    const selectedOption1 = await dropdown1.locator('option:checked'); 
    const selectedText1 = await selectedOption1.innerText(); 
    console.log('First Option selected:', selectedText1);  
    await expect(selectedText1).toBe('Books, Magazines, Manga'); 

    const dropdown2 = await page.locator('#accordion_content > div > div:nth-child(2) > div > div.selectWrapper__da4764db > select'); // Adjust the selector as needed
    // Fetch the selected value directly
    const selectedOption2 =  await dropdown2.locator('option:checked'); // Locate the selected option
    const selectedText2 = await selectedOption2.innerText(); // Get the inner text
    console.log('Second Option Selected:', selectedText2);  
    expect(selectedText2).toBe('Book'); 
    
    
    const selectedOption3= await page.locator('//div[@class="merFormGroup mer-spacing-b-16"]/div/label/input[@aria-checked="true"]/../div/div/span');
    await selectedOption3.scrollIntoViewIfNeeded();  
    const selectedText3 = await selectedOption3.innerText();
    console.log('Third Option Selected:', selectedText3); 
    expect(selectedText3).toBe('Computer It');   
        
     const searchdialog= page.locator('//input[@aria-label="Search by keyword"]');
     await searchdialog.scrollIntoViewIfNeeded();   
     await searchdialog.click();

     const selection_history = page.locator('//section[@data-testid="search-history"]/div[2]//a');
     const options1 = await selection_history.locator('p').all();       
     const expected_browser_history_prev=["Computer It"]; 
     let actual_browser_history_prev=[];

     for (const option of options1) {
        const text = await option.innerText(); // Get the visible text
        console.log(`Option_previous: ${text}`); // Print text
        actual_browser_history_prev.push(text);
     }
     
     expect(actual_browser_history_prev).toEqual(expected_browser_history_prev);

     //entering javascript
    // const searchdialog1= page.locator('//input[@aria-label="Search by keyword"]');
    // await searchdialog1.scrollIntoViewIfNeeded();   
    // await searchdialog1.click();    
    // await searchdialog1.fill("javascript",{ timeout: 15000 });
    // await page.hover('//p[normalize-space()="javascript"]',{ timeout: 15000 });
    // await page.click('//p[normalize-space()="javascript"]',{ timeout: 15000 });  

   //entering javascript
    const searchInputSelector = 'input[placeholder="Looking for something?"]'; // Replace with your search input's selector
    await page.click(searchInputSelector);
    await page.fill(searchInputSelector, 'javascript'); // Replace with the term you want to search for
    await page.hover('(//div[@class="content__884ec505"]/a//p)[1]');
    await page.click('(//div[@class="content__884ec505"]/a//p)[1]');
    await page.waitForTimeout(2000);   
    const newTab = await page.context().newPage(); 
    await newTab.goto('https://jp.mercari.com/en', {            
            timeout: 300000,           
          });
    
    await newTab.click('input[placeholder="Looking for something?"]', { timeout: 30000 });
    const selection_history1 = newTab.locator('//section[@data-testid="search-history"]/div[2]//a',{ timeout: 30000 });
    const options2 = await selection_history1.locator('p').all();         
    const expected_browser_history=["javascript, Computer It"];
    let actual_browser_history=[];

     for (const option of options2) {
        const text = await option.innerText(); // Get the visible text
        console.log(`Option: ${text}`); // Print text
        actual_browser_history.push(text);
     }     
     expect(actual_browser_history).toEqual(expected_browser_history);  
     await page.close();  
    
})