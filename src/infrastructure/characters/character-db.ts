import * as mongoose from 'mongoose';
import { CreateCharacterPort } from '../../../dist/usecases/create-character.usecase';
import { Character } from '../../domain/character.model';
import { characterSchema } from '../schemas/schemas';
import { ViewCharactersPort } from '../../../dist/usecases/view-characters.usecase';

export class CharacterDb implements CreateCharacterPort, ViewCharactersPort {
  private readonly characterModel;

  constructor() {
    this.characterModel = mongoose.model('Character', characterSchema);
  }

  createCharacter(c: Character) {
    const model = new this.characterModel(c);
    return model.save();
  }

  viewCharacters(): Character[] {
    return this.characterModel.find().exec();
  }
}
