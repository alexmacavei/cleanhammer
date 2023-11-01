export interface CreateCharacterPort {
  createCharacter(character): void;
}

export class CreateCharacter<T extends CreateCharacterPort> {
  private readonly characterService: T;

  constructor(createPort: T) {
    this.characterService = createPort;
  }

  createCharacter(characterToCreate) {
    this.characterService.createCharacter(characterToCreate);
  }
}
