const {test, expect}=require('@playwright/test')
test('verify_browser_history',async({browser})=>{  
     // Create a new browser context
      const context = await browser.newContext();
     
     // Create a new page in the new context
     const page = await context.newPage();  

    //  // Set the zoom level to 100%
    //  await page.evaluate(() => {
    //     document.body.style.zoom = '100%'; // Set zoom to 100%
    // });

    // // Optionally, verify the zoom level
    // const zoomLevel = await page.evaluate(() => {
    //     return document.body.style.zoom; // Get the current zoom level
    // });

    // console.log('Current zoom level:', zoomLevel); // Should print "100%"
   // Clear cookies and local storage
    await page.context().clearCookies(); // Clear all cookies         
    //1. Go to Mercari top page 
    await page.goto('https://jp.mercari.com/en');    
    //const searchBar=page.locator('//input[@placeholder="Looking for something?"]');
    const searchBar=page.locator('input[placeholder="Looking for something?"]');
    await searchBar.waitFor({ state: 'visible' });     
    await searchBar.click();
    await page.waitForTimeout(1000);
    //const clearSearchHistoryBtn=page.locator('//button[normalize-space()="Clear search history"]');
    const clearSearchHistoryBtn=page.locator('section[data-testid="search-history"] span[class="merTextLink"] button[type="button"]')
    const isVisible = await clearSearchHistoryBtn.isVisible(); // Check if the button is visible

    if (isVisible) {
        console.log('clearSearchHistoryBtn is visible!');
        // You can click the button or perform other actions here
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
   
    // // 2. Click on the search bar
    // const searchbar=page.locator('//input[@class="sc-de99d471-3 foftCJ"]');
    // await searchbar.waitFor({ state: 'visible' });
    // await searchbar.click();
    // 3. Click on "Select by category" 
    //await page.locator('(//div[@data-testid="list-slot"]//a)[1]').click();
   // await page.locator('#search-bar-autocomplete > div > div.merList.separator__17a1e07b > div:nth-child(1) > div.content__884ec505 > a').click();
   //  const selectbycategory=page.locator('#search-bar-autocomplete > div > div.merList.separator__17a1e07b > div:nth-child(1) > div.content__884ec505 > a');
    // const selectbycategory=page.locator('body > div:nth-child(2) > div:nth-child(1) > header:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3)');
     await page.hover('(//div[@class="content__884ec505"]/a/p)[1]');
    // await selectbycategory.waitFor({ state: 'visible' }); 
     //await selectbycategory.click();
     await page.click('(//div[@class="content__884ec505"]/a/p)[1]');
     await page.waitForTimeout(2000);
     const link1 = page.locator('a:has-text("Books, Magazines, Manga")');     
    // Wait for the link to be visible
    await link1.waitFor({ state: 'visible' });        
    // Click the link
    await link1.click();
    await page.waitForTimeout(2000);
    //const link2 = page.locator('a:has-text("Book")'); 
    const link2 = await page.locator('//a[normalize-space()="Book"]');   
    //const link2 = await page.locator('a[href="/en/categories?category_id=72"]'); 
    
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
    // Fetch the selected value directly
    const selectedOption1 = await dropdown1.locator('option:checked'); // Locate the selected option
    const selectedText1 = await selectedOption1.innerText(); // Get the inner text
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
    // await page.evaluate(() => {
    //     window.scrollTo(0, 0); // Scroll to the top
    // });      
     const searchdialog= page.locator('//input[@aria-label="Search by keyword"]');
     await searchdialog.scrollIntoViewIfNeeded();   
     await searchdialog.click();

     const selection_history = page.locator('//section[@data-testid="search-history"]/div[2]//a');
     const options1 = await selection_history.locator('p').all();       
     const expected_browser_history_prev=["Computer It"]; 
     let actual_browser_history_prev=[];

     for (const option of options1) {
        const text = await option.innerText(); // Get the visible text
        console.log(`Option_previous: ${text}`); // Print each value and text
        actual_browser_history_prev.push(text);
     }
     
     expect(actual_browser_history_prev).toEqual(expected_browser_history_prev);
     //entering javascript
     await searchdialog.fill("javascript");
    // await searchdialog.press('Enter');

    await page.hover('//p[normalize-space()="javascript"]');
    await page.click('//p[normalize-space()="javascript"]');
    

    //await page.click('//input[@aria-label="Search by keyword"]'); // Replace with the input box's selector

    // Enter text into the input box
   // await page.fill('//input[@aria-label="Search by keyword"]', 'javascript'); // Replace with the input box's selector
  
    // Simulate pressing the Enter key
   // await page.keyboard.press('Enter');

//await page.click('//input[@aria-label="Search by keyword"]'); // Replace with the input box's selector

  // Enter text into the input box
//await page.fill('//input[@aria-label="Search by keyword"]', 'javascript'); // Replace with the input box's selector
    
//     const textToEnter = 'javascript';
//   // Enter each character using key presses
//   for (const char of textToEnter) {
//     await page.keyboard.press(char);
//   }
//   await searchdialog.press('Enter');
    
    await page.goto("https://jp.mercari.com/en", { waitUntil: 'domcontentloaded' });
    await searchBar.click();
    await searchBar.waitForTimeout(1000);
    //const selection_history = page.locator('//section[@data-testid="search-history"]/div[2]//a');
    const options = await selection_history.locator('p').all();
    
    const expected_browser_history=["javascript, Computer It","Computer It"];  

    //expect(await options.innerText()).toEqual(['javascript, Computer It', 'Computer It']);
    //const options = await dropdown.locator('option').allTextContents(); // Get the text content of each option

    // Convert the options to an array (already in array format)
    //const optionsArray = options.map(option => option); // Trim whitespace if necessary

    //console.log('Options in dropdown:', optionsArray); // Output the options array

    // Optionally, perform assertions on the options array
    // expect(options[0]).toEqual(expected_browser_history[0]);
    // expect(options[1]).toEqual(expected_browser_history[1]);
    let actual_browser_history=[];

     for (const option of options) {
        const text = await option.innerText(); // Get the visible text
        console.log(`Option: ${text}`); // Print each value and text
        actual_browser_history.push(text);
     }
     
     expect(actual_browser_history).toEqual(expected_browser_history);
     
     
      await page.close();      
      await context.close();
      await browser.close();
    
})
