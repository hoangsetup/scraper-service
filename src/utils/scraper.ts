import withPage from './browser';
import { ILink } from './interfaces';

// eslint-disable-next-line import/prefer-default-export
export function getLinksByQuery(query: string): Promise<ILink[]> {
  return withPage(async (page) => {
    await page.goto('https://www.google.com/', {
      timeout: 0,
      waitUntil: 'networkidle2',
    });
    await page.type('input', query);
    await page.keyboard.press('Enter');
    await page.waitForSelector('div.yuRUbf > a');

    return page.evaluate(() => {
      const data: ILink[] = [];
      document.querySelectorAll('div.yuRUbf > a').forEach((ele) => {
        data.push({
          title: ele.querySelector('h3')?.textContent as string,
          link: (ele as HTMLAnchorElement).href,
        });
      });

      return data;
    });
  });
}
