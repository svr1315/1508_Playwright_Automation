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
test('verify_scenario2',async({page}, testInfo)=>{
      //Fetch test name for screenshort
        const testName = test.info().title.replace(/\s+/g, '_');
      //Fetch timestamp
        const timestamp = new Date().toISOString().replace(/:/g, '-');
  
      //2. Screenshot
      await testInfo.attach(testName+'__'+timestamp,{
          body: await page.screenshot(),
          contentType:'image/png',  
        })
      await page.screenshot({ path: path.join('screenshots',  testName+'__'+timestamp+'.png') }); 
  
      //3. Move to Searchbar
      const searchBar=page.locator('input[placeholder="Looking for something?"]');
      await searchBar.waitFor({ state: 'visible' });     
      await searchBar.click();
      await page.waitForTimeout(1000);
      const clearSearchHistoryBtn=page.locator('section[data-testid="search-history"] span[class="merTextLink"] button[type="button"]')
      const isVisible = await clearSearchHistoryBtn.isVisible(); // Check if the button is visible
      //Clear existing search history in case if any exists
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
      
      // Search 'Books, Magazines, Manga'
       await page.hover('(//div[@class="content__884ec505"]/a/p)[1]');
       await page.click('(//div[@class="content__884ec505"]/a/p)[1]');
       await page.waitForTimeout(2000);
       await testInfo.attach(testName+'__'+timestamp,{
          body: await page.screenshot(),
          contentType:'image/png',  
        })
       await page.screenshot({ path: path.join('screenshots',  testName+'__'+timestamp+'.png') });    
       const link1 = page.locator('a:has-text("Books, Magazines, Manga")');     
      // Wait for the link to be visible
       await link1.waitFor({ state: 'visible' });  
       await testInfo.attach(testName+'__'+timestamp,{
          body: await page.screenshot(),
          contentType:'image/png',  
        })    
        await page.screenshot({ path: path.join('screenshots',  testName+'__'+timestamp+'.png') });  
      // Click the link
      await link1.click();
      await page.screenshot({ path: path.join('screenshots',  testName+'__'+timestamp+'.png') });
      await page.waitForTimeout(2000); 
  
  
      // Search 'Book'
      const link2 = await page.locator('//a[normalize-space()="Book"]');       
      // Wait for the link to be visible
      await link2.waitFor({ state: 'visible' }); 
      await testInfo.attach(testName+'__'+timestamp,{
          body: await page.screenshot(),
          contentType:'image/png',  
        }) 
      await page.screenshot({ path: path.join('screenshots',  testName+'__'+timestamp+'.png') });   
      // Click the link
      await link2.click();
      await testInfo.attach(testName+'__'+timestamp,{
          body: await page.screenshot(),
          contentType:'image/png',  
        })
      await page.screenshot({ path: path.join('screenshots',  testName+'__'+timestamp+'.png') });
      await page.waitForTimeout(2000);
  
  
      // Search 'Computer It'
      const link3 = await page.locator('a:has-text("Computer It")');     
      // Wait for the link to be visible
      await link3.waitFor({ state: 'visible' }); 
      await testInfo.attach(testName+'__'+timestamp,{
          body: await page.screenshot(),
          contentType:'image/png',  
        }) 
      await page.screenshot({ path: path.join('screenshots',  testName+'__'+timestamp+'.png') }); 
      await link3.scrollIntoViewIfNeeded();     
      await link3.click();
      await testInfo.attach(testName+'__'+timestamp,{
          body: await page.screenshot(),
          contentType:'image/png',  
        })
      await page.screenshot({ path: path.join('screenshots',  testName+'__'+timestamp+'.png') });
      await page.waitForTimeout(5000);
  
  
      //Verifying first selected  option
      const dropdown1 = await page.locator('div[class="content__76b937fd"] div:nth-child(1) div:nth-child(1) div:nth-child(1) select:nth-child(1)'); // Adjust the selector as needed
      const selectedOption1 = await dropdown1.locator('option:checked'); 
      const selectedText1 = await selectedOption1.innerText(); 
      console.log('First Option selected:', selectedText1);  
      await testInfo.attach(testName+'__'+timestamp,{
          body: await page.screenshot(),
          contentType:'image/png',  
        })
      await page.screenshot({ path: path.join('screenshots',  testName+'__'+timestamp+'.png') }); 
      await expect(selectedText1).toBe('Books, Magazines, Manga'); 
  
      //Verifying second selected option
      const dropdown2 = await page.locator('#accordion_content > div > div:nth-child(2) > div > div.selectWrapper__da4764db > select'); // Adjust the selector as needed
      // Fetch the selected value directly
      const selectedOption2 =  await dropdown2.locator('option:checked'); // Locate the selected option
      const selectedText2 = await selectedOption2.innerText(); // Get the inner text
      console.log('Second Option Selected:', selectedText2);  
      await testInfo.attach(testName+'__'+timestamp,{
          body: await page.screenshot(),
          contentType:'image/png',  
        })
      await page.screenshot({ path: path.join('screenshots',  testName+'__'+timestamp+'.png') }); 
      expect(selectedText2).toBe('Book'); 
      
      //Verifying third selected option
      const selectedOption3= await page.locator('//div[@class="merFormGroup mer-spacing-b-16"]/div/label/input[@aria-checked="true"]/../div/div/span');
      await selectedOption3.scrollIntoViewIfNeeded();  
      const selectedText3 = await selectedOption3.innerText();
      await testInfo.attach(testName+'__'+timestamp,{
          body: await page.screenshot(),
          contentType:'image/png',  
        })
      await page.screenshot({ path: path.join('screenshots',  testName+'__'+timestamp+'.png') }); 
      console.log('Third Option Selected:', selectedText3); 
      await testInfo.attach(testName+'__'+timestamp,{
          body: await page.screenshot(),
          contentType:'image/png',  
        })
      await page.screenshot({ path: path.join('screenshots',  testName+'__'+timestamp+'.png') }); 
      expect(selectedText3).toBe('Computer It');  

     const searchdialog= page.locator('//input[@aria-label="Search by keyword"]');
     await searchdialog.scrollIntoViewIfNeeded();   
     await searchdialog.click();
     await testInfo.attach(testName+'__'+timestamp,{
        body: await page.screenshot(),
        contentType:'image/png',  
      })
    await page.screenshot({ path: path.join('screenshots',  testName+'__'+timestamp+'.png') }); 

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

    
   //searching javascript
    const searchInputSelector = 'input[placeholder="Looking for something?"]'; 
    await page.click(searchInputSelector);
    await page.fill(searchInputSelector, 'javascript');
    await testInfo.attach(testName+'__'+timestamp,{
        body: await page.screenshot(),
        contentType:'image/png',  
      })
    await page.screenshot({ path: path.join('screenshots',  testName+'__'+timestamp+'.png') });  

    await page.hover('(//div[@class="content__884ec505"]/a//p)[1]');
    await page.click('(//div[@class="content__884ec505"]/a//p)[1]');
    await testInfo.attach(testName+'__'+timestamp,{
        body: await page.screenshot(),
        contentType:'image/png',  
      })
    await page.screenshot({ path: path.join('screenshots',  testName+'__'+timestamp+'.png') }); 
    await page.waitForTimeout(2000);   
    const newTab = await page.context().newPage(); 
    await newTab.goto('https://jp.mercari.com/en', {            
            timeout: 300000,           
          });
    await testInfo.attach(testName+'__'+timestamp,{
            body: await page.screenshot(),
            contentType:'image/png',  
          })
    await page.screenshot({ path: path.join('screenshots',  testName+'__'+timestamp+'.png') }); 
    
    await newTab.click('input[placeholder="Looking for something?"]', { timeout: 30000 });
    const selection_history1 = newTab.locator('//section[@data-testid="search-history"]/div[2]//a',{ timeout: 30000 });
    const options2 = await selection_history1.locator('p').all();
    await testInfo.attach(testName+'__'+timestamp,{
        body: await page.screenshot(),
        contentType:'image/png',  
      })
    await page.screenshot({ path: path.join('screenshots',  testName+'__'+timestamp+'.png') });          
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