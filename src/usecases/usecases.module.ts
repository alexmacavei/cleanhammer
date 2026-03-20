import { Module } from '@nestjs/common';
import { DomainModule } from '../domain/domain.module';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { CharacterDb } from '../infrastructure/characters/character-db';
import { CreateCharacter } from './create-character.usecase';
import { DismissCharacter } from './dismiss-character.usecase';
import { ViewCharacters } from './view-characters.usecase';

@Module({
  imports: [DomainModule, InfrastructureModule],
  providers: [
    {
      provide: CreateCharacter,
      useFactory: (db: CharacterDb) => new CreateCharacter(db),
      inject: [CharacterDb],
    },
    {
      provide: DismissCharacter,
      useFactory: (db: CharacterDb) => new DismissCharacter(db),
      inject: [CharacterDb],
    },
    {
      provide: ViewCharacters,
      useFactory: (db: CharacterDb) => new ViewCharacters(db),
      inject: [CharacterDb],
    },
  ],
  exports: [CreateCharacter, DismissCharacter, ViewCharacters],
})
export class UseCasesModule {}
