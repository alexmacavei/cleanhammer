import { Module } from '@nestjs/common';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Character } from '../domain/character.model';
import { CharacterDb } from './characters/character-db';
import { characterSchema } from './schemas/schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Character', schema: characterSchema }]),
  ],
  providers: [
    {
      provide: CharacterDb,
      useFactory: (characterModel: Model<Character>) =>
        new CharacterDb(characterModel),
      inject: [InjectModel('Character')],
    },
  ],
  exports: [CharacterDb],
})
export class InfrastructureModule {}
