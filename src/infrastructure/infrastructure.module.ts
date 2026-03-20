import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CharacterDb } from './characters/character-db';
import { characterSchema } from './schemas/schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Character', schema: characterSchema }]),
  ],
  providers: [CharacterDb],
  exports: [CharacterDb],
})
export class InfrastructureModule {}
