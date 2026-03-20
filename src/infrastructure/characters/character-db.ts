import { Model } from 'mongoose';
import { Character } from '../../domain/character.model';
import { CreateCharacterPort } from '../../usecases/create-character.usecase';
import { ViewCharactersPort } from '../../usecases/view-characters.usecase';
import { CharacterDismissalPort } from '../../usecases/dismiss-character.usecase';

export class CharacterDb
  implements CreateCharacterPort, ViewCharactersPort, CharacterDismissalPort
{
  constructor(private readonly characterModel: Model<Character>) {}

  createCharacter(character: Character) {
    const model = new this.characterModel(character);
    return model.save();
  }

  viewCharacters() {
    return this.characterModel.find().exec();
  }

  dismissCharacter(character: Character) {
    return this.characterModel.deleteOne({ name: character.name }).exec();
  }
}
