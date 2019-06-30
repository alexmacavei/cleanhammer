import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseProviders } from './database.providers';
import { characterSchema, itemSchema, raceSchema } from './schemas/schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Character', schema: characterSchema },
      { name: 'Race', schema: raceSchema },
      { name: 'Item', schema: itemSchema },
    ]),
  ],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class InfrastructureModule {}
