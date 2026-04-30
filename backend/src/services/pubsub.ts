import { PubSub } from '@google-cloud/pubsub';

const pubsub = new PubSub();
const TOPIC_NAME = 'electroabhi';

export const publishEvent = async (data: Record<string, unknown>) => {
  try {
    const dataBuffer = Buffer.from(JSON.stringify(data));
    const messageId = await pubsub.topic(TOPIC_NAME).publishMessage({ data: dataBuffer });
    console.log(`Message ${messageId} published to topic ${TOPIC_NAME}`);
    return messageId;
  } catch (error) {
    console.error(`Received error while publishing to Pub/Sub:`, error);
    // Non-blocking error so the app doesn't crash if GCP credentials aren't set
  }
};
