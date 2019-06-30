import { Body, Controller, Get, Post } from '@nestjs/common';
import { Character } from './domain/character.model';
import { DbInteractionService } from './infrastructure/db-interaction.service';

@Controller()
export class AppController {
  constructor(private readonly dbService: DbInteractionService) {}

  @Post()
  async createCharacter(@Body() character: Character): Promise<Character> {
    return await this.dbService.createCharacter(character);
  }

  @Get()
  getAll() {
    return this.dbService.viewCharacters();
  }
}
