import { Item } from './item.model';
import { Race, RaceName } from './race.model';

export interface Character {
  race: Race;
  name: string;
  itemsOwned: Item[];
  friends: Character[];
  goldOwned: number;
}

export class InvalidCharacterError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidCharacterError';
  }
}

export class ItemNotOwnedError extends Error {
  constructor(characterName: string, itemName: string) {
    super(
      `Character ${characterName} cannot sell what he doesn't own. Tried to sell item: ${itemName}`,
    );
    this.name = 'ItemNotOwnedError';
  }
}

export class InsufficientGoldError extends Error {
  constructor(characterName: string, itemName: string) {
    super(
      `Character ${characterName} does not have enough gold to buy ${itemName}`,
    );
    this.name = 'InsufficientGoldError';
  }
}

export function isGreenskinWithAtLeastANonGreenskinFriend(
  character: Character,
) {
  const {
    race: { mainRaceName },
    friends,
  } = character;
  return (
    mainRaceName === RaceName.GREENSKIN &&
    !!friends.find((f) => f.race.mainRaceName !== RaceName.GREENSKIN)
  );
}

export function createCharacter(
  race: Race,
  name: string,
  itemsOwned: Item[],
  friends: Character[],
  goldOwned: number,
): Character {
  const characterInvalid = isGreenskinWithAtLeastANonGreenskinFriend({
    race,
    friends,
  } as Character);
  if (characterInvalid) {
    throw new InvalidCharacterError(
      'Greenskins can only befriend other greenskins!',
    );
  }
  return {
    name,
    race,
    itemsOwned,
    friends,
    goldOwned,
  };
}
