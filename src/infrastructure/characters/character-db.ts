import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { Character } from '../../domain/character.model';
import { CreateCharacterPort } from '../../usecases/create-character.usecase';
import { ViewCharactersPort } from '../../usecases/view-characters.usecase';
import { characterSchema } from '../schemas/schemas';

export class CharacterDb implements CreateCharacterPort, ViewCharactersPort {
  private readonly characterModel: Model<Character>;

  constructor() {
    this.characterModel = mongoose.model<Character>(
      'Character',
      characterSchema,
    );
  }

  createCharacter(character: Character) {
    const model = new this.characterModel(character);
    return model.save();
  }

  viewCharacters() {
    return this.characterModel.find().exec();
  }
}
