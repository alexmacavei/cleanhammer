import { Character } from '../domain/character.model';

export interface CharacterDismissalPort {
  dismissCharacter(characterToDismiss: Character): void;
}

export class DismissCharacter<T extends CharacterDismissalPort> {
  constructor(private readonly dismissalService: T) {}

  sendAwayCharacter(sadCharacter: Character) {
    this.dismissalService.dismissCharacter(sadCharacter);
  }
}
