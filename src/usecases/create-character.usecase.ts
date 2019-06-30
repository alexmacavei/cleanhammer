import { Character } from 'src/domain/character.model';

export interface CreateCharacterPort {
  createCharacter(character: Character): void;
}

export class CreateCharacter<T extends CreateCharacterPort> {
  private readonly characterService: T;

  constructor(createPort: T) {
    this.characterService = createPort;
  }

  createCharacter(characterToCreate: Character) {
    this.characterService.createCharacter(characterToCreate);
  }
}
