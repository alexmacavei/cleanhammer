import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Character } from 'src/domain/character.model';
import { characterSchema, itemSchema, raceSchema } from './schemas/schemas';
import { Item } from '../domain/item.model';
import { Race } from 'src/domain/race.model';
import { databaseProviders } from './database.providers';
import * as mongoose from 'mongoose';

itemSchema.loadClass(Item);
raceSchema.loadClass(Race);
characterSchema.loadClass(Character);

@Injectable()
export class DbInteractionService {
  private readonly itemModel;
  private readonly raceModel;
  private readonly characterModel;

  constructor() {
    this.itemModel = mongoose.model('Item', itemSchema);
    this.raceModel = mongoose.model('Race', raceSchema);
    this.characterModel = mongoose.model('Character', characterSchema);
  }

  createCharacter(c: Character): Promise<Character> {
    const model = new this.characterModel(c);
    return model.save();
  }

  viewCharacters(): Promise<Character[]> {
    return this.characterModel.find().exec();
  }
}
