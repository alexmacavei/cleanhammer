import * as mongoose from 'mongoose';
import { Character } from 'src/domain/character.model';
import { Item } from 'src/domain/item.model';
import { Race } from 'src/domain/race.model';

export const itemSchema = new mongoose.Schema({
  name: String,
  itemKind: String,
  worthInGold: Number,
});
itemSchema.loadClass(Item);

export const raceSchema = new mongoose.Schema({
  mainRaceName: String,
  subrace: String,
});
raceSchema.loadClass(Race);

export const characterSchema = new mongoose.Schema({
  race: raceSchema,
  name: String,
  itemsOwned: [itemSchema],
  friends: [this],
  goldOwned: Number,
});
characterSchema.loadClass(Character);
