import { Body, Controller, Get, Post } from '@nestjs/common';
import { Character } from './domain/character.model';
import {
  CreateCharacter,
  CreateCharacterPort,
} from './usecases/create-character.usecase';
import {
  ViewCharacters,
  ViewCharactersPort,
} from './usecases/view-characters.usecase';

@Controller()
export class AppController {
  constructor(
    private readonly createCharacterUseCase: CreateCharacter<CreateCharacterPort>,
    private readonly viewCharactersUseCase: ViewCharacters<ViewCharactersPort>,
  ) {}

  @Post()
  createCharacter(@Body() character: Character) {
    return this.createCharacterUseCase.createCharacter(character);
  }

  @Get()
  getAll(): Promise<Character[]> {
    return this.viewCharactersUseCase.viewAllCharacters();
  }
}
