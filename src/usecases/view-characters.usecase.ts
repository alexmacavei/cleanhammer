export interface ViewCharactersPort {
  viewCharacters();
}

export class ViewCharacters<T extends ViewCharactersPort> {
  constructor(private readonly listCharactersService: T) {}

  viewAllCharacters() {
    return this.listCharactersService.viewCharacters();
  }
}
