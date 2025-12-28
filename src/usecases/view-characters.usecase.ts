import { Character } from '../domain/character.model';

export interface ViewCharactersPort {
  viewCharacters(): Promise<Character[]>;
}

export class ViewCharacters<T extends ViewCharactersPort> {
  constructor(private readonly listCharactersService: T) {}

  viewAllCharacters(): Promise<Character[]> {
    return this.listCharactersService.viewCharacters();
  }
}
