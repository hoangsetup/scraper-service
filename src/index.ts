/* eslint-disable no-console */
import express from 'express';
import environments from './utils/environments';
import { ISearchResult } from './utils/interfaces';
import { getLinksByQuery } from './utils/scraper';

const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

app.get('/search', async (req, res) => {
  try {
    const now = Date.now();

    const { query = '' } = req.query as { query: string };
    if (!query) {
      return res.json({
        query,
        took: (Date.now() - now) / 1000,
        links: [],
      } as ISearchResult);
    }

    const links = await getLinksByQuery(query);

    return res.json({
      query,
      took: (Date.now() - now) / 1000,
      links,
    } as ISearchResult);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: (error as Error).message });
  }
});

app.listen(environments.apiPort, () => {
  console.log(`Server is running on: ${environments.apiPort}`);
});
