import {
  Channel,
  connect,
  Connection,
} from 'amqplib';
import environments from './environments';

let connection: Connection;
const channels: Record<string, Channel> = {};

export default async function getChannel(queue: string): Promise<Channel> {
  if (channels[queue]) {
    return channels[queue];
  }

  if (!connection) {
    connection = await connect({
      hostname: environments.rabbitMQHostname,
      port: environments.rabbitMQPort,
      username: environments.rabbitMQUsername,
      password: environments.rabbitMQPassword,
    });
  }

  channels[queue] = await connection.createChannel();
  await channels[queue].assertQueue(
    queue,
    {
      durable: true,
      autoDelete: false,
    },
  );

  await channels[queue].prefetch(1);

  return channels[queue];
}
