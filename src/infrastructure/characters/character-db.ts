import * as mongoose from 'mongoose';
import { CreateCharacterPort } from '../../../dist/usecases/create-character.usecase';
import { characterSchema } from '../schemas/schemas';
import { ViewCharactersPort } from '../../../dist/usecases/view-characters.usecase';

export class CharacterDb implements CreateCharacterPort, ViewCharactersPort {
  private readonly characterModel;

  constructor() {
    this.characterModel = mongoose.model('Character', characterSchema);
  }

  createCharacter(character) {
    const model = new this.characterModel(character);
    return model.save();
  }

  viewCharacters() {
    return this.characterModel.find().exec();
  }
}
