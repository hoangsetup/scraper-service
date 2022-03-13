import environments from './environments';
import { IQueueItem } from './interfaces';
import getChannel from './rabbitmq';

export async function sendQueryToQueue(item: IQueueItem): Promise<boolean> {
  const channel = await getChannel(environments.rabbitMQScraperQueue);
  const message = JSON.stringify(item);
  return channel.sendToQueue(environments.rabbitMQScraperQueue, Buffer.from(message));
}

export async function consume(onQuery: (item: IQueueItem) => Promise<void>) {
  const channel = await getChannel(environments.rabbitMQScraperQueue);
  channel.consume(environments.rabbitMQScraperQueue, async (message) => {
    try {
      if (!message) {
        return;
      }

      const item = JSON.parse(message.content.toString()) as IQueueItem;

      await onQuery(item);
    } finally {
      if (message) {
        channel.ack(message);
      }
    }
  });
}
