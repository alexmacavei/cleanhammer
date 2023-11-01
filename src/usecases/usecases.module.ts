import { Module } from '@nestjs/common';
import { DomainModule } from '../domain/domain.module';
import { CreateCharacter } from './create-character.usecase';
import { DismissCharacter } from './dismiss-character.usecase';
import { ViewCharacters } from './view-characters.usecase';

@Module({
  imports: [DomainModule],
  controllers: [],
  providers: [CreateCharacter, DismissCharacter, ViewCharacters],
  exports: [CreateCharacter, DismissCharacter, ViewCharacters],
})
export class UseCasesModule {}
