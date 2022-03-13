const apiPort = Number(process.env.API_PORT || 3000);

const rabbitMQHostname = process.env.RABBITMQ_HOST;
const rabbitMQPort = Number(process.env.RABBITMQ_PORT || 5672);
const rabbitMQUsername = process.env.RABBITMQ_USERNAME;
const rabbitMQPassword = process.env.RABBITMQ_PASSWORD;
const rabbitMQScraperQueue = process.env.RABBITMQ_QUEUE || 'google_scraper_queue';

const redisUrl = process.env.REDIS_URL || 'redis://redis:6379';

export default {
  apiPort,
  rabbitMQHostname,
  rabbitMQPort,
  rabbitMQUsername,
  rabbitMQPassword,
  rabbitMQScraperQueue,
  redisUrl,
};
