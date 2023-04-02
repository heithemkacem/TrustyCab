import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { OtpModule } from './otp/otp.module';
import { MailModule } from './mail/mail.module';
import { TaxiModule } from './taxi/taxi.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    AuthModule,
    OtpModule,
    MailModule,
    TaxiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
