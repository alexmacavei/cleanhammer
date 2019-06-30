import { Body, Controller, Get, Post } from '@nestjs/common';
import { Character } from './domain/character.model';
import { CharacterDb } from './infrastructure/characters/character-db';
import { CreateCharacter } from './usecases/create-character.usecase';
import { ViewCharacters } from './usecases/view-characters.usecase';

@Controller()
export class AppController {
  private readonly createCharacterUsecase: CreateCharacter<CharacterDb>;
  private readonly viewCharactersUsecase: ViewCharacters<CharacterDb>;

  constructor() {
    this.createCharacterUsecase = new CreateCharacter(new CharacterDb());
    this.viewCharactersUsecase = new ViewCharacters(new CharacterDb());
  }

  @Post()
  createCharacter(@Body() character: Character) {
    return this.createCharacterUsecase.createCharacter(character);
  }

  @Get()
  getAll() {
    return this.viewCharactersUsecase.viewAllCharacters();
  }
}
