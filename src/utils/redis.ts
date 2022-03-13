import { createClient, RedisClientType } from 'redis';
import environments from './environments';

let client: RedisClientType;

export default async function getRedisClient(): Promise<RedisClientType> {
  if (!client) {
    client = createClient({ url: environments.redisUrl });
    await client.connect();
  }

  return client;
}
