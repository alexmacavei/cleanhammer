import { Character } from '../domain/character.model';

export interface ViewCharactersPort {
  viewCharacters(): Character[];
}

export class ViewCharacters<T extends ViewCharactersPort> {
  constructor(private readonly listCharactersService: T) {}

  viewAllCharacters(): Character[] {
    return this.listCharactersService.viewCharacters();
  }
}
