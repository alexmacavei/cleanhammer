import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseProviders } from './database.providers';
import { characterSchema, raceSchema, itemSchema } from './schemas/schemas';
import { DbInteractionService } from './db-interaction.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Character', schema: characterSchema },
      { name: 'Race', schema: raceSchema },
      { name: 'Item', schema: itemSchema },
    ]),
  ],
  providers: [DbInteractionService, ...databaseProviders],
  exports: [DbInteractionService, ...databaseProviders],
})
export class InfrastructureModule {}
