import { Body, Controller, Get, Post } from '@nestjs/common';
import { Character } from './domain/character.model';
import { CharacterDb } from './infrastructure/characters/character-db';
import { CreateCharacter } from './usecases/create-character.usecase';
import { ViewCharacters } from './usecases/view-characters.usecase';

@Controller()
export class AppController {
  private readonly createCharacterUseCase: CreateCharacter<CharacterDb>;
  private readonly viewCharactersUseCase: ViewCharacters<CharacterDb>;

  constructor() {
    this.createCharacterUseCase = new CreateCharacter(new CharacterDb());
    this.viewCharactersUseCase = new ViewCharacters(new CharacterDb());
  }

  @Post()
  createCharacter(@Body() character: Character) {
    return this.createCharacterUseCase.createCharacter(character);
  }

  @Get()
  getAll(): Promise<Character[]> {
    return this.viewCharactersUseCase.viewAllCharacters();
  }
}
