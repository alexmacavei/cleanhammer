import {
  Character,
  createCharacter as buildCharacter,
} from '../domain/character.model';

export interface CreateCharacterPort {
  createCharacter(character: Character): void;
}

export class CreateCharacter<T extends CreateCharacterPort> {
  private readonly characterService: T;

  constructor(createPort: T) {
    this.characterService = createPort;
  }

  createCharacter(characterToCreate: Character) {
    const character = buildCharacter(
      characterToCreate.race,
      characterToCreate.name,
      characterToCreate.itemsOwned,
      characterToCreate.friends ?? [],
      characterToCreate.goldOwned,
    );
    this.characterService.createCharacter(character);
  }
}
