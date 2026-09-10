import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3 = new S3Client({
  region: process.env.AWS_REGION ?? 'us-east-2',
  endpoint: process.env.AWS_ENDPOINT_URL_S3,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
  forcePathStyle: true,
});

const BUCKET = 'uploads';

export async function POST(request: NextRequest) {
  try {
    const { files } = await request.json(); // Expected: [{ filename, contentType }]

    if (!files || !Array.isArray(files) || files.length === 0) {
      return NextResponse.json({ error: 'No files specified' }, { status: 400 });
    }

    const uploadUrls = [];
    const endpoint = process.env.AWS_ENDPOINT_URL_S3?.replace(/\/$/, '');

    for (const file of files) {
      const uniqueKey = `${Date.now()}-${file.filename.replace(/\s+/g, '_')}`;
      
      const command = new PutObjectCommand({
        Bucket: BUCKET,
        Key: uniqueKey,
        ContentType: file.contentType || 'application/octet-stream',
      });

      // Generate a presigned URL valid for 5 minutes
      const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 });
      const publicUrl = `${endpoint}/${BUCKET}/${uniqueKey}`;

      uploadUrls.push({
        uploadUrl,
        publicUrl,
      });
    }

    return NextResponse.json({ urls: uploadUrls }, { status: 201 });
  } catch (error: any) {
    console.error('Presign error:', error);
    return NextResponse.json({ error: error.message || 'Presign failed' }, { status: 500 });
  }
}
