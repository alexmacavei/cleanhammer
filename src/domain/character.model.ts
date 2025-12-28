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
