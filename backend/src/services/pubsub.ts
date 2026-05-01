import { PubSub } from '@google-cloud/pubsub';

const pubsub = new PubSub();
const TOPIC_NAME = 'electroabhi';

export const publishEvent = async (data: Record<string, unknown>) => {
  try {
    const dataBuffer = Buffer.from(JSON.stringify(data));
    const messageId = await Promise.race([
      pubsub.topic(TOPIC_NAME).publishMessage({ data: dataBuffer }),
      new Promise<string>((_, reject) => setTimeout(() => reject(new Error('Pub/Sub Timeout')), 1000))
    ]);
    console.log(`Message ${messageId} published to topic ${TOPIC_NAME}`);
    return messageId;
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    console.warn(`Pub/Sub disabled or unreachable locally. Moving on.`, msg);
    // Non-blocking error so the app doesn't crash if GCP credentials aren't set
  }
};
