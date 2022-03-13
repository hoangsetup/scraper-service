/* eslint-disable no-console */
import express from 'express';
import environments from './utils/environments';
import { sendQueryToQueue } from './utils/scraper-queue';

const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

app.get('/search', async (req, res) => {
  try {
    const { query = '' } = req.query as { query: string };
    if (!query) {
      return res.status(500).json({ message: 'Query string is required!' });
    }

    const transactionId = Date.now();
    await sendQueryToQueue({
      query,
      transactionId,
    });

    return res.json({
      transactionId,
      message: 'The query is already in the queue',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: (error as Error).message });
  }
});

app.listen(environments.apiPort, () => {
  console.log(`Server is running on: ${environments.apiPort}`);
});
