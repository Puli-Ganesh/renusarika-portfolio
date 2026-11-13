import { test, expect } from '@playwright/test';
test('content, navigation and interactive process details',async({page})=>{
  const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Rachamalli Renusarika');
  await expect(page.locator('main > section')).toHaveCount(8);
  await page.getByRole('link',{name:'Explore my work'}).click();
  await expect(page).toHaveURL(/#projects/);
  await page.getByRole('button',{name:'Explore the logic'}).click();
  await expect(page.locator('#rl-logic')).toContainText('not a trained PPO model');
  await page.getByRole('button',{name:'03 GPU compute'}).click();
  await expect(page.locator('.stage-description')).toContainText('GPU memory');
  await expect(page.locator('a[href="mailto:renusarikarachamalli@gmail.com"]').first()).toBeAttached();
  expect(errors).toEqual([]);
});
test('reduced motion and no horizontal overflow',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/');
  await expect(page.locator('.portfolio')).toHaveClass(/motion-reduced/);
  for(const width of [320,390,768,1440,2560]){
    await page.setViewportSize({width,height:900});
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
});
test('mobile menu supports keyboard closing',async({page,isMobile})=>{
  test.skip(!isMobile);
  await page.goto('/');
  const open=page.getByRole('button',{name:'Open navigation'});
  await open.click();await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(open).toBeFocused();
});
