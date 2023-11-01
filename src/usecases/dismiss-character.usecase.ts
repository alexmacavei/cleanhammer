export interface CharacterDismissalPort {
  dismissCharacter(characterToDismiss): void;
}

export class DismissCharacter<T extends CharacterDismissalPort> {
  constructor(private readonly dismissalService: T) {}

  sendAwayCharacter(sadCharacter) {
    this.dismissalService.dismissCharacter(sadCharacter);
  }
}
