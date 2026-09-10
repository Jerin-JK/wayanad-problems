import { Files } from 'files-sdk';
import { neon } from 'files-sdk/neon';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

async function run() {
  try {
    const files = new Files({ adapter: neon({ bucket: 'uploads' }) });
    await files.upload('test.txt', 'Hello World', { contentType: 'text/plain' });
    console.log('Upload success');
    const url = await files.url('test.txt');
    console.log('URL:', url);
  } catch(e) {
    console.error('Error:', e);
  }
}
run();
