import { uploadFile } from '../storage';
import { Storage } from '@google-cloud/storage';

jest.mock('@google-cloud/storage', () => {
  const mFile = {
    name: 'electiongram/test.png',
    createWriteStream: jest.fn().mockImplementation(() => {
      // Return a fake stream that emits events
      return {
        on: jest.fn().mockImplementation(function(this: { createWriteStream: jest.Mock }, event, callback) {
          if (event === 'finish' && !mFile.createWriteStream.mock.calls.find(c => c[0]?.metadata?.contentType === 'fail')) {
            setTimeout(callback, 0);
          }
          if (event === 'error' && mFile.createWriteStream.mock.calls.find(c => c[0]?.metadata?.contentType === 'fail')) {
            setTimeout(() => callback(new Error('Storage Error')), 0);
          }
          return this;
        }),
        end: jest.fn()
      };
    })
  };
  const mBucket = { file: jest.fn().mockReturnValue(mFile) };
  const mStorage = { bucket: jest.fn().mockReturnValue(mBucket) };
  return { Storage: jest.fn().mockImplementation(() => mStorage) };
});

describe('Storage Service', () => {
  it('should upload a file and return public URL', async () => {
    const buffer = Buffer.from('mock data');
    const result = await uploadFile(buffer, 'test.png', 'image/png');
    
    expect(result).toContain('https://storage.googleapis.com/');
    expect(result).toContain('/electiongram/');
    const mStorage = new (Storage as unknown as jest.Mock)() as any;
    expect(mStorage.bucket).toHaveBeenCalled();
    expect(mStorage.bucket().file).toHaveBeenCalled();
  });

  it('should fallback to local storage if upload fails', async () => {
    // The fallback logic in storage.ts catches errors and writes locally
    // So it doesn't throw, it returns a local URL
    const result = await uploadFile(Buffer.from('data'), 'test.png', 'fail');
    expect(result).toMatch(/\/uploads\/[a-f0-9-]+\.png$/);
  });
});
