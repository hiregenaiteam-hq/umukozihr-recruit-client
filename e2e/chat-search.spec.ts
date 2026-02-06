import { test, expect } from '@playwright/test';

test.describe('Chat Search Flow', () => {
  test('should login and test chat search', async ({ page }) => {
    // Listen to console logs
    page.on('console', msg => {
      const text = msg.text();
      if (text.includes('[ChatSearch]') || text.includes('Event:') || text.includes('Complete')) {
        console.log(`[BROWSER] ${text}`);
      }
    });

    // Listen to network requests
    page.on('response', response => {
      if (response.url().includes('chat/stream')) {
        console.log(`[RESPONSE] ${response.status()} ${response.url()}`);
      }
    });

    // Go to login page
    await page.goto('http://localhost:3000/auth');
    
    // Wait for form to load
    await page.waitForSelector('input[type="email"]', { timeout: 10000 });
    
    // Login
    await page.fill('input[type="email"]', 'hiregenai.team@gmail.com');
    await page.fill('input[type="password"]', 'UmukoziHR_Admin26!');
    
    // Click sign in
    await page.click('button[type="submit"]');
    
    // Wait for redirect to search page
    await page.waitForURL('**/search**', { timeout: 15000 });
    console.log('[TEST] Logged in and on search page');

    // Wait for chat input to appear
    await page.waitForSelector('textarea', { timeout: 5000 });
    
    // Type search query
    const chatInput = page.locator('textarea').first();
    await chatInput.fill('Find me a senior Python developer in Lagos Nigeria with 3 years experience. Start searching now.');
    
    console.log('[TEST] Sending message...');
    
    // Click send button - it's the button with bg-orange-500 class inside the chat
    const sendButton = page.locator('button.bg-orange-500');
    await sendButton.click();
    
    // Wait for results to appear on the right panel
    console.log('[TEST] Waiting for search results...');
    
    // Wait for candidate cards or workflow status to appear
    try {
      // Either we get candidates or we get a progress message
      await page.waitForSelector('[class*="candidate"], [class*="Searching"], [class*="Analyzing"]', { timeout: 60000 });
    } catch {
      console.log('[TEST] No specific selector found, waiting for DOM changes');
    }
    
    // Wait additional time for search to complete
    await page.waitForTimeout(35000);
    
    // Take screenshot
    await page.screenshot({ path: 'test-results/chat-search-final.png', fullPage: true });
    
    // Check if we have results
    const resultsPanel = page.locator('.w-1\\/2.p-4');
    const resultsText = await resultsPanel.textContent();
    console.log('[TEST] Results panel text:', resultsText?.substring(0, 200));
    
    console.log('[TEST] Done. Check screenshot.');
  });
});
