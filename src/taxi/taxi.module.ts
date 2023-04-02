import { Module } from '@nestjs/common';
import { TaxiService } from './taxi.service';
import { TaxiController } from './taxi.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TaxiSchema } from './schema/taxi.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Taxi', schema: TaxiSchema }]),
  ],
  providers: [TaxiService],
  controllers: [TaxiController],
})
export class TaxiModule {}
