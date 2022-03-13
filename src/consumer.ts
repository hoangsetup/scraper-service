import { getLinksByQuery } from './utils/scraper';
import { consume } from './utils/scraper-queue';

(async () => {
  await consume(async (item) => {
    const links = await getLinksByQuery(item.query);
    // eslint-disable-next-line no-console
    console.log(links);
    // TODO: Save to db with transactionId
  });
})();
