import { Character } from 'src/domain/character.model';
import { Item } from 'src/domain/item.model';
import { Race } from 'src/domain/race.model';

export interface CreateCharacterPort {
  createCharacter(
    race: Race,
    name: string,
    itemsOwned: Item[],
    friends: Character[],
  ): Character;
}

export class CreateCharacter<T extends CreateCharacterPort> {
  constructor(private readonly characterService: T) {}

  createCharacter(characterToCreate: Character): Character {
    return this.characterService.createCharacter(
      characterToCreate.race,
      characterToCreate.name,
      characterToCreate.itemsOwned,
      characterToCreate.friends,
    );
  }
}
