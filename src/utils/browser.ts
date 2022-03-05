import puppeteer, { Page } from 'puppeteer-core';

export default async function withPage<T>(func: (page: Page) => Promise<T>): Promise<T> {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-background-networking',
      '--disable-default-apps',
      '--disable-extensions',
      '--disable-sync',
      '--disable-translate',
      '--headless',
      '--hide-scrollbars',
      '--metrics-recording-only',
      '--mute-audio',
      '--no-first-run',
      '--safebrowsing-disable-auto-update',
      '--ignore-certificate-errors',
      '--ignore-ssl-errors',
      '--ignore-certificate-errors-spki-list',
      '--user-data-dir=/tmp',
    ],
  });

  const page = await browser.newPage();

  try {
    return await func(page);
  } finally {
    await page.close();
    await browser.close();
  }
}
