import { randomUUID } from 'crypto';
import { extname } from 'path';

import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';

import { s3Client, s3BucketName } from '../config/s3.config';

@Injectable()
export class UploadService {
  async getPresignedUrl(key: string, contentType: string): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: s3BucketName,
      Key: key,
      ContentType: contentType,
    });

    return await getSignedUrl(s3Client, command, {
      expiresIn: 300, // 5분
      signableHeaders: new Set(['host']),
      unsignableHeaders: new Set([
        'x-amz-checksum-crc32',
        'x-amz-sdk-checksum-algorithm',
      ]),
    });
  }

  generateUuid(): string {
    return randomUUID();
  }

  generateKey(userId: number, menuId: number, fileName: string): string {
    const ext = extname(fileName).toLowerCase().replace('.', '') || 'jpg';
    const uuid = this.generateUuid();
    return `withfestival/${userId}/menus/${menuId}/${uuid}.${ext}`;
  }

  generatePublicUrl(key: string): string {
    const cdnDomain =
      process.env.CF_DOMAIN || 'https://dsel8jrwwc6h2.cloudfront.net';
    return `${cdnDomain}/${encodeURIComponent(key)}`;
  }
}
