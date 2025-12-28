import { Schema } from 'mongoose';
import { Item } from 'src/domain/item.model';
import { Race } from 'src/domain/race.model';

export const itemSchema = new Schema<Item>({
  name: String,
  itemKind: String,
  worthInGold: Number,
});

export const raceSchema = new Schema<Race>({
  mainRaceName: String,
  subrace: String,
});

export const characterSchema = new Schema({
  race: raceSchema,
  name: String,
  itemsOwned: [itemSchema],
  friends: [{ type: Schema.Types.ObjectId, ref: 'Character' }],
  goldOwned: Number,
});
