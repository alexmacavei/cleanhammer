import * as mongoose from 'mongoose';

export const itemSchema = new mongoose.Schema({
  name: String,
  itemKind: String,
  worthInGold: Number,
});

export const raceSchema = new mongoose.Schema({
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
