import fs from 'fs';
import { Storage } from '@google-cloud/storage';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const storage = new Storage();
const BUCKET_NAME = process.env.GCP_STORAGE_BUCKET || 'election-assistant-assets';

export const uploadFile = async (fileBuffer: Buffer, originalName: string, mimeType: string) => {
  const fileName = `${uuidv4()}${path.extname(originalName)}`;
  
  try {
    const bucket = storage.bucket(BUCKET_NAME);
    const blob = bucket.file(`electiongram/${fileName}`);

    const blobStream = blob.createWriteStream({
      resumable: false,
      metadata: { contentType: mimeType },
    });

    const uploadPromise = new Promise<string>((resolve, reject) => {
      blobStream.on('error', (err) => reject(err));
      blobStream.on('finish', () => {
        const publicUrl = `https://storage.googleapis.com/${BUCKET_NAME}/${blob.name}`;
        resolve(publicUrl);
      });
      blobStream.end(fileBuffer);
    });

    return await uploadPromise;
  } catch (error) {
    console.warn('Cloud Storage failed, falling back to local storage:', error);
    // Local fallback for demo purposes
    const uploadDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
    const localPath = path.join(uploadDir, fileName);
    fs.writeFileSync(localPath, fileBuffer);
    const baseUrl = process.env.BACKEND_URL || 'http://localhost:8082';
    return `${baseUrl}/uploads/${fileName}`;
  }
};

