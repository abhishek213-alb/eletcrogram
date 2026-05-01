import { Storage } from '@google-cloud/storage';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const storage = new Storage();
const BUCKET_NAME = process.env.BUCKET_NAME || 'election-assistant-pro-assets';

/**
 * Advanced File Upload Service
 * Uses Google Cloud Storage with a resilient local fallback.
 */
export const uploadFile = async (fileBuffer: Buffer, originalName: string, mimeType: string) => {
  const fileName = `${uuidv4()}${path.extname(originalName)}`;
  
  try {
    const bucket = storage.bucket(BUCKET_NAME);
    const file = bucket.file(`electiongram/${fileName}`);

    await new Promise((resolve, reject) => {
      const stream = file.createWriteStream({
        metadata: { contentType: mimeType }
      });
      stream.on('error', (err) => reject(err));
      stream.on('finish', () => resolve(true));
      stream.end(fileBuffer);
    });

    return `https://storage.googleapis.com/${BUCKET_NAME}/electiongram/${fileName}`;

  } catch (error) {
    console.warn('GCP Storage failed, falling back to local:', error);
    
    const uploadDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const localPath = path.join(uploadDir, fileName);
    fs.writeFileSync(localPath, fileBuffer);

    const baseUrl = process.env.BACKEND_URL || ''; // Relative path works better for mixed environments
    return `${baseUrl}/uploads/${fileName}`;
  }
};
