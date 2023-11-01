import * as mongoose from 'mongoose';
import { Item } from 'src/domain/item.model';
import { Race } from 'src/domain/race.model';

export const itemSchema = new mongoose.Schema<Item>({
  name: String,
  itemKind: String,
  worthInGold: Number,
});

export const raceSchema = new mongoose.Schema<Race>({
  mainRaceName: String,
  subrace: String,
});

export const characterSchema = new mongoose.Schema({
  race: raceSchema,
  name: String,
  itemsOwned: [itemSchema],
  friends: [this],
  goldOwned: Number,
});
