import { join } from 'path';

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.set('trust proxy', 1);
  // CORS 설정
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:5173',
      'https://withfestival.site',
    ], // 프론트엔드 URL
    credentials: true,
  });

  // 세션 설정
  const isProduction = process.env.NODE_ENV === 'production';

  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'your-secret-key-change-this',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: isProduction, // 프로덕션에서는 true, 개발에서는 false
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 24시간
        sameSite: isProduction ? 'none' : 'lax', // 프로덕션에서는 none, 개발에서는 lax
      },
    }),
  );

  // 정적 파일 서빙 설정 (업로드된 이미지)
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  // API 프리픽스 설정
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 4001);
  console.log(`서버가 포트 ${process.env.PORT ?? 4001}에서 실행 중입니다.`);
}
bootstrap();
