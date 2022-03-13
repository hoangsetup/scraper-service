import { ISearchResult, ITransaction } from './interfaces';
import getRedisClient from './redis';

export async function addTransaction(transactionId: string): Promise<void> {
  const redisClient = await getRedisClient();

  await redisClient.set(
    transactionId,
    JSON.stringify({ status: 'ON_QUEUE' } as ITransaction),
    { EX: 15 * 60 },
  );
}

export async function updateTransactionToProcessing(transactionId: string): Promise<void> {
  const redisClient = await getRedisClient();

  await redisClient.set(
    transactionId,
    JSON.stringify({ status: 'PROCESSING' } as ITransaction),
    { KEEPTTL: true },
  );
}

export async function updateTransactionToDone(
  transactionId: string,
  result: ISearchResult,
): Promise<void> {
  const redisClient = await getRedisClient();

  await redisClient.set(
    transactionId,
    JSON.stringify({ status: 'DONE', data: result } as ITransaction),
    { KEEPTTL: true },
  );
}

export async function getTransactionResult(transactionId: string): Promise<ITransaction> {
  const redisClient = await getRedisClient();

  const valueString = await redisClient.get(transactionId);

  if (!valueString) {
    throw new Error('Transaction not found!');
  }

  return JSON.parse(valueString) as ITransaction;
}
